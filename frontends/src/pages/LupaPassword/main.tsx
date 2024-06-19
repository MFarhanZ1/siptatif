import { useEffect, useState } from "react";
import topimage from "../../../assets/images/pngs/siptatif-logo.png";
import LupaPassword from "./LupaPassword";
import ResetPassword from "./ResetPassword";
import { useSearchParams } from "react-router-dom";
import { verifyLupaPasswordTokenFromEmailService } from "../../services/LupaPassword";
import Swal from "sweetalert2";
import CustomMarquee from "../../components/Marquee";
import Footer from "../../components/Footer";
import { LoadingFullScreen } from "../../components/Loading";
function LupaPasswordPage() {

	const [isLoading, setIsLoading] = useState(false);
	const [reset, setReset] = useState(false);
	const [email, setEmail] = useState("");
	
	const [searchParams] = useSearchParams("");
	const tokenVerification = searchParams.get("__token_verification");
	
	useEffect(() => {
		if (tokenVerification) {
			// method untuk memvalidasi token yang dikirim dan yang di terima dari email
			verifyLupaPasswordTokenFromEmailService(tokenVerification).then(
				(data) => {
					if (data.response) {
						Swal.fire({
							title: "Yeay, verifikasi anda berhasil!",
							html: data.message,
							icon: "success",
							showConfirmButton: false,
							timer: 4000,
						}).then(() => {
							setEmail(data.results.email);
							setReset(true);
						});
					} else {
						Swal.fire({
							title: "Yah, verifikasi anda gagal!",
							html: data.message,
							icon: "error",
							showConfirmButton: false,
							timer: 4000,
						});
					}
				}
			);
		}
	}, [tokenVerification]);
	return (
		<>
			{isLoading && <LoadingFullScreen />}
			<div className="flex flex-col bg-[#F2F7F5] h-screen font-poppins">
				{/* marquee pengumuman information */}
				<CustomMarquee
					list_announcement={
						"Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 | Kontak admin untuk masalah teknis di support@uin-suska.ac.id"
					}
				/>
				{/* main content */}
				<div
					id="main-content"
					className="flex items-center justify-center flex-1 gap-14"
				>
					{/* Logo siptatif usr */}
					<div>
						<img src={topimage} className="w-[530px]" alt="Top Image" />
					</div>
					{/* form login */}
					<div className="w-4/12">
						{reset ? <ResetPassword email={email} onButtonClicked={({isBoolLoading}) => setIsLoading(isBoolLoading)}/> : <LupaPassword onButtonClicked={({isBoolLoading}) => setIsLoading(isBoolLoading)}/>}
					</div>{" "}
					{/* end of form login */}
				</div>{" "}
				<Footer />
				{/* end of main content */}
			</div>
		</>
	);
}

export default LupaPasswordPage;

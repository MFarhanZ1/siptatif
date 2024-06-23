import { useEffect, useState } from "react";
import topimage from "../../../assets/images/pngs/siptatif-logo.png";
import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { LoadingFullScreen } from "../../components/Loading";
import { verifyRegisterTokenFromEmailService } from "../../services/RegisterServices";
import CustomMarquee from "../../components/Marquee";
import Footer from "../../components/Footer";

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [email, setEmail] = useState("");

	const [searchParams] = useSearchParams("");
	const tokenVerification = searchParams.get("__token_verification");

	const navigate = useNavigate();

	useEffect(() => {

		if (localStorage.getItem("access-token") !== null) {
			navigate("/dashboard");
		}

		if (tokenVerification) {
			verifyRegisterTokenFromEmailService(tokenVerification).then((data) => {
				if (data.response) {
					Swal.fire({
						title: "Yeay, verifikasi anda berhasil!",
						html: data.message,
						icon: "success",
						showConfirmButton: false,
						timer: 4000,
					}).then(() => {
						setEmail(data.results.email);
						setIsEmailValid(true);
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
			});
		}
	}, [tokenVerification]);

	return (
		<div className="flex flex-col bg-[#F2F7F5] h-screen font-poppins">
			{/* Loading screen at full size */}
			{isLoading && <LoadingFullScreen />}
			{/* marquee pengumuman information */}
			<CustomMarquee
				list_announcement={
					"Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 | Kontak admin untuk masalah teknis di support@uin-suska.ac.id"
				}
			/>
			{/* main content */}
			<div
				id="main-content"
				className="flex items-center justify-center flex-1 sm:gap-14"
			>
				{/* Logo siptatif usr */}
				<div>
					<img src={topimage} className="hidden sm:block w-[530px]" alt="Top Image" />
				</div>
				{/* form login */}
				<div className="w-10/12 sm:w-4/12">
					{/* different form depends on isEmailValid */}
					{isEmailValid ? (
						<Register
							email={email}
							onRegister={({ boolIsLoading }) => {
								setIsLoading(boolIsLoading);
							}}
						/>
					) : (
						<VerifyEmail
							onButtonClicked={({ boolIsLoading }) => {
								setIsLoading(boolIsLoading);
							}}
						/>
					)}
				</div>{" "}
				{/* end of form login */}
			</div>{" "}
			{/* end of main content */}
			<Footer />

		</div>
	);
};

export default RegisterPage;

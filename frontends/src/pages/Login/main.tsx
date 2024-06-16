import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import siptatifImage from "../../../assets/images/pngs/siptatif-logo.png";
import "../../index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateloginService } from "../../services/LoginService";
import Marquee from "../../components/Marquee";
import Footer from "../../components/Footer";
import { LoadingFullScreen } from "../../components/Loading";

function LoginPage() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState<string>("");

	return (
		<>
			{isLoading && <LoadingFullScreen />}
			<div className="flex flex-col bg-[#F2F7F5] h-screen font-poppins">
				{/* marquee pengumuman information */}
				<Marquee
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
						<img src={siptatifImage} className="w-[530px]" alt="Top Image" />
					</div>
					{/* form login */}
					<div className="w-4/12">
						<Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
							<h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
								Login <span className="italic font-ibm-plex-mono-medium tracking-[-2px]">SIPTATIF</span>
							</h1>
							{/* form input */}
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setIsLoading(true);
									validateloginService({ email, password }).then((data) => {
										setIsLoading(false);
										if (data.response) {
											// store access token in local storage
											localStorage.setItem("access-token", data.access_token);
											Swal.fire({
												title: "Berhasil Login!",
												html: data.message,
												icon: "success",
												showConfirmButton: false,
												timer: 4000,
											}).then(() => {
												navigate("/dashboard");
											});
										} else {
											Swal.fire({
												title: "Login Gagal!",
												html: data.message,
												icon: "error",
												showConfirmButton: false,
												timer: 4000,
											});
										}
									});
								}}
							>
								<div className="flex flex-col gap-5 mb-1">
									<Input
										placeholder="contoh@students.uin-suska.ac.id"
										type="email"
										id="email"
										label="Email:"
										name="email"
										required={true}
										onchange={(e) => {
											setEmail(e.target.value);
										}}
									/>
									<Input
										placeholder="**********"
										type="password"
										id="password"
										label="Password:"
										required={true}
										onchange={(e) => {
											setPassword(e.target.value);
										}}
									/>
								</div>
								<div className="flex justify-end">
									<p
										className="p-1 cursor-pointer font-bold underline hover:text-[#6c2682]"
										onClick={() => {
											Swal.fire({
												title: "⚡ Otw Page Lupa Password...",
												text: "Sebentar ya anda akan diarahkan kehalaman Lupa Password!",
												icon: "info",
												showConfirmButton: false,
												timer: 3000,
											}).then(() => {
												navigate("/reset-password");
											});
										}}
									>
										Lupa Password?
									</p>
								</div>
								<Button
									className="bg-[#8BD3DD] border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#73adca]"
									text="LOGIN"
									type="submit"
								/>
							</form>
							<p className="mt-5">
								Belum punya akun?
								<span
									className="font-bold underline cursor-pointer px-1 hover:text-[#6c2682]"
									onClick={() => {
										Swal.fire({
											title: "🚀 Menuju Halaman Registrasi...",
											text: "Sebentar ya anda akan diarahkan kehalaman registrasi!",
											icon: "info",
											showConfirmButton: false,
											timer: 3000,
										}).then(() => {
											navigate("/register");
										});
									}}
								>
									Daftar Disini!
								</span>
							</p>
						</Card>
					</div>{" "}
					{/* end of form login */}
				</div>{" "}
				{/* end of main content */}
      <Footer />
			</div>
		</>
	);
}

export default LoginPage;

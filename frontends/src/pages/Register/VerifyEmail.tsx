import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Timer from "../../components/Timer";
import Swal from "sweetalert2";

interface VerifyEmailProps {
	onButtonClicked: (params: { boolIsLoading: boolean }) => void;
}

const VerifyEmail = ({onButtonClicked}: VerifyEmailProps) => {
	
	const [isClickedVerif, setisClickedVerif] = useState(false);

	const [email, setEmail] = useState("");

	return (
		<Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
			<h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
				Register
			</h1>
			{/* form input */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					
					onButtonClicked({boolIsLoading: true});
					
					fetch(`${process.env.BASE_URL}/kirim-link-verifikasi`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: email,
						}),
					})
						.then((response) => response.json())
						.then((data) => {

							onButtonClicked({boolIsLoading: false});
							
							if (data.response) {

								Swal.fire({
									title: "Link verifikasi sukses dikirim!",
									html: data.message,
									icon: "info",
									showConfirmButton: false,
									timer: 4000,
								})
									.then(() => {
										setisClickedVerif(!isClickedVerif);
									});
							} else {
								Swal.fire({
									title: "Registrasi Gagal!",
									html: data.message,
									icon: "error",
									showConfirmButton: false,
									timer: 4000,
								});
							}
						});
				}}
			>
				<Input
					placeholder="contoh@students.uin-suska.ac.id"
					type="email"
					label="Email:"
					className="mb-3"
					onchange={(e) => setEmail(e.target.value)}
					required={true}
				/>

				{isClickedVerif && (
					<div className="flex justify-start">
						<p className="p-1 text-sm">
							Belum menerima link? kirim ulang setelah:{" "}
							<Timer
								timerMinutes={3}
								onComplete={() => {
									setisClickedVerif(!isClickedVerif);
								}}
							/>
						</p>
					</div>
				)}

				<Button
					className={`bg-[#8BD3DD] cursor-${!isClickedVerif ? "pointer" : "not-allowed"} border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
					text="Kirim Link Verifikasi"
					disabled={isClickedVerif}
				/>
			</form>
		</Card>
	);
};

export default VerifyEmail;

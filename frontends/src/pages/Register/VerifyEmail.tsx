import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Timer from "../../components/Timer";
import Swal from "sweetalert2";
import { kirimLinkVerifikasiEmailService } from "../../services/RegisterServices";
import { useNavigate } from "react-router-dom";

interface VerifyEmailProps {
  onButtonClicked: (params: { boolIsLoading: boolean }) => void;
}

const VerifyEmail = ({ onButtonClicked }: VerifyEmailProps) => {

  const navigate = useNavigate();
  const [isClickedVerif, setisClickedVerif] = useState(false);

  return (
    <Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
      <h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
        Register
      </h1>
      {/* form input */}
      <form
        onSubmit={(request) => {
          // menghindari refresh page setelah submit form
          request.preventDefault();

          // starting callback loading screen
          onButtonClicked({ boolIsLoading: true });

          kirimLinkVerifikasiEmailService(request).then((data) => {
            // ending callback loading screen
            onButtonClicked({ boolIsLoading: false });

            // jika request berhasil atau email berhasil dikirimkan
            if (data.response) {
              // kalau sukses dikirim munculkan timer cooldown dan aktifkan disabled button
              setisClickedVerif(!isClickedVerif);

              // munculkan pesan notifikasi link verifikasi sukses dikirim
              Swal.fire({
                title: "Link verifikasi sukses dikirim!",
                html: data.message,
                icon: "info",
                showConfirmButton: false,
                timer: 4000,
              });
            } else {
              // munculkan pesan notifikasi link verifikasi gagal dikirim
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
          name="email"
          label="Email:"
          required={true}
        />

        {isClickedVerif && (
          <div className="flex justify-start">
            <p className="py-1 text-sm">
              Belum menerima link? kirim ulang setelah:{" "}
              <Timer
                timerMinutes={10}
                onComplete={() => {
                  setisClickedVerif(!isClickedVerif);
                }}
              />
            </p>
          </div>
        )}

        <Button
          className={`bg-[#8BD3DD] cursor-${
            !isClickedVerif ? "pointer" : "not-allowed"
          } border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#62add3] disabled:bg-[#7dabb8]`}
          text="Kirim Link Verifikasi"
          disabled={isClickedVerif}
          type="submit"
        />
        <p className="mt-5 text-center font-semibold underline text-md cursor-pointer hover:text-[#6c2682]"
        onClick={() => {
          navigate("/login");
        }}
        >
          Back To Login
        </p>
      </form>
    </Card>
  );
};

export default VerifyEmail;

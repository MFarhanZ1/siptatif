import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import { resetPasswordService } from "../../services/LupaPassword";
import { useNavigate } from "react-router-dom";

interface ResetPasswordProps {
  email: string;
  onButtonClicked: ({isBoolLoading}: {isBoolLoading: boolean}) => void;
}

function ResetPassword({email, onButtonClicked}: ResetPasswordProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [invalidMatchPassword, setinvalidMatchPassword] = useState(false);
  return (
    <Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
      <h1 className="text-[35px] text-center ml-1 underline mb-6 font-poppins-semibold">
        Reset Password
      </h1>
      {/* form input */}
      <form
        onSubmit={(e) => {

          e.preventDefault();
          if (password !== confirmPassword) {
            return Swal.fire({
              title: "Registrasi ditolak!",
              text: "Maaf, kedua password yang anda inputkan tidak sesuai, harap lebih teliti kembali.",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
          // method reset password yang telah baru di input kan
          onButtonClicked({ isBoolLoading: true });

          resetPasswordService({
            email: email,
            password: password,
          }).then((data) => {
            
            onButtonClicked({ isBoolLoading: false });
            if (data.response) {
              Swal.fire({
                title: "Berhasil Reset Password!",
                html: data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 4000,
              })
                .then(() => {
                  navigate("/login");
                })
            } else {
              Swal.fire({
                title: "Reset Password Gagal!",
                html: data.message,
                icon: "error",
                showConfirmButton: false,
                timer: 4000,
              })
            }
          })
        }
      }
      >
        <div className="flex flex-col gap-5">
          <Input
            placeholder="********"
            type="password"
            label="New Password:"
            minLength={8}
            onchange={(e) => {
              // masukin isi field password ke state
              setPassword(e.target.value);

              // check if password and confirm password match
              // jika isi field confirm password masih kosong, maka tidak terjadi apa apa
              // jika isi field password (current) juga masih kosong, maka tidak terjadi apa apa
              if (
                e.target.value !== confirmPassword &&
                confirmPassword !== "" &&
                e.target.value !== ""
              ) {
                setinvalidMatchPassword(true);
              } else {
                setinvalidMatchPassword(false);
              }
            }}
            required={true}
          />
          <Input
            placeholder="********"
            type="password"
            label="Confirm New Password:"
            required={true}
            minLength={8}
            className={`${
              invalidMatchPassword && "border-b-[3px] border-red-600"
            }`}
            onchange={(e) => {
              // masukin isi field confirm password ke state
              setConfirmPassword(e.target.value);

              // check if password and confirm password match
              // jika isi field password masih kosong, maka tidak terjadi apa apa
              // jika isi field confirm password (current) juga masih kosong, maka tidak terjadi apa apa
              if (
                password !== e.target.value &&
                password !== "" &&
                e.target.value !== ""
              ) {
                setinvalidMatchPassword(true);
              } else {
                setinvalidMatchPassword(false);
              }
            }}
          />
        </div>
        {invalidMatchPassword && (
          <p className="-mt-2 text-red-600">Password tidak sesuai.</p>
        )}
        <Button
          className="bg-[#8BD3DD] border border-black rounded-md font-bold w-full mt-5 text-xl hover:bg-[#85c9eb]"
          text="Reset Password"
          type="submit"
        />
      </form>
    </Card>
  );
}

export default ResetPassword;

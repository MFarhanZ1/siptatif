import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import Timer from "../../components/Timer";
import { useNavigate } from "react-router-dom";
import { kirimLinkLupaPasswordService } from "../../services/LupaPassword";
import Swal from "sweetalert2";

interface LupaPasswordProps {
  onButtonClicked: ({isBoolLoading}: {isBoolLoading: boolean}) => void;
}

const LupaPassword = ({onButtonClicked}: LupaPasswordProps) => {

  const navigate = useNavigate();
  const [isClickSend, setClickSend] = useState(false);
  const [email, setEmail] = useState<string>("");
  
  return (
    <Card className="py-7 px-5 sm:px-10 w-full border border-black rounded-lg shadow-lg bg-white">
      <h1 className="text-[25px] sm:text-[35px] text-center ml-1 underline mb-6 font-poppins-semibold">
        Lupa Password
      </h1>
      {/* form input */}
      <form
        onSubmit={(e) => {
          
          e.preventDefault();
          // method untuk mengirim link verifik email
          onButtonClicked({ isBoolLoading: true })

          kirimLinkLupaPasswordService({ email }).then((data) => {
          
            onButtonClicked({ isBoolLoading: false })

            if (data.response) {
              Swal.fire({
                title: "Email berhasil dikirim!",
                html: data.message,
                icon: "info",
                showConfirmButton: false,
                timer: 4000,
              })
                .then(() => {
                  setClickSend(!isClickSend)
                })

            } else {
              Swal.fire({
                title: "Email gagal dikirim!",
                html: data.message,
                icon: "error",
                showConfirmButton: false,
                timer: 4000,
              });
            }
          })
        }}
      >
        <div className="flex flex-col gap-5">
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
        </div>
        {isClickSend && (
          <div className="flex justify-start">
            <p className="py-1 text-sm">
              Belum menerima link? kirim ulang setelah:{" "}
              <Timer
                timerMinutes={10}
                onComplete={() => {
                  setClickSend(!isClickSend);
                }}
              />
            </p>
          </div>
        )}
        <Button
          className={`bg-[#8BD3DD] border border-black cursor-${isClickSend ? 'not-allowed' : 'pointer'} rounded-md font-bold w-full mt-3 text-xl hover:bg-[#70aac7] disabled:bg-[#72afb7]`}
          text="Send Reset Link to Email"
          type="submit"
          disabled={isClickSend}
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
}

export default LupaPassword;

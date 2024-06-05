import { useState } from "react";
import Button from "../../component/Button";
import Card from "../../component/Card";
import Input from "../../component/Input";
import Timer from "../../component/Timer";

const VerifyEmail = () => {
  const [isClickedVerif, setisClickedVerif] = useState(false);
  const [allowButton, setAllowButton] = useState("pointer");

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

          setAllowButton("not-allowed");
          setisClickedVerif(!isClickedVerif);
          console.log(email);

          fetch("http://192.168.158.133:3000/kirim-link-verifikasi", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "email": email,
            }),
          }).then((response) => response.json())
          .then((data) => {
            console.log(data)
          })
        }}
      >
        <Input
          placeholder="contoh@students.uin-suska.ac.id"
          type="text"
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
                timerMinutes={1}
                onComplete={() => {
                  setAllowButton("pointer");
                  setisClickedVerif(!isClickedVerif);
                }}
              />
            </p>
          </div>
        )}

        <Button
          className={`bg-[#8BD3DD] cursor-${allowButton} border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
          text="Kirim Link Verifikasi"
          disabled={isClickedVerif}
        />
      </form>
    </Card>
  );
};

export default VerifyEmail;

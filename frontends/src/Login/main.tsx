import Button from "../component/button";
import Card from "../component/card";
import Input from "../component/input";
import topimage from "../images/png/Top App Title.png";
import "../index.css";
import seeicon from "../icons/see.svg";
import notseeicon from "../icons/notsee.svg";
import { useState } from "react";

function Login() {
  const [icon, setIcon] = useState(notseeicon);
  const [show, setShow] = useState('password');

  function handlerPassword() {
    if (show === 'password') {
      setIcon(seeicon);
      setShow('text');
    } else {
      setIcon(notseeicon);
      setShow('password');
    }
  }
  return (
    <>
      <div className="flex flex-col bg-[#e7f8f1] h-screen font-poppins">
        <div className="bg-[#FAAE2B] mb-4 px-2 font-poppins overflow-hidden whitespace-nowrap ">
          <p className="inline-block animate-marquee">
            Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 |
            Kontak admin untuk masalah teknis di support@uin-suska.ac.id
          </p>
        </div>
        <div
          id="login"
          className="flex items-center justify-center flex-1 gap-14"
        >
          <div>
            {/* Logo Uin Suska and Siptatif */}
            <img src={topimage} className="w-[530px]" alt="Top Image" />
          </div>
          <div className="w-4/12">
            <Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
              <h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
                Login Page
              </h1>
              {/* form input */}
              <Input
                placeholder="contoh@students.uin-suska.ac.id"
                type="text"
                label="Email:"
              />
              <div className="relative">
                <Input
                  placeholder="**********"
                  type={show}
                  label="Password:"
                />
                {/* logo icon password */}
                  <img src={icon} className="absolute top-3 right-3 mt-10" onClick={handlerPassword}/>
              </div>
              <div className="flex justify-end">
                <p className="hover:bg-[#d1d5db] hover:rounded-lg p-1 cursor-pointer font-bold underline">
                  Lupa Password?
                </p>
              </div>
              <Button
                className="bg-[#8BD3DD] border border-black rounded-md font-bold w-full mt-5 text-xl hover:bg-[#85c9eb]"
                text="LOGIN"
              />
              <p className="mt-5">
                Belum punya akun?
                <span className="font-bold underline cursor-pointer px-1">
                  Daftar Disini!
                </span>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

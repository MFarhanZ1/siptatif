import Button from "../component/button";
import Card from "../component/card";
import Input from "../component/input";
import topimage from "../images/png/Top App Title.png";
import "../index.css";
function Login() {
  return (
    <>
      <div className="flex flex-col bg-[#e7f8f1] h-screen font-poppins">

        {/* marquee information */}
        <div className="bg-[#FAAE2B] font-poppins overflow-hidden whitespace-nowrap ">
          <p className="inline-block animate-marquee">
            Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 |
            Kontak admin untuk masalah teknis di support@uin-suska.ac.id
          </p>
        </div>

        {/* main content */}
        <div id="main-content" className="flex items-center justify-center flex-1 gap-14">

          {/* Logo siptatif usr */}
          <div>
            <img
              src={topimage}
              className="w-[530px]"
              alt="Top Image"
            />
          </div>

          {/* form login */}
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
                  type="password"
                  label="Password:"
                  password = {true}
                />
              </div>
              <div className="flex justify-end">
                <p className="p-1 cursor-pointer font-bold underline">
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
          </div> {/* end of form login */}
        </div> {/* end of main content */}

      </div>
    </>
  );
}

export default Login;

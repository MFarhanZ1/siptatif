import Button from "../component/button";
import Card from "../component/card";
import Input from "../component/input";
import topimage from "../images/png/Top App Title.png";

function Login() {
  return (
    <>
      <div className="flex flex-col bg-[#e7f8f1] h-screen">
        <div className="bg-[#FAAE2B] mb-4 px-2 font-poppins overflow-hidden whitespace-nowrap ">
          <p className="inline-block animate-marquee">
            Perhatian! Perubahan jadwal seminar proposal menjadi 2 Juni 2024 |
            Kontak admin untuk masalah teknis di support@uin-suska.ac.id
          </p>
        </div>
        <div id="login" className="flex items-center justify-center flex-1">
          <div className="mr-8">
            <img
              src={topimage}
              className="w-[786px] h-[277px]"
              alt="Top Image"
            />
          </div>
          <div className="w-2/6">
            <Card className="border border-black p-6 rounded-lg shadow-lg bg-white">
              <h1 className="text-4xl font-bold text-center underline mb-5">
                Login Page
              </h1>
              <Input
                placeholder="contoh@students.uin-suska.ac.id"
                type="text"
                label="Email:"
              />
              <Input
                placeholder="**********"
                type="password"
                label="Password:"
              />
              <div className="flex justify-end">
                <p className="hover:bg-[#d1d5db] hover:rounded-lg p-1 cursor-pointer font-bold">
                  Lupa Password?
                </p>
              </div>
              <Button
                className="bg-[#8BD3DD] rounded-md font-bold w-full mt-5 text-xl hover:bg-[#85c9eb]"
                text="Login"
              />
              <p className="mt-5">
                Belum punya akun?{" "}
                <span className="font-bold underline cursor-pointer hover:bg-[#d1d5db] hover:rounded-lg p-1">
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

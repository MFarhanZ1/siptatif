import Button from "../../components/Button";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Marquee from "../../components/Marquee";
import Navbar from "../../components/Navbar";
// import SideBarKoordinator from "./Koordinator/SideBarKoordinator";
import SideBarAdminProdi from "./AdminProdi/SideBarAdminProdi";
// import SideBarMahasiswa from "./Mahasiswa/main";
const Dashboard = () => {
  return (
    <div className="">
      <div>
        {/* navbar */}
        <Navbar />
        {/* marque list */}
        <Marquee list_announcement="Perhatian! Perubahan jadwal seminar proposal menjadi 2 June 2024 | Kontak admin untuk masalah teknis di support@uin-suska.ac.id" />
      </div>
      <div className="flex flex-row">
        <div className="w-[20%] h-screen border-r border-black p-4 flex flex-col justify-between">
          {/* side bar */}
          <div className="overflow-y-auto">
            <SideBarAdminProdi />
            {/* <SideBarMahasiswa /> */}
            {/* <SideBarKoordinator /> */}
          </div>
          <footer>
            <p className="text-center z-1 font-ibm-plex-mono-medium underline">
              🔥siptatif v3.27🔥
            </p>
          </footer>
        </div>
        <div className="w-[80%] h-screen flex flex-col justify-between">
          {/* content side bar */}
          <div className="overflow-y-auto overflow-x-hidden p-4">
            <div className="flex flex-row">
              <div className="flex flex-col w-[40%]">
                <Card className="w-full border border-black p-2 font-poppins">
                  <h1 className="text-xl text-center font-poppins-semibold font-bold">
                    DOSEN
                  </h1>
                  <form>
                    <Input label="NIDN" required={true} type="text"></Input>
                    <Input
                      label="Email"
                      required={true}
                      type="email"
                      placeholder="contoh@uin-suska.ac.id"
                    ></Input>
                    <Input
                      label="Nama Dosen"
                      required={true}
                      type="text"
                    ></Input>
                    <label>
                      <p className="text-xl mb-4">
                        Jenis Kelamin
                        <span className="text-red-500">*</span>
                      </p>
                    </label>
                    <input type="radio" name="gender" id="female" />
                    <label className="ml-2">Laki-laki</label>
                    <span> </span>
                    <input type="radio" name="gender" id="male" />
                    <label className="ml-2">Perempuan</label>

                    <Button
                      className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
                      text="Tambahkan"
                      type="submit"
                    />
                  </form>
                </Card>
              </div>
              <div className="w-[60%] bg-red-700 ml-2">Tabel</div>
            </div>
          </div>
          {/* footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

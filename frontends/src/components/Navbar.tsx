import siptatifnavbar from "../../assets/images/pngs/siptatif-navbar.png";
import iconlogout from "../../assets/images/pngs/logout.png";
import { logoutService } from "../services/LogoutService";
import { useNavigate } from "react-router-dom";
import { LoadingFullScreen } from "./Loading";
import { useState } from "react";
import Swal from "sweetalert2";

function Navbar() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  return (
    <div>
        {isLoading && <LoadingFullScreen />}
        <div className="flex flex-row justify-between bg-[#C8B5FF] px-4 py-2 items-center">
          <img src={siptatifnavbar} alt="" className="h-[55px]" />
          <img
            src={iconlogout}
            alt=""
            className="h-[46px] cursor-pointer hover:bg-slate-400 hover:rounded-md"
            onClick={() => {
              setLoading(true);
              logoutService().then((data) => {
                if (data.response) {
                  setLoading(false);
                  Swal.fire({
                    title: "Berhasil Logout!",
                    html: data.message,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000,
                  }).then(() => {
                    navigate("/login");
                  });
                }
              });
            }}
          />
        </div>
      </div>
  
  );
}

export default Navbar;

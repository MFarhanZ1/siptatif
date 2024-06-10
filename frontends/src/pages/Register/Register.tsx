import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

import { registerService } from "../../services/RegisterServices";
import Swal from "sweetalert2";

interface RegisterProps {
  email: string;
}
const Register = ({ email }: RegisterProps) => {
  const [invalidMatchPassword, setinvalidMatchPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nextForm, setnextForm] = useState(true);
  const [nama, setNama] = useState(" ");
  const [tanggalLahir, setTanggalLahir] = useState(" ");
  const [noHp, setNoHp] = useState("");

  const [formData, setFormData] = useState({
    nama: " ",
    tgl_lahir: " ",
    no_hp: " ",
  });

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

          // validasi tambahan dulu sebelum fetch jika password dan confirm password tidak sesuai
          if (password !== confirmPassword) {
            return Swal.fire({
              title: "Registrasi ditolak!",
              text: "Maaf, kedua password yang anda inputkan tidak sesuai, harap lebih teliti kembali.",
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }

          registerService(request, { email: email, ...formData });
        }}
      >
        {nextForm ? (
          <div>
            <Input
              placeholder="e.g: M. Farhan Aulia Pratama"
              type="text"
              name="nama"
              label="Nama:"
              required={true}
              onchange={(e) => setNama(e.target.value)}
            />
            <Input
              placeholder="hari/bulan/tahun"
              type="date"
              name="tgl-lahir"
              label="Tanggal Lahir:"
              required={true}
              onchange={(e) => setTanggalLahir(e.target.value)}
            />
            <Input
              placeholder="e.g: 089123456789"
              type="text"
              name="nohp"
              label="No. HP/WA:"
              required={false}
              autocomplete="off"
              maxLength={15}
              value={noHp}
              oninput={(e) => {
                const pattern = /^[a-zA-Z]+$/;
                if (!pattern.test(e.target.value) || e.target.value === "") {
                  setNoHp(e.target.value);
                }
              }}
            />
            <Button
              className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
              text="Berikutnya"
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  nama: nama,
                  tgl_lahir: tanggalLahir,
                  no_hp: noHp,
                });
                setnextForm(false);
              }}
            />
          </div>
        ) : (
          <>
            <Input
              placeholder="*********"
              type="password"
              name="password"
              label="Password:"
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
              placeholder="*********"
              type="password"
              name="confirm-password"
              label="Confirm Password:"
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
              required={true}
            />
            {invalidMatchPassword && (
              <p className="-mt-2 text-red-600">Password tidak sesuai.</p>
            )}
            <Button
              className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
              text="Register"
              type="submit"
            />
          </>
        )}
      </form>
    </Card>
  );
};

export default Register;

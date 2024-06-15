import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

import { registerService } from "../../services/RegisterServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  email: string;
  onRegister: ({boolIsLoading}: {boolIsLoading: boolean}) => void;
}
interface FormDataProps {
  nama: string;
  tgl_lahir: string;
  no_hp: string;
}
const Register = ({ email, onRegister }: RegisterProps) => {
  const root = useNavigate();
  const [invalidMatchPassword, setinvalidMatchPassword] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nextForm, setnextForm] = useState(true);
  const [nama, setNama] = useState<string>("");
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [noHp, setNoHp] = useState<string>("");

  const [formData, setFormData] = useState<FormDataProps>({
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

          onRegister({ boolIsLoading: true });

          registerService({
            email: email,
            password: password,
            ...formData,
          }).then((data) => {

            onRegister({ boolIsLoading: false });
            if (data.response) {
              Swal.fire({
                title: "Yeay! registrasi anda berhasil!",
                html: data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 4000,
              }) .then(() => {
                root("/login");
              })
            } else {
              Swal.fire({
                title: "Registrasi ditolak!",
                html: data.message,
                icon: "error",
                showConfirmButton: false,
                timer: 4000,
              });
            }
          });
        }}
      >
        {nextForm ? (
          <div>
            <Input
              placeholder="e.g: M. Farhan Aulia Pratama"
              type="text"
              name="nama"
              label="Nama:"
              value={nama}
              required={true}
              onchange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNama(e.target.value)
              }
            />
            <Input
              placeholder="hari/bulan/tahun"
              type="date"
              name="tgl-lahir"
              value={tanggalLahir}
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
              minLength={11}
              value={noHp}
              oninput={(e) => {
                const pattern = /[a-zA-Z]+/;
                if (!pattern.test(e.target.value) || e.target.value === "") {
                  setNoHp(e.target.value);
                }
              }}
            />
            <Button
              className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#72abc8] disabled:bg-[#7dabb8]`}
              text="Berikutnya"
              type="button"
              onClick={() => {
                if (nama == "" || tanggalLahir == "") {
                  setnextForm(true);
                  return Swal.fire({
                    title: "Registrasi belum dapat diproses!",
                    text: "Maaf, silahkan lengkapi data diri anda terlebih dahulu.",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 3000,
                  });
                } else {
                  setnextForm(false);
                }
                setFormData({
                  ...formData,
                  nama: `${nama}`,
                  tgl_lahir: `${tanggalLahir}`,
                  no_hp: `${noHp}`,
                });
              }}
            />
          </div>
        ) : (
          <>
            <Input
              placeholder="*********"
              type="password"
              name="password"
              value={password}
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
              value={confirmPassword}
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
            <div className="flex justify-end gap-2">
              <Button
                className={`bg-[#ffe565] w-44 cursor-pointer border border-black rounded-md font-bold mt-4 text-xl hover:bg-[#cdc751]`}
                text="Kembali"
                type="button"
                onClick={() => setnextForm(true)}
              />
              <Button
                className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#77b3d2]`}
                text="Register"
                type="submit"
              />
            </div>
          </>
        )}
      </form>
    </Card>
  );
};

export default Register;

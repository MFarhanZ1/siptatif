import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

interface FormRegisterProps {
  email: string;
}
const FormRegister = ({ email }: FormRegisterProps) => {
  const splitEmail = email.split("@")[0];
  // const [nama, setNama] = useState("");
  const [invalidMatchPassword, setinvalidMatchPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [borderConfirmPassword, setBorderConfirmPassword] = useState("");
  console.log(splitEmail);
  console.log(email);
  return (
    <Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
      <h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
        Register
      </h1>
      {/* form input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== passwordConfirm) {
            setBorderConfirmPassword("border-b-2 border-red-200 skew-y-2");
            setinvalidMatchPassword(true);
          } else {
            console.log(password, passwordConfirm);
            setBorderConfirmPassword("");
            setinvalidMatchPassword(false);
          }
        }}
      >
        <Input
          placeholder="e.g: M. Farhan Aulia Pratama"
          type="text"
          label="Nama:"
          className="mb-3"
          // onchange={(e) => setNama(e.target.value)}
          required={true}
        />
        <Input
          placeholder="*********"
          type="password"
          label="Password:"
          className="mb-3"
          onchange={(e) => setPassword(e.target.value)}
          required={true}
        />
        <Input
          placeholder="*********"
          type="password"
          label="Confirm Password:"
          className={`mb-3 ${borderConfirmPassword}`}
          onchange={(e) => {
            setPasswordConfirm(e.target.value);
            if (password !== e.target.value) {
              setBorderConfirmPassword("border-b-2 border-red-500");
              setinvalidMatchPassword(true);
            } else {
              console.log(password, passwordConfirm);
              setBorderConfirmPassword("");
              setinvalidMatchPassword(false);
            }
          }}
          required={true}
        />
        {invalidMatchPassword && (
          <p className="-mt-2 text-red-500">Password tidak sesuai.</p>
        )}
        <Button
          className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
          text="Register"
        />
      </form>
    </Card>
  );
};
export default FormRegister;

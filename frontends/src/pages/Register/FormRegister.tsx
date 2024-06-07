import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";

const FormRegister = () => {
 
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <Card className="py-7 px-10 w-full border border-black rounded-lg shadow-lg bg-white">
      <h1 className="text-[42px] text-center ml-1 underline mb-6 font-poppins-semibold">
        Register
      </h1>
      {/* form input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email);
        }}
      >
        <Input
          placeholder="e.g: M. Farhan Aulia Pratama"
          type="text"
          label="Nama:"
          className="mb-3"
          onchange={(e) => setNama(e.target.value)}
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
          className="mb-3"
          onchange={(e) => setPasswordConfirm(e.target.value)}
          required={true}
        />
        <Button
          className={`bg-[#8BD3DD] cursor-pointer border border-black rounded-md font-bold w-full mt-4 text-xl hover:bg-[#85c9eb] disabled:bg-[#7dabb8]`}
          text="Register"
        />
      </form>
    </Card>
    )
}
export default FormRegister
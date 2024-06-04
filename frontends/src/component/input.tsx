import "../index.css";
import notseeicon from "../icons/notsee.svg";
import seeicon from "../icons/see.svg";
import { useState } from "react";

interface Variable {
  placeholder: string;
  type: string;
  label: string;
  password?: boolean;
  value?: string;
  onchange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, type, label, password, value, onchange}: Variable) {
  const [icon, setIcon] = useState(notseeicon);
  const [show, setShow] = useState(password ? 'password' : type);

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
    <div className="border-b border-black py-2 font-poppins mb-5 relative">
      <label>
        <p className="text-xl">{label} <span className="text-red-500">*</span></p>
      </label>
      <input
        className="appearance-none bg-transparent border-none text-gray-700 leading-tight focus:outline-none mt-4 w-full"
        type={show}
        placeholder={placeholder}
        value={value}
        onChange={onchange}
      />
      {password && (
        <img
          src={icon}
          className="absolute top-3 right-3 mt-10 cursor-pointer"
          onClick={handlerPassword}
          alt="Toggle Password Visibility"
        />
      )}
    </div>
  );
}

export default Input;


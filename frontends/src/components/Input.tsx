import "../index.css";
import notseeicon from "../../assets/icons/notsee.svg";
import seeicon from "../../assets/icons/see.svg";
import { useState } from "react";

interface InputProps {
  placeholder: string;
  className?: string;
  type: string;
  label: string;
  value?: string;
  name?: string;
  required?: boolean;
  id?: string;
  onchange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  oninvalid?:(e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, type, label, value, name, onchange, id, className, required=false, oninvalid}: InputProps) {
  const [icon, setIcon] = useState(notseeicon);
  const [inputType, setInputType] = useState(type);

  return (
    <div className={`border-b border-black py-2 font-poppins relative ${className}`}>
      <label>
        <p className="text-xl">{label} {required && <span className="text-red-500">*</span>} </p>
      </label>
      <input
        className="appearance-none bg-transparent border-none text-gray-700 leading-tight focus:outline-none mt-4 w-full"
        type={inputType}
        id={id}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onchange}
        required={required}
        onInvalid={oninvalid}
      />
      {type === 'password' && (
        <img
          src={icon}
          className="absolute top-3 right-1 mt-10 cursor-pointer"
          onClick={() => {
            if (inputType === 'password') {
              setIcon(seeicon);
              setInputType('text');
            } else {
              setIcon(notseeicon);
              setInputType('password');
            }
          }}
          alt="Toggle Password Visibility"
        />
      )}
    </div>
  );
}

export default Input;


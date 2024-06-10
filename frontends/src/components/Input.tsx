import "../index.css";
import notseeicon from "../../assets/icons/notsee.svg";
import seeicon from "../../assets/icons/see.svg";
import { useState } from "react";

interface InputProps {
	placeholder?: string;
	className?: string;
	type: string;
	label: string;
	value?: string;
	name?: string;
	required?: boolean;
	id?: string;
	maxLength?: number;
	pattern?: string;
	max?: string;
	minLength?: number;
	onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	oninvalid?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	oninput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autocomplete?: string;
}

function Input({
	placeholder,
	type,
	label,
	value,
	name,
	onchange,
	id,
	className,
	required = false,
	oninvalid,
	oninput,
	max,
	minLength,
	maxLength,
	pattern,
	autocomplete
}: InputProps) {

	const [icon, setIcon] = useState(notseeicon);
	const [inputType, setInputType] = useState(type);

	return (
		<div className={`border-b border-black py-2 font-poppins mb-3 ${className}`}>
			<label>
				<p className="text-xl">
					{label} {required ? <span className="text-red-500">*</span> : <span className="text-sm underline italic">(Opsional)</span>}{" "}
				</p>
			</label>

			<div className="mt-4 flex">

				<input
					className="appearance-none bg-transparent border-none text-black leading-tight focus:outline-none w-full"
					type={inputType}
					id={id}
					placeholder={placeholder}
					value={value}
					name={name}
					required={required}
					onChange={onchange}
					onInvalid={oninvalid}
					onInput={oninput}
					maxLength={maxLength}
					pattern={pattern}
					max={max}
					minLength={minLength}
					autoComplete={autocomplete}
				/>

				{type === "password" && (
					<img
						src={icon}
						className="pl-4 cursor-pointer"
						onClick={() => {
							if (inputType === "password") {
								setIcon(seeicon);
								setInputType("text");
							} else {
								setIcon(notseeicon);
								setInputType("password");
							}
						}}
						alt="Toggle Password Visibility"
					/>
				)}

			</div>
		</div>
	);
}

export default Input;
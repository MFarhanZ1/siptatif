interface ButtonProps {
	className: string;
	text: string;
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}

const Button = ({ className, text, onClick, disabled, type}: ButtonProps) => {
	return (
		<button
			className={`px-4 py-1 h-12 text-center ${className}`}
			disabled={disabled}
			type={type}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
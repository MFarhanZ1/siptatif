
interface Props {
  className: string;
  text : string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button ({className, text, onClick, disabled}: Props) {
  return <button className={`px-4 py-1 h-12 text-center ${className}`} disabled={disabled} type='submit' onClick={onClick}>{text}</button>;
}

export default Button;
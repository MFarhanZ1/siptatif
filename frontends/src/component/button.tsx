
interface Props {
  className: string;
  text : string;
  // onClick : () => void;
  // type : string;

}

function Button ({className,text}: Props) {
  return <button className={`px-4 py-1 ${className}`}>{text}</button>;
}

export default Button;
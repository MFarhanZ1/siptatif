import { ReactNode } from "react";

interface cardProps{
  children:ReactNode;
  className:string;
}
function Card({ children,className }:cardProps) {
  return (
    <div className={`rounded-md backdrop-blur-sm backdrop-brightness-125 bg-white/30 p-4 ${className}`}>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Card;

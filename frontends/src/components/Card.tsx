import { ReactNode } from "react";

interface CardProps{
  children: ReactNode;
  className: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-md bg-white ${className}`}>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Card;
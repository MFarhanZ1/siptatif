// interface variable {
//     placeHolder : string;
//     classNameNamename : string;
//     type: string;
//     value: string;
//     onchange:(e: React.ChangeEvent<HTMLInputElement>) => void
// }
// function Input({placeHolder, classNameNamename,type,value,onchange}:variable) {
//   return (
//     <>
//     <div classNameNameName="mb-2">
//       <input value={value} onChange={onchange}classNameNameName={`bg-gray-200 border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${classNameNamename}`} id="username" type={type}placeholder={placeHolder}/>
//     </div>
//     </>
//   )
// }

// export default Input

import "../index.css";

interface variable {
  placeholder: string;
  type: string;
  label:string;
  // value: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ placeholder,type,label}: variable) {
  return (
    <>
      <div className=" border-b border-black py-2  font-poppins mb-10">
        <label>
          <p>{label} <span className="text-red-500">*</span></p>
        </label>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}

export default Input;

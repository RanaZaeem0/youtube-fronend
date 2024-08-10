

export default function Button({label,type= 'button',className =""}:{
    label:string,
   type: "button" | "submit" | "reset" | undefined,
    className?:string,
  }) {
    return (
      <button type={type}  className={`w-full text-white
       bg-gray-800 mt-2 p-2 font-medium rounded-xl  ${className}`} >{label}</button>
    )
  }
  
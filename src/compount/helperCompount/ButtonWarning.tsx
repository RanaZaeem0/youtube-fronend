import { Link } from "react-router-dom"

export default function ButtonWarning({label,buttonText,to}:{
  label:string,
  buttonText:string,
  to:string
}) {
  return (
    <div className="py-2 text-sm flex justify-center text-black">
        <h4>{label}</h4>
        <Link to={to} className="pointer underline pl-1 cursor-pointer  ">
        {buttonText}</Link>
    </div>
  )
}

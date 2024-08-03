import axios from "axios";
import{ useState } from "react";
import { useNavigate } from "react-router";


import Input from "./helperCompount/Input";
import Button from "./helperCompount/Button";
import ButtonWarning from "./helperCompount/ButtonWarning";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

export default function Signup() {
  
  const [error, setError] = useState("");
  const Naviagte = useNavigate();
  const Dispatch = useDispatch();

   interface CreateuserSchema{
    username:string,
    password:string,
    email:string
   }

  const { register, handleSubmit } = useForm<CreateuserSchema>();

  
  const createUser = async (data:CreateuserSchema) => {
    console.log(data);
   
    try {
      const userDetails = data;
      console.log(userDetails ,"sa");

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`,
          userDetails,
        {  headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      
      if (response.status >= 200 && response.status < 300) {
          localStorage.setItem('token', response.data.jwt);
       localStorage.setItem("username", data.username);
        localStorage.setItem('userId' , response.data.userId)
       
         console.log(localStorage.getItem('token'));
         

         
       
        Dispatch(login(response.data));
        Naviagte("/allblog");
      }

      return userDetails;
    } catch (error :any ) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(`Error response from server: ${error.response.status} - ${error.response.data}`);
        setError(`Error: ${error.response.data.message || 'Server Error'}`);
      } else if (error.request) {
        // No response received from server
        console.log('No response received from server', error.request);
        setError('No response received from server. Please try again later.');
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    
    }
  };

  return (
    <div className="bg-slate-900 h-screen flex justify-center">
      <div className="flex w-full justify-center">
        <div className=" bg-white h-full w-1/2 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="!text-black font-semibold text-2xl pb-3">Create an account</h2>
          
          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-col w-96 max-lg:w-full justify-center items-center" >

            
            
            <Input
              {...register("username", { required: true, minLength: 2 })}
              type={"text"}
              placeholder={"Your Name"}
              label={" Name"}
            />
            <Input
              {...register("avatar", { required: true, })}
              type={"file"}
              placeholder={"Avatar image"}
              label={" Name"}
            />
            <Input
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              type={"email"}
              placeholder={"example@gmail.com"}
              label={"email"}
            />
            <Input
              {...register("password", { required: true, minLength: 6 })}
              placeholder={"******"}
              label={"password"}
            /></div>
          <Button label={'Sign up'} type="submit" className={'bg-gray-800'} />
          </form>
          <h2 className="text-red-500 font-normal">{error}</h2>
          <ButtonWarning
            label={"Already Have an account ?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
          
          
        </div>
        <div className="w-1/2 flex flex-col items-start p-14 justify-center text-start bg-slate-200 max-lg:hidden">
         <h2 className="text-black text-2xl font-bold" > " 
              The customer service i received was exceptional
              . The support team went above and beyond to address my concerns
          "</h2>
          <h3 className="text-black font-medium py-2">Jules Winnfelid</h3>
          <h2>CEO , Acme Inc</h2>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SignImage from "./signin.jpg"
import Input from "./helperCompount/Input";
import Button from "./helperCompount/Button";
import ButtonWarning from "./helperCompount/ButtonWarning";
import { useForm } from "react-hook-form";
export default function Signin() {
  const naigavte = useNavigate();

  interface userSignin {
    email: string;
    password: string;
  }
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue } = useForm<userSignin>();

  useEffect(() => {}, []);
  const loginUser = async (data: userSignin) => {
    console.log(data);
    setError("");
    try {
      const userDetails: userSignin = data;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        const accessToken = localStorage.setItem(
          "accessToken",
          response.data.accessToken
        );
        console.log(accessToken);

        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("userId", response.data.data.user._id);
        localStorage.setItem("username", response.data.data.user.username);

        localStorage.setItem("accessToken", response.data.data.accessToken);

        console.log(response.data.data);

        naigavte("/");
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        // No response received from server
        console.log("No response received from server", error.request);
        setError("No response received from server. Please try again later.");
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="bg-[#ffe5e5] h-screen flex justify-center ">
      <div className="flex w-5/6 justify-center rounded-xl  h-full">
        <div className="w-3/5 flex flex-col items-start  justify-center text-startmax-lg:hidden">
         <img src={SignImage} alt="" />
        </div>
        <div className=" h-full w-2/5 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="text-black font-semibold">Sign In</h2>
          <h2>Enter your info</h2>
          <form onSubmit={handleSubmit(loginUser)}>
            <div className="flex flex-col max-lg:w-full items-center justify-center w-80">
              <Input
                {...register("email", {
                  required: true,

                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
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
              />
              <Button
                label={"Sign In"}
                type="submit"
                className={"bg-gray-800"}
              />
            </div>

            <h2 className="text-red-500 font-normal">{error}</h2>
          </form>
          <ButtonWarning
            label={"I dont have an account ?"}
            buttonText={"Sign in"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

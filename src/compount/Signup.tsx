import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import signupImage from "./signupImage.jpg";

import Input from "./helperCompount/Input";
import Button from "./helperCompount/Button";
import ButtonWarning from "./helperCompount/ButtonWarning";
import { LoadingButton } from "./helperCompount/index";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

export default function SignupCompount() {
  const [error, setError] = useState("");
  const Naviagte = useNavigate();
  const Dispatch = useDispatch();
  const [loadingBtn, setLoadingBtn] = useState(false);
  interface CreateuserSchema {
    username: string;
    password: string;
    email: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateuserSchema>();

  const createUser = async (data: CreateuserSchema) => {
    setLoadingBtn(true);
    try {
      const formData = new FormData();

      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      console.log(formData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setLoadingBtn(false);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("username", response.data.data.user.username);
        localStorage.setItem("userId", response.data.data.user._id);
        localStorage.setItem("accessToken", response.data.data.accessToken);

        Dispatch(login(response.data));
        Naviagte("/");
      }
    } catch (error: any) {
      if (error.response) {
        setLoadingBtn(false);

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
    <div className=" pt-12  bg-neutral-100 p-2 flex justify-center h-screen">
      <div className="flex w-10/12  rounded-xl ">
        <div className="w-3/5">
          <img className="h-full w-full" src={signupImage} alt="" />
        </div>
        <div className=" bg-white  h-full w-2/5 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="!text-black p-3 font-semibold text-2xl pb-3">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-col w-80 max-lg:w-full justify-center items-center">
              <Input
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 2,
                    message: "Username must be at least 2 characters long",
                  },
                  pattern: {
                    value: /^\S*$/,
                    message: "Username cannot contain spaces",
                  },
                })}
                type={"text"}
                placeholder={"Your Name"}
                label={"username"}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  Username is required and must be at least 2 characters And No
                  space.
                </p>
              )}
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
              {errors.email && (
                <p className="text-red-500 text-sm">
                  email is required and must be at least 2 characters And No
                  space.
                </p>
              )}
              <Input
                {...register("password", { required: true, minLength: 6 })}
                placeholder={"******"}
                label={"password"}
                autoComplete="false"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  password is required and must be at least 6 characters And No
                  space.
                </p>
              )}
            </div>
            {loadingBtn ? (
              <LoadingButton />
            ) : (
              <Button
                label={"Sign up"}
                type="submit"
                className={"bg-gray-800"}
              />
            )}
          </form>
          <h2 className="text-red-500 font-normal">{error}</h2>
          <ButtonWarning
            label={"Already Have an account ?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

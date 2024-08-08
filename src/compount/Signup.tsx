import axios from "axios";
import { useState } from "react";
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
  const [loadingBtn, setLoadingBtn] = useState(false);
  interface CreateuserSchema {
    username: string;
    password: string;
    email: string;
    avatar: string;
    coverImage: string;
    fullName: string;
  }
  const { register, handleSubmit, watch } = useForm();

  const avatar = watch("avatar");
  const coverImage = watch("coverImage");
  const createUser = async (data: CreateuserSchema) => {
    setLoadingBtn(true);
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      formData.append("coverImage", data.coverImage[0]);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("fullName", data.password);

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
        setLoadingBtn(true);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        localStorage.setItem("username", response.data.data.user.username);
        localStorage.setItem("userId", response.data.data.user._id);
        localStorage.setItem("accessToken", response.data.data.accessToken);

        Dispatch(login(response.data));
        Naviagte("/");
      }
    } catch (error: any) {
      if (error.response) {
        setLoadingBtn(true);

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
    <div className="bg-neutral-900 p-2 flex justify-center">
      <div className="flex w-full justify-center">
        <div className=" bg-white rounded-2xl h-full w-1/2 max-lg:w-full  text-center flex items-center justify-center flex-col ">
          <h2 className="!text-black font-semibold text-2xl pb-3">
            Create an account
          </h2>

          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-col w-96 max-lg:w-full justify-center items-center">
              <Input
                {...register("username", { required: true, minLength: 2 })}
                type={"text"}
                placeholder={"Your Name"}
                label={"username"}
              />
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
              <Input
                {...register("fullName", { required: true, minLength: 2 })}
                placeholder={"******"}
                label={"FullName"}
              />
              <Input
                {...register("avatar", { required: true })}
                type={"file"}
                placeholder={"Avatar image"}
                label={"Avatar"}
              />
              <Input
                {...register("coverImage", { required: true })}
                placeholder={"Cover Image .."}
                label={"Cover Image"}
                type="file"
              />
            </div>
            {loadingBtn ? (
              <button
                disabled
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
              </button>
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

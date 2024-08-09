import React, { useState } from "react";
import axios from "axios";
import getRefreshToken from "../../config"
import Input from "../helperCompount/Input";
import Button from "../helperCompount/Button";
import { useForm } from "react-hook-form";
import { Dialog, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface UserTweet {
  content: string;
}

export default function DialogWithForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const Navigator = useNavigate()
  const { register, handleSubmit } = useForm<UserTweet>();

  const loginUser = async (data: UserTweet) => {
    setError("");
    try {
      setLoadingBtn(true);
      if(!getRefreshToken){
        Navigator('/signup')
        return console.log("logout ")
      }
      console.log(data)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}tweet`,
        data,
        {
          headers: { 
            "Content-Type": "application/json",
             "Authorization":`Bearer ${getRefreshToken}`
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.data);
        setOpen(!open);
        setLoadingBtn(false);

        // Handle successful login (e.g., redirect, save token)
      }
    } catch (error: any) {
      if (error.response) {
        setLoadingBtn(false);

        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        console.log("No response received from server", error.request);
        setError("No response received from server. Please try again later.");
      } else {
        console.log(`Error during signup: ${error.message}`);
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <button
        className="text-white p-4 bg-blue-600 rounded-lg"
        onClick={handleOpen}
      >
        Create Tweet
      </button>
      {open ? (
        <div className="bg-transparent flex items-center justify-center text-black shadow-none">
          <Card className="mx-auto h-80 w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <h2 className="text-center" color="blue-gray">
                Create Tweet
              </h2>
              <form
                onSubmit={handleSubmit(loginUser)}
                className="flex flex-col gap-4 px-5"
              >
                <Input
                  {...register("content", {
                    required: "title is required",
                  })}
                  type="text"
                  placeholder="Today stoires"
                  label="Title"
                />
                
                {!loadingBtn ? (
                  <Button type="submit"  label="Post" />
                ) : (
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
                )}

                {error && (
                  <Typography variant="small" color="red" className="mt-2">
                    {error}
                  </Typography>
                )}
              </form>
            </CardBody>
          </Card>
        </div>
      ) : null}
    </>
  );
}

import React, { useState } from "react";
import { Button, Input } from "../helperCompount/index";
import getRefeshToken from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import {authApi} from '../../api/api'

interface ChangeAvatarImage {
    avatar:string
}
export default function ChangeAvatarImage({ isVisible, onClose }:{
    isVisible:boolean,
    onClose:()=>void
}) {
  const [error, setError] = useState("");
  const Token = getRefeshToken();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangeAvatarImage>();
  const changeAvatar = async (data:ChangeAvatarImage) => {
    setError("");
    if (!Token) {
      return null;
    }
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);

    try {
      const response = await authApi.post(
        `users/changeAvatar`,
        formData,
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        setError("No response received from server. Please try again later.");
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-900 border border-zinc-500 rounded-3xl shadow-xl text-center p-4 max-w-lg mx-auto">
        <button onClick={onClose} className="mb-2 text-xl text-end w-full">
          X
        </button>

        <h2 className="text-white font-semibold">Change avatar </h2>

        <form onSubmit={handleSubmit(changeAvatar)}>
          <div className="flex flex-col items-center justify-center w-96 max-lg:w-64">
            <Input
              {...register("avatar", {
                required: true,
                pattern: {
                  value: /^\S*$/,
                  message: "Title cannot contain spaces",
                },
              })}
              type="file"
              placeholder="avatar Image"
              label="avatar Image"
              className="text-zinc-200"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">
                {" "}
                coverImage is required plz .
              </p>
            )}
            <Button
              label="change avatar"
              type="submit"
              className="bg-gray-800"
            />
            <h2 className="text-red-500 font-normal">{error}</h2>
          </div>
        </form>
      </div>
    </div>
  );
}

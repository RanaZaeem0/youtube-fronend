import React, { useState } from "react";
import { Button, Input } from "../helperCompount/index";
import getRefeshToken from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import {authApi } from "../../api/api"

interface changeCoverImage {
    isVisible: boolean;
    onClose: () => void;
  }
  interface CoverImage {
    coverImage : string
  }
export default function CoverImagePopUp({ isVisible, onClose }:changeCoverImage) {
  const [error, setError] = useState("");
  const Token = getRefeshToken();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoverImage>();
  const ChangeCoverImage = async (data:CoverImage) => {
    setError("");
    if (!Token) {
      return null;
    }
    try {
      const response = await authApi.post(
        `${import.meta.env.VITE_BACKEND_URL}playlist/createPlaylist`,
        data,
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
      <div className="bg-zinc-800 text-center p-4 max-w-lg mx-auto">
        <button onClick={onClose} className="mb-2 text-end w-full">
          X
        </button>

        <h2 className="text-white font-semibold">Change CoverIamge </h2>

        <form onSubmit={handleSubmit(ChangeCoverImage)}>
          <div className="flex flex-col items-center justify-center w-96 max-lg:w-64">
            <Input
              {...register("coverImage", {
                required: true,
                pattern: {
                  value: /^\S*$/,
                  message: "Title cannot contain spaces",
                },
              })}
              type="file"
              placeholder="Cover Image"
              label="Cover Image"
              className="text-zinc-200"
            />
            {errors.coverImage && (
              <p className="text-red-500 text-sm">
                {" "}
                coverImage is required plz .
              </p>
            )}
            <Button
              label="Edit"
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

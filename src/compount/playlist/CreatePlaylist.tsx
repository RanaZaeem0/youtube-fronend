import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../helperCompount/Input";
import Button from "../helperCompount/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import ButtonWarning from "../helperCompount/ButtonWarning";
import { useForm } from "react-hook-form";
import getRefreshToken from "../../config";

interface CreatePlaylistProps {
  isVisible: boolean;
  onClose: () => void;
}

interface CreatePlaylistData {
  title: string;
}

export default function CreatePlaylist({
  isVisible,
  onClose,
}: CreatePlaylistProps) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<CreatePlaylistData>();
  const Token = getRefreshToken();
  // Ensure that hooks are always called in the same order.
  const createPlaylist = async (data: CreatePlaylistData) => {
    setError("");
    if (!Token) {
      return null;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}playlist/createPlaylist`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Token}`, // Make sure this function call is correct
            "Content-Type": "application/json",
          },
        }
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
          <FontAwesomeIcon
            className="text-white h-5 w-5"
            icon={faSquareXmark}
          />
        </button>

        <div className="">
          <h2 className="text-white font-semibold">New Song</h2>
        </div>

        <h2 className="text-white font-semibold">Create Playlist</h2>

        <form onSubmit={handleSubmit(createPlaylist)}>
          <div className="flex flex-col items-center justify-center w-96 max-lg:w-64">
            <Input
              {...register("title", {
                required: true,
                pattern: {
                  value: /^\S*$/,
                  message: "Title cannot contain spaces",
                },
              })}
              type="text"
              placeholder="Title"
              label="Title"
              className="text-zinc-200"
            />
            <Button
              label="Create Playlist"
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

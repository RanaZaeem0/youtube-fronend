import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../helperCompount/Input";
import Button from "../helperCompount/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import {  faSquareCheck} from "@fortawesome/free-regular-svg-icons";

import useGetPlaylist from "../../hook/useGetUserPlaylist.ts";
import ButtonWarning from "../helperCompount/ButtonWarning";
import { LoadingButton } from "../helperCompount/index.ts";
import { useForm } from "react-hook-form";
import getRefreshToken from "../../config";
import {authApi} from '../../api/api'
interface CreatePlaylistProps {
  isVisible: boolean;
  onClose: () => void;
  videoId?: string;
}

interface CreatePlaylistData {
  name: string;
}

export default function CreatePlaylist({
  isVisible,
  onClose,
  videoId,
}: CreatePlaylistProps) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [addVideoLoading, setAddVideoLoading] = useState(false);
  const [addPlaylistLoading, setAddPlaylistLoading] = useState(false);

  const { register, handleSubmit } = useForm<CreatePlaylistData>();
  const { isPlaylistLoading, getPlaylist,refetchPlaylist } = useGetPlaylist();
  const Token = getRefreshToken();
  // Ensure that hooks are always called in the same order.
  const createPlaylist = async (data: CreatePlaylistData) => {
    setError("");
    if (!Token) {
      return null;
    }
    console.log(data);
    try {
      setAddPlaylistLoading(true);
      const response = await authApi.post(
        `${import.meta.env.VITE_BACKEND_URL}playlist/createPlaylist`,
        data,
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/");
        setAddPlaylistLoading(false);
        onClose()
        refetchPlaylist()
      }
    } catch (error: any) {
      setAddPlaylistLoading(false);

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
  console.log(getPlaylist);
  const AddVideo = async (PlaylistId: string) => {
    setError("");
    if (!Token) {
      return null;
    }
    console.log(PlaylistId, Token);
    try {
      setAddVideoLoading(true);
      const response = await authApi.post(
        `playlist/${videoId}/${PlaylistId}`,
        {},
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/");
        onClose()
        setAddVideoLoading(false);

        console.log(response);
      }
    } catch (error: any) {
      setAddVideoLoading(false);

      if (error.response) {
        setError(`Error: ${error.response.data.message || "Server Error"}`);
      } else if (error.request) {
        setError("No response received from server. Please try again later.");
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

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
          {!isPlaylistLoading ? (
            <div className="">
              {getPlaylist.length == 0 ? (
                <h1>There is no playlist</h1>
              ) : (
                <div className="">
                  <h2 className="text-white font-semibold py-2">
                    Your Playlist{" "}
                  </h2>
                  {getPlaylist.map((item) => {
                    return (
                      <>
                        <div className="text-white p-2 rounded-lg flex w-full justify-between overflow-hidden h-auto">
                          <h1 className="">{item.name}</h1>
                          {!addVideoLoading ? (
                            <button
                              onClick={() => AddVideo(item._id)}
                              className="bg-zinc-800 "
                            >
                              <FontAwesomeIcon icon={faSquareCheck} />
                            </button>
                          ) : (
                            <LoadingButton />
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <h2 className="text-white font-semibold">Create Playlist</h2>

        <form onSubmit={handleSubmit(createPlaylist)}>
          <div className="flex flex-col items-center justify-center w-96 max-lg:w-64">
            <Input
              {...register("name", {
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
            {!addPlaylistLoading ? (
              <Button
                label="Create Playlist"
                type="submit"
                className="bg-gray-800"
              />
            ) : (
              <LoadingButton />
            )}
            <h2 className="text-red-500 font-normal">{error}</h2>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import getRefreshToken from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export default function LikeButton({
  videoId,
  videoLike,
}: {
  videoId: string | undefined;
  videoLike: number | undefined;
}) {
  const Token = getRefreshToken()
  const Navigator = useNavigate();
  const handleLike = async (videoId: string) => {
    try {
      if (!Token) {
        Navigator("/signup");
        return console.log("not login");
      }
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}like/${videoId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.log(
          `Error response from server: ${error.response.status} - ${error.response.data}`
        );
      } else if (error.request) {
        // No response received from server
        console.log("No response received from server", error.request);
      } else {
        // Other errors
        console.log(`Error during signup: ${error.message}`);
      }
    }
  };
  return (
    <div>
      <button onClick={() => {
          if (videoId) {
            handleLike(videoId);
          } else {
            console.error("Channel ID is not defined");
          }
      }}>
        <button
          type="button"
          className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
        >
          <h2 className="pr-2">{videoLike}</h2>
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
          </svg>
        </button>
      </button>
    </div>
  );
}

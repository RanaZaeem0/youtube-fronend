import React from "react";
import getRefreshToken from "../../config"
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SubcriberBtn({channalId}:{
    channalId?:string
}) {
    const Navigator = useNavigate()
  const handleSubcribeChannel = async (channelId: string) => {
    try {
      if (!getRefreshToken) {
        Navigator("/signup");
        return console.log("not login");
      }
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}subscription/${channelId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getRefreshToken}`,
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
      <div className="mr-2">
        <button
          type="button"
          onClick={() => handleSubcribeChannel(channalId)}
          className="text-white bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none bg-zinc-900 shadow-lg  dark:shadow-lg  font-normal rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

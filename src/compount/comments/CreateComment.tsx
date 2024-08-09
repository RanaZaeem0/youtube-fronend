import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {LoadingButton,Input,Button} from "../helperCompount/index.ts"


import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useGetCommentById from "../../hook/useGetVideoCommentById.ts";
import { formatDistanceToNow } from "date-fns";
import getRefreshToken from "../../config.ts";
export default function CreateComments() {
  const { videoId } = useParams();
  interface commentData {
    content: string;
  }
  const [error, setError] = useState("");
  const [isCreateLoading,setIsCreateLoading] = useState(false)
  const { register, handleSubmit, setValue } = useForm<commentData>();

  const { getComments,isLoading } = useGetCommentById();
  if (!isLoading) {
    console.log(getComments);
  }

  const CreateComments = async (data: commentData) => {
    setError("");
    try {
      if(!getRefreshToken){
        return null
      }
      
      setIsCreateLoading(true)
      const userDetails: commentData = data;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}comment/${videoId}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getRefreshToken}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response);
        setIsCreateLoading(false)

        console.log(response.data);
      }
    } catch (error: any) {
      setIsCreateLoading(false)

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

  function formatDateRelative(date: string) {
    const createdAt = new Date(date);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  }

  return (
    <div className="bt-8 w-full">
      <div className="bg-black text-white flex justify-center ">
        <form className="w-full" onSubmit={handleSubmit(CreateComments)}>
          <div className=" flex-col max-lg:w-10/12 flex items-end justify-center w-10/12">
            <Input
              className="w-full bg-neutral-700 text-white h-3  border p-5 rounded-none   mt-2 "
              {...register("content", { required: true, minLength: 1 })}
              placeholder={"Write Your comment"}
            />
            <div className="w-24 flex items-end justify-end">
              { !isCreateLoading ? 
                <Button
                  label={"Create"}
                  type="submit"
                  className={"bg-gray-800 "}
                />
                : <LoadingButton/>
              }
            </div>
          </div>

          <h2 className="text-red-500 font-normal">{error}</h2>
        </form>
      </div>
      <div className="">
        {!isLoading ? (
          getComments &&
          getComments.map((comment, index) => {
            return (
              <div className="flex items-start gap-4 justify-center p-4 rounded-md bg-background shadow-sm">
                <img
                  src={comment.commentUser.avatar}
                  className="h-4 w-3"
                  alt=""
                />
                <div className="flex-1 grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {comment?.commentUser.username}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateRelative(comment.createdAt)}
                    </div>
                  </div>
                  <div className="text-muted-foreground">{comment.content}</div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>Loawding ..</h2>
        )}
      </div>
    </div>
  );
}

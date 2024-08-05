import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Input from "../helperCompount/Input";
import Button from "../helperCompount/Button";
import { useParams } from "react-router-dom";
import ButtonWarning from "../helperCompount/ButtonWarning";
import { useForm } from "react-hook-form";
export default function CreateComments({comments,videoId}) {

  const naigavte = useNavigate();
  const { videoId } = useParams();
  interface commentData {
    content: string;
  }
  const [error, setError] = useState("");
  const { register, handleSubmit, setValue } = useForm<commentData>();

  useEffect(() => {
     try {
      const userDetails: commentData = data;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comment/${videoId}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response);

        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("username", response.data.id);

        console.log(response.data);

        naigavte("/allblog");
      }
    } catch (error: any) {
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
  }, []);
  const CreateComments = async (data: commentData) => {
    setValue("content", "Write your");

    console.log(data);
    setError("");
    try {
      const userDetails: commentData = data;
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/comment/${videoId}`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        console.log(response);

        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("username", response.data.id);

        console.log(response.data);

        naigavte("/allblog");
      }
    } catch (error: any) {
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

  return (
 <div className="">
     <div className="bg-slate-800 text-white flex justify-center ">
      <form onSubmit={handleSubmit(CreateComments)}>
        <div className="flex  max-lg:w-full items-center justify-center w-full">
          <Input
            {...register("content", { required: true, minLength: 6 })}
            placeholder={"Write Your comment"}
            label={"content"}
          />
          <Button label={"Post"} type="submit" className={"bg-gray-800"} />
        </div>

        <h2 className="text-red-500 font-normal">{error}</h2>
      </form>
      
    </div>
    <div className="">
   {
    comments && comments.map((comment , index) =>{
      return (
        <div className="flex items-start gap-4 p-4 rounded-md bg-background shadow-sm">
        h1
        <div className="flex-1 grid gap-1.5">
          <div className="flex items-center gap-2">
            <div className="font-medium">{comment.owner}</div>
            <div className="text-xs text-muted-foreground">5 hours ago</div>
          </div>
          <div className="text-muted-foreground">
         {comment.content}
          </div>
        </div>
      </div>
      )
    })
   }
    </div>
 </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getRefreshToken from "../config";
interface channalDetails {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  isSubscribed: boolean;
  subscribersCount: string;
}

interface Comment {
  _id: string;
  content: string;
}

interface VideoData {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number; // Adjust type based on how you handle duration
  views: number; // Adjust type based on how you handle views
  isPublished: boolean;
  owner: string;
  createdAt: string; // You may use Date if parsing this as a Date object
  updatedAt: string; // You may use Date if parsing this as a Date object
  channalDetails: channalDetails[];
  videoLikes: number; // Adjust type based on how you handle likes
  comments: Comment[];
}

export default function useGetVideobyId() {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { videoId } = useParams();
  const localuserId  = localStorage.getItem('userId')
  const Token = getRefreshToken();
  useEffect(() => {
    const featchVideo = async () => {
      try {
        if (localuserId) {
          const getAllVideo = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}video/${videoId}`,
            {
              headers: {
                userId: localuserId
              },
            }
          );
          if (getAllVideo.status >= 200 && getAllVideo.status <= 300) {
            console.log(getAllVideo.data.data[0]);

            setVideo(getAllVideo.data.data[0]);
            setIsLoading(false);
          }
        } else {
          const getAllVideo = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}video/${videoId}`
          );

          if (getAllVideo.status >= 200 && getAllVideo.status <= 300) {
            console.log(getAllVideo.data.data[0]);

            setVideo(getAllVideo.data.data[0]);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    featchVideo();
  }, [videoId]);

  return {
    isLoading,
    video,
  };
}

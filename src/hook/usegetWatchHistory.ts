import axios from "axios";
import { useEffect, useState } from "react";
import getRefreshToken from "../config";
import {authApi} from "../api/api"
interface UserData {
  _id: string;
  username: string;
  email: string;
  avatar: string;
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
  owner: UserData;
  createdAt: string; // You may use Date if parsing this as a Date object
  updatedAt: string; // You may use Date if parsing this as a Date object
}

type emptyArray = VideoData[];

export default function useGetWatchHistory() {
  const [watchHistory, setWatchHistory] = useState<emptyArray>([]);
  const [isLoading, setIsLoading] = useState(true);
  const Token = getRefreshToken();
  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        if (!Token) {
          return null;
        }
        const response = await authApi.get(`users/getWatchHistory`)
          .then((res) => {
            setWatchHistory(res.data.data);
            setIsLoading(false);
           console.log(res)
          });
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch watch history. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchWatchHistory();
  }, []);

  return {
    isLoading,
    watchHistory,
  };
}

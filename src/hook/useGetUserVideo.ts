import axios from "axios";
import { useEffect, useState } from "react";
import getRefreshToken from "../../src/config";
import {authApi } from "../api/api"

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
  owner: string;
  createdAt: string; // You may use Date if parsing this as a Date object
  updatedAt: string; // You may use Date if parsing this as a Date object
  UserDetails: UserData[];
  videoLikes: number; // Adjust type based on how you handle likes
}

type AllVideoData = VideoData[];

export default function useGetUserVideo() {
  const [video, setVideo] = useState<AllVideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state
  const Token = getRefreshToken();

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        if(!Token){
          return null
        }
        const response = await authApi.get(
          `${import.meta.env.VITE_BACKEND_URL}video/`,
        );

        if (response.status >= 200 && response.status <= 299) {
          setVideo(response.data.data as AllVideoData); // Type assertion
        } else {
          setError("Failed to fetch videos");
        }
      } catch (error) {
        setError("An error occurred while fetching videos");
        console.error(error); // Log the error for debugging
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, [Token]); // Added Token as a dependency (ensure it doesn't change frequently)

  return {
    isLoading,
    video,
    error, // Return error state
  };
}

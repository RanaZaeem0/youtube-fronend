import axios from "axios";
import { useEffect, useState } from "react";
import getRefreshToken from "../../src/config";
import { useParams } from "react-router-dom";
// Define the structure for ChannelDetails
interface ChannelDetails {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

interface VideoData {
  _id: string;
  title: string;
  description: string;
  duration: number;
  isPublished: boolean;
  owner: string; // User ID of the video owner
  thumbnail: string;
  videoFile: string;
  views: number;
  createdAt: string; // ISODate string
  updatedAt: string; // ISODate string
  ChannalDetails: ChannelDetails[]; // Details about the channel owner
}

interface Like {
  _id: string;
  video: string; // Video ID
  likedBy: string; // User ID who liked the video
  createdAt: string; // ISODate string
  updatedAt: string; // ISODate string
  VideoData: VideoData[]; // Array of VideoData objects
}



export default function useGetLikeVideo() {
  const [likeVideo, setLikeVideo] = useState<Like[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state if needed
  const token = getRefreshToken();
  useEffect(() => {
    const fetchLikeVideo = async () => {
      try {
        console.log("enter hook");
        
        if (!token) {
          console.log("No token found, user might be logged out");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}like/likeVideo`, // Corrected spelling from 'channal' to 'channel'
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setLikeVideo(response.data.data);
      } catch (error) {
        console.error("Error fetching channel profile:", error);
        setError("Failed to fetch channel profile"); // Handle error appropriately
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikeVideo();
  }, []); // Add `username` and `getRefreshToken` to the dependency array if necessary

  return {
    isLoading,
    likeVideo,
    error, // Include error in the returned object
  };
}

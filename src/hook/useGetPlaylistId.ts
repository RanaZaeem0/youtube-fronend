import { useEffect, useState } from "react";
import getRefreshToken from "../config";
import {useParams} from "react-router-dom"
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
  channalDetails: UserData[];
  videoLikes: number; // Adjust type based on how you handle likes
 
}


interface PlaylistIddata {
  _id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  videos:VideoData[]
}



type emptyArray = PlaylistIddata[];

export default function useGetPlaylistId() {
  const [getPlaylistId, setgetPlaylistId] = useState<emptyArray>([]);
  const [isPlaylistIdLoading, setIsPlaylistIdLoading] = useState(true);
  const Token  = getRefreshToken()
  const { playlistId } = useParams<{ playlistId: string }>();
  useEffect(() => {
    const fetchPlaylistId = async () => {
      try {
        if (!Token) {
          return null;
        }
        const response = await authApi
          .get(`playlist/${playlistId}`)
          .then((res) => {
            setgetPlaylistId(res.data.data);
            setIsPlaylistIdLoading(false);
          });
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch PlaylistId . Please try again later.");
        setIsPlaylistIdLoading(false);
      }
    };

    fetchPlaylistId();
  }, []);

  return {
    getPlaylistId,
    isPlaylistIdLoading,
  };
}

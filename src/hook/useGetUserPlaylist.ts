import axios from "axios";
import { useEffect, useState } from "react";
import getRefreshToken from "../config";
import {authApi} from '../api/api'
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

interface Playlistdata {
  _id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  totalVideos:number;
  firstVideo: VideoData;
}

type emptyArray = Playlistdata[];

export default function useGetPlaylist() {
  const [getPlaylist, setgetPlaylist] = useState<emptyArray>([]);
  const [isPlaylistLoading, setIsPlaylistLoading] = useState(true);
  
  const [shouldRefetch,setShouldRefetch] = useState(true)

  const Token = getRefreshToken();
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        if (!Token) {
          return null;
        }
        const response = await authApi
          .get(`${import.meta.env.VITE_BACKEND_URL}Playlist`, {
         
          })
          .then((res) => {
            setgetPlaylist(res.data.data);
            setIsPlaylistLoading(false);
          });
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch Playlist . Please try again later.");
        setIsPlaylistLoading(false);
      }
    };

    fetchPlaylist();
  }, [shouldRefetch]);

  const refetchPlaylist = () => {
    setShouldRefetch(prev => !prev);
  };
  return {
    getPlaylist,
    isPlaylistLoading,
    refetchPlaylist
  };
}

import axios from 'axios';
import { log } from 'console';
import { useEffect, useState } from 'react';

interface UserDetails {
  username: string;
  avatar: string;
  email: string;
  id: string;
}

interface AllVideoData {
  UserDetails: UserDetails;
  id: string;
  title: string;
  description: string;
  published: boolean;
  thumbnail: string;
  createdAt: string; // Use Date if you plan to parse this to a Date object
  duration: string;
  owner: string;
  updatedAt: string;
  videoFile: string;
  views: string;
}

type DataVideos = AllVideoData[];

interface UseAllVideoProps {
  limit?: number;
  page?: number;
}

export default function useAllvideo({ limit = 4, page = 0 }: UseAllVideoProps) {
  const [videos, setVideos] = useState<DataVideos>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}video/allvideo/${limit}?page=${page}`);
        const { data } = response.data.data;
        const videos = response.data.data[0]
        const hasMore = response.data.data[1]

        console.log(response)

        setVideos(prevVideos => [...prevVideos, ...videos]); // Append new videos to the existing list
        setHasMore(hasMore); // Update hasMore flag based on response
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [limit, page]);

  return {
    isLoading,
    videos,
    hasMore
  };
}

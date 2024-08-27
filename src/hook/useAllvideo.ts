import axios from 'axios';
import { useEffect, useState } from 'react';
import {api} from "../api/api"
interface channalDetails {
  username: string;
  avatar: string;
  email: string;
  _id: string;
}

interface AllVideoData {
  channalDetails: channalDetails[]; // Change to an array of channalDetails
  _id: string;
  title: string;
  description: string;
  isPublished: boolean;
  thumbnail: string;
  createdAt: string; // Use Date if you plan to parse this to a Date object
  duration: string;
  owner: string;
  updatedAt: string;
  videoFile: string;
  views: number;
}

type DataVideos = AllVideoData[];

interface UseAllVideoProps {
  limit?: number;
  page?: number;
}


export default function useAllvideo({ limit = 9, page = 0 }: UseAllVideoProps) {
  const [videos, setVideos] = useState<DataVideos>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`video/allvideo/${limit}?page=${page}`);
        const responseData = response.data.data as [DataVideos, { hasMore: boolean }];

        const videos = responseData[0];
        const hasMoreFlag = responseData[1].hasMore;

        setVideos(prevVideos => [...prevVideos, ...videos]); // Append new videos to the existing list
        setHasMore(hasMoreFlag); // Update hasMore flag based on response
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

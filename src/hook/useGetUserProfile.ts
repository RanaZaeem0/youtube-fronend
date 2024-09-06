import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {api } from "../api/api"


interface UserProfile {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  coverImage: string;
  subscribersCount: number;
  isSubscribed: boolean;
}

export default function useGetUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching data for username:", username);

        const res = await api.get(`users/channal/${username}`, {
        });

        if (res.status >= 200 && res.status <= 300) {
          console.log("Data received:", res.data.data);
          setUserProfile(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, []);



  return {
    isProfileLoading,
    userProfile,
  };
}

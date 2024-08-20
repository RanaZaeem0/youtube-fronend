import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface channalProfile {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  coverImage: string;
  subscribersCount: number;
  isSubscribed: boolean;
}

export default function useGetchannalProfile() {
  const [channalProfile, setchannalProfile] = useState<channalProfile | null>(null);
  const [isChannalProfileLoading, setIsChannalProfileLoading] = useState(true);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    const fetchchannalProfile = async () => {
      try {
        const localUserId  = localStorage.getItem('userId')
        console.log("Fetching data for username:", username);

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}users/channal/${username}`, {
          headers: {
            "Content-Type": "application/json",
              userId:localUserId
          },
        });

        if (res.status >= 200 && res.status <= 300) {
          console.log("Data received:", res.data.data);
          setchannalProfile(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsChannalProfileLoading(false);
      }
    };

    if (username) {
      fetchchannalProfile();
    }
  }, []);



  return {
    isChannalProfileLoading,
    channalProfile,
  };
}

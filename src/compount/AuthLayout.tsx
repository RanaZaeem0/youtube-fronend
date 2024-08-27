import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useParams } from "react-router-dom";
import {authApi,api } from "../api/api"
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
export default function AuthLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  
  useEffect(() => {
    const username = localStorage.getItem("username");
    const fetchUserProfile = async () => {
      try {
        console.log("Fetching data for username:", username);

        const res = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}users/channal/${username}`,
        );

        if (res.status >= 200 && res.status <= 300) {
         setUserProfile(res.data.data)
         dispatch(login(res.data.data));
         console.log(userProfile,res.data.data)
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

  const Navigator = useNavigate();
  const refreshToken: any = localStorage.getItem("refreshToken");

  useEffect(() => {
    if (
      refreshToken == "undefined" &&
      refreshToken == null &&
      refreshToken?.length > 10
    ) {
      Navigator("/");
    } else {
    
      console.log(userProfile)
    }
  }, []);

  return <div>{children}</div>;
}

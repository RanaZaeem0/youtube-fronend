import axios from "axios";
import { useEffect, useState } from "react";
import getRefreshToken from "../config";

interface Tweetdata {
  _id: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

type emptyArray = Tweetdata[];

export default function useGetTweet() {
  const [getTweet, setgetTweet] = useState<emptyArray>([]);
  const [isTweetLoading, setIsTweetLoading] = useState(true);
  const Token  = getRefreshToken()
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        if (!Token) {
          return null;
        }
        const response = await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}Tweet`, {
            headers: {
              Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setgetTweet(res.data.data);
            setIsTweetLoading(false);
          });
      } catch (error) {
        console.log(error);
        console.log("Failed to fetch Tweet . Please try again later.");
        setIsTweetLoading(false);
      }
    };

    fetchTweet();
  }, []);

  return {
    getTweet,
    isTweetLoading,
  };
}

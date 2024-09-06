import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import getRefreshToken from "../config";
import dayjs from "dayjs";
import {jwtDecode} from "jwt-decode";

// Define types for the JWT payload
interface JwtPayload {
  exp: number;
}

// Define a type for the response from the refresh token endpoint
interface RefreshTokenResponse {
  data: {
    refreshToken: string;
  };
}

const token: string | boolean  = getRefreshToken();
const baseURL: string = `${import.meta.env.VITE_BACKEND_URL}`;

const api: AxiosInstance = axios.create({
  baseURL,
});

const authApi: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

authApi.interceptors.request.use(async (req) => {
  if (!token) {
    const token = getRefreshToken()
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }

  const {exp}: JwtPayload = jwtDecode<JwtPayload>(token);
  const isExpired: boolean = dayjs.unix(exp).diff(dayjs()) < 1;

  if (!isExpired) {
    console.log("not expired")
    return req;

  }

  try {
    const response = await axios.post<RefreshTokenResponse>(`${baseURL}users/refresh-token`, {
      refreshToken: token,
    });
   console.log("is isxpired")
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    req.headers.Authorization = `Bearer ${response.data.data.refreshToken}`;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Handle token refresh error, possibly log out the user or redirect to login
  }

  return req;
});

export { api, authApi}
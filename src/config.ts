// utils/getRefreshToken.ts

// Function to get the refresh token from localStorage
export default function getRefreshToken(): string | null {
  const refreshToken = localStorage.getItem('refreshToken');
  
  // Check if the refresh token is available and valid
  if (refreshToken !== undefined && refreshToken !== "" && refreshToken !== null) {
    return refreshToken;
  } else {
    return null; // Return null if the token is not available
  }
}

import { useState, MouseEvent } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router";
import { ListItemText } from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEllipsis } from "@fortawesome/free-solid-svg-icons"
import CreatePlaylist from "../playlist/CreatePlaylist"
import getRefreshToken from "../../config"
import axios from "axios"
import {authApi} from '../../api/api'
const TweetDropdown = ({tweetId}:{
    tweetId:string
}) => {
  const [avatarEl, setAvatarEl] = useState<HTMLElement | null>(null);
  const [invisible, setInvisible] = useState(false);
  const [notifyEl, setNotifyEl] = useState<HTMLElement | null>(null);
  const Navigator = useNavigate();

  const handleAvatarClick = (e: MouseEvent<HTMLElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleNotifyClose = () => {
    setNotifyEl(null);
  };
  
  const dispatch = useDispatch();

  const handleDelete = (tweetId:string) => {


    try {
        if (!getRefreshToken) {
          Navigator("/signup");
          return console.log("not login");
        }
        authApi.delete(
          `tweet/${tweetId}`,
        ).then((response)=>{

            if (response.status >= 200 && response.status < 300) {
                console.log(response.data.message);
              }
        })
  
        
      } catch (error: any) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.log(
            `Error response from server: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          // No response received from server
          console.log("No response received from server", error.request);
        } else {
          // Other errors
          console.log(`Error during signup: ${error.message}`);
        }
      }

  };
  const handleEdit  = (tweetId:string)=>{
    try {
        if (!getRefreshToken) {
          Navigator("/signup");
          return console.log("not login");
        }
        authApi.patch(
          `tweet/${tweetId}`,
          {}
        ).then((response)=>{

            if (response.status >= 200 && response.status < 300) {
                console.log(response.data.message);
              }
        })
  
        
      } catch (error: any) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.log(
            `Error response from server: ${error.response.status} - ${error.response.data}`
          );
        } else if (error.request) {
          // No response received from server
          console.log("No response received from server", error.request);
        } else {
          // Other errors
          console.log(`Error during signup: ${error.message}`);
        }
      }

  }


 const [playlistBtn,setPlaylistBtn] = useState(false)
  const handlePlaylist = () => {
 setPlaylistBtn(!playlistBtn)
  };

  const open = Boolean(avatarEl);
  const id = open ? "simple-popover" : undefined;
  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simple-notify" : undefined;
  const username: string | null = localStorage.getItem('username');
  const userId: string | null = localStorage.getItem('userId');

  return (
    <div className="">
          {
             
              }
      <Stack className="max-md:!w-12" direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
          <div className="text-[1.2rem] text-black">
          <FontAwesomeIcon className="text-white" icon={faEllipsis} />
          </div>
        </Button>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List disablePadding className="bg-slate-800 text-neutral-400">
          
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={()=>handleEdit(tweetId)}>Edit</button>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={()=>handleDelete(tweetId)}>delete</button>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>

      <Popover
        id={notifyId}
        open={notifyOpen}
        anchorEl={notifyEl}
        onClose={handleNotifyClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Avatar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Favorites" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default TweetDropdown;

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
import IconYoutube from "../img/youtube.webp"
import { ListItemText } from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faBars,
    faBarsProgress,
    faBell,
    faClockRotateLeft,
    faHouse,
    faThumbsUp,
    faUser,
    faVideo,
    faXmark,
  } from "@fortawesome/free-solid-svg-icons";
const NavAvatars = () => {
  const [avatarEl, setAvatarEl] = useState<HTMLElement | null>(null);
  const [invisible, setInvisible] = useState(false);
  const [notifyEl, setNotifyEl] = useState<HTMLElement | null>(null);
  const handleSidebar =()=>{

  }
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
  const Navigator = useNavigate();

  const handleLogout = () => {

  };



  const open = Boolean(avatarEl);
  const id = open ? "simple-popover" : undefined;
  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simple-notify" : undefined;
  const username: string | null = localStorage.getItem('username');
  const userId: string | null = localStorage.getItem('userId');

  return (
    <div>
      <Stack className="max-md:!w-12" direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
        <FontAwesomeIcon className="pl-4 text-white h-5" icon={faBars} />
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
        <List
        className="bg-zinc-800 text-white  w-72"
        disablePadding >
          
          
          <ListItem disablePadding>
            <ListItemButton>
            <div
            className="flex items-center justify-center pl-3 "
            onClick={() => Navigator("/")}
          >
            <img className="h-8 w-10 mr-2" src={IconYoutube} alt="" />
            <h2 className="font-bold text-sm text-white ">Youtube</h2>
          </div>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator("/");
                    }}
                    className="px-2 py-3 mr-2  hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon className="pr-2" icon={faHouse} /> Home
                  </h2>
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator(`/profile/${username}`);
                      handleSidebar();
                    }}
                    className="px-2 py-3 mr-2 hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon className="pr-2" icon={faUser} />
                    Your channel
                  </h2>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator(`/PlayList/`);
                      handleSidebar();
                    }}
                    className="px-2 py-3 mr-2 hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon className="pr-2" icon={faBarsProgress} />
                    Playlists
                  </h2>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator(`/profile/${username}`);
                      handleSidebar();
                    }}
                    className="px-2 py-3 mr-2 hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon className="pr-2" icon={faVideo} />
                    Your videos
                  </h2>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator(`/likeVidoes/`);
                      handleSidebar();
                    }}
                    className="px-2 py-3 mr-2 hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon className="pr-2" icon={faThumbsUp} />
                    Liked videos
                  </h2>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
            <h2
                    onClick={() => {
                      Navigator(`/watchhistory/`);
                      handleSidebar();
                    }}
                    className="px-2 py-3 mr-2 hover:bg-slate-800 cursor-pointer rounded-lg w-full"
                  >
                    <FontAwesomeIcon
                      className="pr-2"
                      icon={faClockRotateLeft}
                    />
                    History
                  </h2>
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

export default NavAvatars;

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

const NavAvatars = () => {
  const [avatarEl, setAvatarEl] = useState<HTMLElement | null>(null);
  const [invisible, setInvisible] = useState(false);
  const [notifyEl, setNotifyEl] = useState<HTMLElement | null>(null);

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
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    location.reload();
  };

  const handleSetting = () => {
    navigate("/userupdate");
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
          <div className="text-[1.2rem] text-black">
            <div className='flex items-center'>
              <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-700 text-white rounded-full dark:bg-gray-600">
                <span className="font-medium text-white dark:text-gray-300">
                  {username && username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
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
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <h1>{username}</h1>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={() => navigate(`/profile/${username}`)}>Your Profile</button>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={handleSetting}>Settings</button>
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={()=> navigate('/watchhistory')}>Watch History</button>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={handleLogout}>Logout</button>
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

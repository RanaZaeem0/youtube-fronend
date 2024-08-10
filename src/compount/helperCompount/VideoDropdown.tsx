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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CreatePlaylist from "../playlist/CreatePlaylist";

const VideoDropdown = () => {
  const [avatarEl, setAvatarEl] = useState<HTMLElement | null>(null);
  const [notifyEl, setNotifyEl] = useState<HTMLElement | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => setIsPopupVisible(true);
  const hidePopup = () => setIsPopupVisible(false);

  const handleAvatarClick = (e: MouseEvent<HTMLElement>) => setAvatarEl(e.currentTarget);
  const handleAvatarClose = () => setAvatarEl(null);
  const handleNotifyClose = () => setNotifyEl(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Adjust the navigation as needed
  };

  const open = Boolean(avatarEl);
  const id = open ? "simple-popover" : undefined;
  const notifyOpen = Boolean(notifyEl);
  const notifyId = notifyOpen ? "simple-notify" : undefined;
  const username: string | null = localStorage.getItem('username');

  return (
    <div>
      <Stack className="max-md:!w-12" direction="row" spacing={1}>
        <Button aria-describedby={id} onClick={handleAvatarClick}>
          <div className="text-[1.2rem] text-black">
            <FontAwesomeIcon className="text-white" icon={faEllipsis} />
          </div>
        </Button>
      </Stack>

      <Popover
        id={id}
        open={Boolean(avatarEl)}
        anchorEl={avatarEl}
        onClose={handleAvatarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <List disablePadding className="bg-slate-800 text-neutral-400">
          <ListItem disablePadding>
            <ListItemButton>
              <h1>{username}</h1>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={() => navigate(`/profile/${username}`)}>Save to WatchLater</button>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={showPopup}>Add playlist</button>
              <CreatePlaylist isVisible={isPopupVisible} onClose={hidePopup} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <button onClick={() => navigate('/watchhistory')}>Share</button>
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
    </div>
  );
};

export default VideoDropdown;

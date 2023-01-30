import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { logoutUser } from '../redux/apiRequest';
import { Link } from 'react-router-dom';

export default function LoginBtn() {
    const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useSelector((state) => state.auth.login.currentUser);
  const [loginDisplay, setLoginDisplay] = useState('Login');
  useEffect(() => {
    if (user) {
      setLoginDisplay(user.username);
    }
  }, [user]);

    const handleLogout = () => {
      logoutUser(dispatch);
    };
  if (!user) {
    return (
      <div>
        <Link to="/login">
          <Button
            id="basic-button"
            >
            LOGIN
          </Button>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {loginDisplay}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
import React from "react";
import "./Header.css";
import Avatar from "@mui/material/Avatar";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import { useState } from "react";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = true;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // todo: add logout logic
    handleClose();
  };

  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:focus": {
      backgroundColor: "#f7963e"
    },
    "&:hover": {
      backgroundColor: "#f7a961"
    }
  }));

  return (
    <header className="new-header">
      <div className="nav-left">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
      </div>

      <img src="/assets/images/logo.png" alt="Logo" className="logo" />

      <div className="nav-right">
        {user ? (
          <>
            <NavLink to="/dashboard" className="nav-link">
              Hello, User 1
            </NavLink>
            <Avatar
              alt="User 1"
              src="/assets/images/user1.png"
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ cursor: "pointer" }}
            />
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  marginTop: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#f7963e",
                  color: "white"
                }
              }}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <StyledMenuItem onClick={handleClose}>
                <ListItemText
                  primary={
                    <NavLink
                      to="/dashboard"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Dashboard
                    </NavLink>
                  }
                  style={{ textAlign: "center" }}
                />
              </StyledMenuItem>
              <StyledMenuItem onClick={handleLogout}>
                <ListItemText
                  primary="Logout"
                  style={{ textAlign: "center" }}
                />
              </StyledMenuItem>
            </Menu>
          </>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;

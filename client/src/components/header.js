import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { MenuList } from "@mui/material";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { UserAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center"
});

const LogoImage = styled("img")({
  margin: "0 auto",
  padding: "1em",
  maxWidth: "100%",
  maxHeight: "5em"
});

const NavLinkButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: "#253674",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: "#f50057"
  }
}));

const AvatarButton = styled(IconButton)(({ theme }) => ({
  background: "#f50057",
  "&:hover": {
    background: "#ff4081"
  }
}));

const pages = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" }
];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavToProfile = () => {
    navigate('/profile'); // Replace '/profile' with the actual route for the profile page
  };

  const handleNavToDashboard = () => {
    navigate('/dashboard');
  };

  const currentUser = useSelector((state) => state.user);
  React.useEffect(() => {
    if (currentUser._id === "") {
      navigate("/login");
    }
  }, [currentUser]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <LogoContainer>
              {pages.map((page) => (
                <NavLinkButton
                  key={page.path}
                  component={NavLink}
                  to={page.path}
                >
                  {page.name}
                </NavLinkButton>
              ))}
              <LogoImage
                src="/assets/images/logo.png"
                alt="sketch connect logo"
              />
            </LogoContainer>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <AvatarButton onClick={handleOpenUserMenu}>
                <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
              </AvatarButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuList>
                <MenuItem onClick={handleNavToProfile}>Profile</MenuItem>
                <MenuItem onClick={handleNavToDashboard}>Dashboard</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

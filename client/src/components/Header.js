import React, { useEffect } from "react";
import "./Header.css";
import { Menu, Avatar } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";

function Header() {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user || user._id === "") {
      navigate("/login");
    }
  }, [dispatch, user]);

  const handleMenu = () => {
    setOpened(!opened);
    console.log(user.profilePic);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="new-header">
      <div className="nav-left">
        <NavLink
          to="/"
          className="nav-link"
          onClick={() => dispatch(resetSession())}
        >
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>
      </div>

      <img src="/assets/images/logo.png" alt="Logo" className="logo" />

      <div className="nav-right">
        {user && user._id !== "" ? (
          <>
            <NavLink to="/dashboard" className="nav-link">
              Hello, {user.name.split(" ")[0] || "Player"}
            </NavLink>

            <Menu
              opened={opened}
              onChange={setOpened}
              classNames={{ item: "menu-item" }}
              radius="md"
            >
              <Menu.Target>
                <Avatar
                  alt="User 1"
                  src={user.profilePic || "/assets/images/user.png"}
                  radius="xl"
                  size="lg"
                  onClick={handleMenu}
                  style={{ cursor: "pointer" }}
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <NavLink
                    to="/dashboard"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Dashboard
                  </NavLink>
                </Menu.Item>

                <Menu.Item color="red" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
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

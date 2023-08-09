// https://mantine.dev/core/menu/
import React, { useEffect } from "react";
import "./Header.css";
import { Menu, Avatar } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resetSession } from "../redux/session/reducer";
import { setLocation } from "../redux/app/reducer";
import { LOCATION } from "../util/constant";
import { removePlayerAsync, updateStatusAsync } from "../redux/session/thunks";

function Header() {
  const { logOut } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const user = useSelector((state) => state.user);
  const currentSession = useSelector((state) => state.session);
  const currentUser = useSelector((state) => state.user._id);
  const userLocation = useSelector((state) => state.app.location);

  useEffect(() => {
    if (!user || user._id === "") {
      navigateTo(LOCATION.LOGIN);
    }
  }, [dispatch, user]);

  const navigateTo = (destination) => {
    if (userLocation === LOCATION.WAITING) {
      dispatch(
        removePlayerAsync({ session: currentSession, player: currentUser })
      );
      if (currentSession.players.length === 0) {
        dispatch(
          updateStatusAsync({
            sessionId: currentSession._id,
            status: "cancelled"
          })
        );
      }
    }
    dispatch(setLocation(destination));
    navigate(destination);
  };

  const handleMenu = () => {
    setOpened(!opened);
  };

  const handleClose = () => {
    setOpened(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="new-header">
      <div className="nav-left">
        <NavLink
          to="/"
          className="nav-link"
          onClick={() => {
            dispatch(resetSession());
            navigateTo(LOCATION.HOME);
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className="nav-link"
          onClick={() => navigateTo(LOCATION.ABOUT)}
        >
          About Us
        </NavLink>
      </div>

      <img src="/assets/images/logo.png" alt="Logo" className="logo" />

      <div className="nav-right">
        {user && user._id !== "" ? (
          <>
            <NavLink
              to="/dashboard"
              className="nav-link"
              onClick={() => navigateTo(LOCATION.DASHBOARD)}
            >
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
                    onClick={() => {
                      navigateTo(LOCATION.DASHBOARD);
                      handleClose();
                    }}
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
          <NavLink
            to="/login"
            className="nav-link"
            onClick={() => navigateTo(LOCATION.LOGIN)}
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;

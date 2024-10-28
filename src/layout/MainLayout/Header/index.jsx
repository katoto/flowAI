import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

// project imports
import LogoSection from "../LogoSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons-react";

// store
import { SET_DARKMODE } from "@/store/actions";
import { env } from "@/api/config";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const customization = useSelector((state) => state.customization);

  const [isDark, setIsDark] = useState(customization.isDarkMode);
  const dispatch = useDispatch();

  const changeDarkMode = () => {
    dispatch({ type: SET_DARKMODE, isDarkMode: !isDark });
    setIsDark((isDark) => !isDark);
    localStorage.setItem("isDarkMode", !isDark);
  };

  const signOutClicked = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    navigate("/", { replace: true });
    navigate(0);
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: "auto",
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <p style={{ marginRight: 10 }}>
        当前业务:{" "}
        <span style={{ color: "#f16722", fontWeight: "bold" }}>
          {customization.bizName}
        </span>
        ， 当前身份:
        <span style={{ color: "#f16722", fontWeight: "bold" }}>
          {customization.jobName}
        </span>
      </p>

      {env && env !== "dev" && (
        <div
          style={{
            cursor: "pointer",
            display: "inline-block",
            lineHeight: "12px",
            verticalAlign: "middle",
            marginRight: "8px",
          }}
          title="点击看通知"
          onClick={() => {
            window.postMessage({
              msgType: "record_slideList",
              noticeType: `all`,
              moduleName: "ins",
            });
          }}
        >
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4196"
            width="20"
            height="20"
          >
            <path
              d="M512 192c188.522667 0 341.333333 152.810667 341.333333 341.333333v234.666667h10.666667a32 32 0 0 1 0 64l-193.749333 0.021333a170.730667 170.730667 0 0 1-316.501334 0L160 832a32 32 0 0 1 0-64H170.666667V533.333333c0-188.522667 152.810667-341.333333 341.333333-341.333333z m85.333333 640.021333h-170.666666A106.496 106.496 0 0 0 512 874.666667a106.496 106.496 0 0 0 85.333333-42.645334zM512 256c-150.976 0-273.770667 120.64-277.248 270.784L234.666667 533.333333v234.666667h554.666666V533.333333c0-153.173333-124.16-277.333333-277.333333-277.333333z m33.92 106.986667a32 32 0 0 1 41.621333-17.770667A202.709333 202.709333 0 0 1 714.666667 533.333333a32 32 0 0 1-64 0 138.709333 138.709333 0 0 0-86.997334-128.725333 32 32 0 0 1-17.749333-41.621333zM578.666667 85.333333C600.768 85.333333 618.666667 99.669333 618.666667 117.333333S600.746667 149.333333 578.666667 149.333333h-133.333334C423.232 149.333333 405.333333 134.997333 405.333333 117.333333S423.253333 85.333333 445.333333 85.333333h133.333334z"
              fill="#4E4E4E"
              p-id="4197"
            ></path>
          </svg>
        </div>
      )}

      <MaterialUISwitch checked={isDark} onChange={changeDarkMode} />
      <Box sx={{ ml: 2 }}></Box>
      <ProfileSection
        handleLogout={signOutClicked}
        username={localStorage.getItem("username") ?? ""}
      />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;

import logo from '@/assets/images/logo.png'
// import logo from '@/assets/images/flowise_logo.png'
// import logoDark from '@/assets/images/flowise_logo_dark.png'
import React from "react";
import { useSelector } from "react-redux";

// ==============================|| LOGO ||============================== //

const Logo = () => {
  const customization = useSelector((state: any) => state.customization);

  return (
    <div
      style={{ alignItems: "center", display: "flex", flexDirection: "row" }}
    >
      <img
        style={{
          objectFit: "contain",
          height: "auto",
          width: 120,
          marginTop: 4,
          marginRight: 4,
          filter: customization.isDarkMode ? "invert(1)" : "",
        }}
        src={logo}
        alt="insight"
      />
    </div>
  );
};

export default Logo;

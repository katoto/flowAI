import React from "react";
import logo from '@/assets/images/logo.png'
import { useSelector } from "react-redux";

const Home = () => {
  const customization = useSelector((state: any) => state.customization);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <div
        style={{
          filter: customization.isDarkMode ? "invert(1)" : "",
        }}
      >
        <img src={logo} style={{width: 220}} />
      </div>
      <h3 className="home-title">Hi，xxx 欢迎使用 Insight 管理平台</h3>
      <h3>
        当前业务:{" "}
        <strong style={{ color: "#f16722" }}>{customization.bizName}</strong>
        ，当前身份:{" "}
        <strong style={{ color: "#f16722" }}>{customization.jobName}</strong>
      </h3>
    </div>
  );
};

export default Home;

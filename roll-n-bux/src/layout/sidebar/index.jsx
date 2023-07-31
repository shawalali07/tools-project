import "./navbar.css";
import { useState, useEffect } from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import icon from "../../assets/images/cryptocurrency.png";
import { sidebarItems } from "../../constants/sidebarItems";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">RollnBux$</Link>
        </Typography.Title>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          {sidebarItems?.map((item) => (
            <Menu.Item key={item?.key} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Sidebar;

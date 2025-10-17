import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LogoWrapper from "@/components/commonComponent/logoWrapper";
import MENUITEMS from "./MenuData";
import AccountContext from "@/helper/accountContext";
import SettingContext from "@/helper/settingContext";
import { getPermissionArray } from "@/components/common/getPermissionArray";

const MenuList = dynamic(() => import("./MenuList"), {
  ssr: false,
});
const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { role, setRole } = useContext(AccountContext);
  const { sidebarOpen, setSidebarOpen } = useContext(SettingContext);

  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    let storedRole;
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
      storedRole = localStorage.getItem("role");
    } else {
      storedRole = null;
    }

    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.name);
    }
  }, []);

  const modifiedSidebar = getPermissionArray(MENUITEMS);

  return (
    <div className={`sidebar-wrapper ${sidebarOpen ? "close_icon" : ""}`}>
      <div id="sidebarEffect" />
      <div className={`${mounted ? "skeleton-loader" : ""}`}>
        <LogoWrapper setSidebarOpen={setSidebarOpen} />
        <nav className="sidebar-main">
          <div id="sidebar-menu">
            <ul className="sidebar-links" id="simple-bar">
              {modifiedSidebar && <MenuList menu={modifiedSidebar} level={0} activeMenu={activeMenu} setActiveMenu={setActiveMenu} key={role} />}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

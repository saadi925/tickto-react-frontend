import React from "react";

interface SideMenuProps {
  isSideOpen: boolean;
  setSideOpen: React.SetStateAction<boolean>;
}
export const SideMenu = (props: SideMenuProps) => {
  const { isSideOpen, setSideOpen } = props;
  return <div className={`${isSideOpen ? "" : ""}`}></div>;
};

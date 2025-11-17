import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="pt-[88px]">
      {/* 88px = Navbar ka exact height (4rem padding + text) */}
      {children}
    </div>
  );
};

export default Layout;

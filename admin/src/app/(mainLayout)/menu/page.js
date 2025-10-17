"use client";

import dynamic from "next/dynamic";

const FrontMenuCreate = dynamic(() => import("@/components/frontMenu"), {
  ssr: false, 
});

const FrontMenu = () => {
  return (
      <FrontMenuCreate />
  );
};

export default FrontMenu;
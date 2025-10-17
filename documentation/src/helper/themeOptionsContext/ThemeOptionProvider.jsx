"use client";
import request from "@/utils/axiosUtils";
import { ThemeOptionsAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeOptionContext from ".";

const ThemeOptionProvider = (props) => {
  const router = useRouter();
  const [isCairoThemeActive, setIsCairoThemeActive] = useState(false);
  const [openOffCanvas, setOpenOffCanvas] = useState(false);
  const [cartCanvas, setCartCanvas] = useState(false);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [collectionMobile, setCollectionMobile] = useState(false);
  const [themeOption, setThemeOption] = useState({});
  const { data, isLoading, refetch } = useQuery({queryKey: [ThemeOptionsAPI], queryFn: () => request({ url: ThemeOptionsAPI }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (data) {
      setThemeOption(data?.options);
    }
  }, [isLoading, data]);
  
  return (
    <>
      <ThemeOptionContext.Provider value={{ ...props, themeOption, isCairoThemeActive, setIsCairoThemeActive, openOffCanvas, setOpenOffCanvas, cartCanvas, setCartCanvas, mobileSideBar, setMobileSideBar, collectionMobile, setCollectionMobile }}>{props.children}</ThemeOptionContext.Provider>
    </>
  );
};

export default ThemeOptionProvider;

"use client";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { ThemeAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import Berlin from "../themes/berlin/index";
import Cairo from "../themes/cairo/index";
import Denver from "../themes/denver/index";
import Madrid from "../themes/madrid/index";
import Moscow from "../themes/moscow/index";
import Osaka from "../themes/osaka/index";
import Paris from "../themes/paris/index";
import Rome from "../themes/rome/index";
import Tokyo from "../themes/tokyo/index";

const ActiveTheme = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({queryKey: [ThemeAPI], queryFn: () => request({ url: ThemeAPI }, router), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data.data });
  const search = useSearchParams();
  const themeBySlug = search.get("theme");
  const { setIsCairoThemeActive } = useContext(ThemeOptionContext);
  const checkActive = {
    paris: <Paris />,
    tokyo: <Tokyo />,
    osaka: <Osaka />,
    rome: <Rome />,
    madrid: <Madrid />,
    berlin: <Berlin />,
    denver: <Denver />,
    cairo: <Cairo />,
    moscow: <Moscow />,
  };
  const activeTheme = data?.find((elem) => elem.status === 1);

  useEffect(() => {
    const activeTheme = data?.find((elem) => elem.status === 1);
    activeTheme?.slug === "cairo" ? setIsCairoThemeActive(true) : setIsCairoThemeActive(false);
  }, [data]);

  if (isLoading) return <Loader />;
  return themeBySlug ? checkActive[themeBySlug] : checkActive[activeTheme?.slug];
};

export default ActiveTheme;

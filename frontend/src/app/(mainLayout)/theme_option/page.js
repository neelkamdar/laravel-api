"use client";
import dynamic from "next/dynamic";
import { ThemeOptions } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";

const ThemeOptionForm = dynamic(() => import("@/components/themeOption"), {
  ssr: false,
});

const ThemeOption = () => {
  const { mutate, isLoading } = useCreate(ThemeOptions, false, "/theme_option", "Theme Option Updated Successfully");
  return (
    <ThemeOptionForm
      mutate={mutate}
      loading={isLoading}
      title={"theme_options"}
    />
  );
};

export default ThemeOption;

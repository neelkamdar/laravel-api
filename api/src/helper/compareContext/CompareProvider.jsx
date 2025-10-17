import request from "@/utils/axiosUtils";
import { CompareAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CompareContext from ".";

const CompareProvider = (props) => {
  const cookieUAT = Cookies.get("uaf");
  const router = useRouter();
  const [compareState, setCompareState] = useState([]);
  const { data: CompareData, isLoading: getCompareLoading, refetch } = useQuery({queryKey: [CompareAPI], queryFn: () => request({ url: CompareAPI }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  useEffect(() => {
    if (cookieUAT) {
      refetch();
    }
  }, [cookieUAT]);

  useEffect(() => {
    if (CompareData) {
      setCompareState(CompareData); // ✅ overwrite with fresh backend data
    }
  }, [CompareData]);

  return <CompareContext.Provider value={{ ...props, compareState, setCompareState, refetch }}>{props.children}</CompareContext.Provider>;
};

export default CompareProvider;

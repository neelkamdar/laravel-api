import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { PageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PageCard = ({ params }) => {
  const router = useRouter();
  const { data: Page, isLoading, refetch } = useQuery({queryKey: [params], queryFn: () => request({ url: `${PageAPI}/slug/${params}` }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);
  if (isLoading) return <Loader />;
  return <div dangerouslySetInnerHTML={{ __html: Page?.content }} />;
};

export default PageCard;

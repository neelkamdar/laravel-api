import request from "@/utils/axiosUtils";
import { NoticeRecent } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import NoticeDashBoard from "./NoticeDashBoard";
import ProductStockReportTable from "./productStockReport/ProductStockReportTable";
import RecentOrderTable from "./recentOrders/RecentOrderTable";
import RevenueAndTopVendor from "./Revenue&TopVendor";
import TopDashSection from "./TopDashSection";
import { useRouter } from "next/navigation";

const MainDashboard = () => {
  const role = JSON.parse(localStorage.getItem("role"))?.name;
  const isAdmin = role === "admin";
  const router = useRouter();   
  const { data, refetch } = useQuery({ queryKey: [NoticeRecent], queryFn: () => (!isAdmin ? request({ url: NoticeRecent }, router) : Promise.resolve()), refetchOnWindowFocus: false, enabled: !isAdmin, select: (data) => data?.data });
  return (
    <>
      {data?.is_read === 0 && <NoticeDashBoard data={data} refetch={refetch} />}
      <TopDashSection  role={role} />
      <section>
        <RevenueAndTopVendor role={role} />
        <RecentOrderTable />
        <ProductStockReportTable role={role} />
      </section>
    </>
  );
};

export default MainDashboard;

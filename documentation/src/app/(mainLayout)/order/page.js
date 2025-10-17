"use client";
import AllOrdersTable from "@/components/orders/AllOrdersTable";
import { filterPills } from "@/data/OrderTable";
import request from "@/utils/axiosUtils";
import { OrderAPI, StatisticsCountAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";

const Order = () => {
  const  router = useRouter()
  const { t } = useTranslation( 'common');
  const { data: StatisticsCountData, refetch, isLoading, } = useQuery({ queryKey: [StatisticsCountAPI], queryFn: () => request({ url: StatisticsCountAPI },router), refetchOnWindowFocus: false, select: (data) => data?.data });
  const [isCheck, setIsCheck] = useState([]);
  const [storeFilterData, setStoreFilterData] = useState([]);
  const searchParams = useSearchParams();
  const statusValue = searchParams.get("status");
  useEffect(() => {
    refetch();
  }, [isLoading]);
  useEffect(() => {
    const updatedData =
      !isLoading &&
      filterPills.map((data) => ({
        ...data,
        count: StatisticsCountData[data?.countKey] ? StatisticsCountData[data?.countKey] :0,
      }));
    setStoreFilterData(updatedData);
  }, [isLoading]);

  return (
    <Col sm="12">
      <AllOrdersTable
        differentFilter={
          <div className="show-box mb-4 d-flex overflow-custom">
            <ul className="order-tab-content">
              <li className={`${!statusValue ? "active" : ""}`}><Link href={`/order`}> {t("all")} <span> {StatisticsCountData?.total_orders}</span>  </Link></li>
              {storeFilterData.length > 0 &&
                storeFilterData?.map((status, index) => (
                  <li key={index} className={`${statusValue === status.value ? "active" : ""} ${status.color}`}>
                    <Link
                      href={{
                        pathname: `/order`,
                        query: { status: status.value },
                      }}
                    >
                      {status.label} <span>{status.count}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        }
        paramsProps={{ status: statusValue ?? null }}
        url={OrderAPI}
        dateRange={true}
        moduleName="order"
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </Col>
  );
};

export default Order;

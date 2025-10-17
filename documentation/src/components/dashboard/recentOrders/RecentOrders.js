import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import TableWrapper from "../../../utils/hoc/TableWrapper";
import ShowTable from "../../table/ShowTable";

const RecentOrders = ({ data, ...props }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const getSpanTag = (number) => {
    return <span className="fw-bolder">#{number}</span>;
  };
  const headerObj = {
    checkBox: false,
    isOption: true,
    noEdit: false,
    isSerialNo: false,
    optionHead: { title: "action", type: "View", redirectUrl: "/order/details", modalTitle: t("orders") },
    noCustomClass: true,
    column: [
      { title: "number", apiKey: "order_number" },
      { title: "date", apiKey: "created_at", sorting: true, sortBy: "desc", type: "dateWithOnlyMonth" },
      { title: "name", apiKey: "consumer", subKey: ["name"] },
      { title: "amount", apiKey: "total", type: "price" },
      { title: "payment", apiKey: "payment_status" },
    ],
    data: data || [],
  };

  let orders = useMemo(() => {
    return (headerObj?.data || []).map((element) => {
      const newElement = { ...element };
      if (typeof newElement.order_number === "string" || typeof newElement.order_number === "number") {
        newElement.order_number = getSpanTag(newElement.order_number);
      }
      newElement.payment_status = (
        <div className={`status-${element?.payment_status?.toString().toLowerCase() || ""}`}>
          <span>{element?.payment_status}</span>
        </div>
      );
      return newElement;
    });
  }, [headerObj?.data]);
  
  headerObj.data = headerObj ? orders : [];
  const redirectLink = (data) => {
    const order_number = data?.order_number?.props?.children?.[1];
    router.push(`/order/details/${order_number}`);
  };
  if (!data) return null;
  return <ShowTable {...props} headerData={headerObj} redirectLink={redirectLink} />;
};

export default TableWrapper(RecentOrders);

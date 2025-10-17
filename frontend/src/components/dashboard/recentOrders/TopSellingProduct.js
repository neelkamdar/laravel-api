import { topStoreOption } from "@/data/TabTitleList";
import SettingContext from "@/helper/settingContext";
import request from "@/utils/axiosUtils";
import { product } from "@/utils/axiosUtils/API";
import { dateWithOnlyMonth } from "@/utils/customFunctions/DateFormate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Avatar from "../../commonComponent/Avatar";
import NoDataFound from "../../commonComponent/NoDataFound";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";
import DashboardWrapper from "../DashboardWrapper";

const TopSellingProduct = ({ setFieldValue, values }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery({ queryKey: [product, values["filter_by"]], queryFn: () => request({ url: product, params: { status: 1, top_selling: 1, filter_by: values["filter_by"]?.value ?? "this_year", paginate: 5 } }, router), enabled: false, refetchOnWindowFocus: false, select: (data) => data.data.data });
  const onFilterChange = (name, value) => {
    setFieldValue("filter_by", value);
  };
  useEffect(() => {
    refetch();
  }, [values["filter_by"]]);
  return (
    <DashboardWrapper
      classes={{
        title: "top_selling_products",
        headerRight: (
          <SearchableSelectInput
            nameList={[
              {
                name: "filter_by",
                notitle: "true",
                inputprops: {
                  name: "filter_by",
                  id: "filter_by",
                  options: topStoreOption || [],
                  value: values["filter_by"] ? values["filter_by"]?.name : "",
                },
                store: "obj",
                noSearchBar: true,
                setvalue: onFilterChange,
              },
            ]}
          />
        ),
      }}
    >
      <div className="top-selling-table datatable-wrapper table-responsive">
        {isLoading && (
          <div className="table-loader">
            <span>{t("please_wait")}...</span>
          </div>
        )}
        <Table>
          <tbody>
            {data?.map((elem, i) => (
              <tr key={i}>
                <td>
                  <Link className="img-info" href={`/product/edit/${elem?.id}`}>
                    <Avatar data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem} />
                  </Link>
                </td>
                <td>
                  <Link className="img-info" href={`/product/edit/${elem?.id}`}>
                    <div>
                      <h6>{dateWithOnlyMonth(elem?.created_at)}</h6>
                      <h5>{elem?.name}</h5>
                    </div>
                  </Link>
                </td>
                <td>
                  <h6>{t("price")}</h6>
                  <h5>{convertCurrency(elem?.sale_price)}</h5>
                </td>
                <td>
                  <h6>{t("orders")}</h6>
                  <h5>{elem?.orders_count}</h5>
                </td>
                <td>
                  <h6>{t("stock")}</h6>
                  <h5>{elem?.quantity}</h5>
                </td>
                <td>
                  <h6>{t("amount")}</h6>
                  <h5>{elem?.order_amount?.toFixed(2)}</h5>
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td>
                  <NoDataFound noImage={true} />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </DashboardWrapper>
  );
};

export default TopSellingProduct;

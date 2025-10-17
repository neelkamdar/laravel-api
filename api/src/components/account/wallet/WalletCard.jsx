import AccountHeading from "@/components/common/AccountHeading";
import Pagination from "@/components/common/Pagination";
import SettingContext from "@/helper/settingContext";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { WalletConsumerAPI } from "@/utils/axiosUtils/API";
import { dateFormat } from "@/utils/customFunctions/DateFormat";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Table } from "reactstrap";
import walletImage from "../../../../public/assets/images/svg/wallet.svg";

const WalletCard = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data, isLoading, refetch } = useQuery({queryKey: [WalletConsumerAPI], queryFn: () => request({ url: WalletConsumerAPI, params: { page, paginate: 10 } }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  const { convertCurrency } = useContext(SettingContext);
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="my_wallet" />
      <div className="total-box mt-0">
        <Row>
          <Col xs={12}>
            <div className="total-contain wallet-bg">
              {walletImage && <Image src={walletImage} alt="walletImage" height={60} width={60} />}
              <div className="total-detail">
                <h5>{t("wallet_balance")}</h5>
                <h3>{data ? convertCurrency(data?.balance) : 0}</h3>
              </div>
            </div>
          </Col>
        </Row>
        <div className="wallet-table">
          <h4 className="user-dashboard-title">{t("Transactions")}</h4>
          <Table>
            <tbody>
              <tr>
                <th>{t("no")}</th>
                <th>{t("date")}</th>
                <th>{t("amount")}</th>
                <th>{t("remark")}</th>
                <th>{t("status")}</th>
              </tr>
              {data?.transactions?.data?.map((transaction, i) => (
                <tr key={i}>
                  <td>{i + 1 + (data?.transactions?.current_page - 1) * data?.transactions?.per_page}</td>
                  <td>{dateFormat(transaction?.created_at)}</td>
                  <td>{convertCurrency(transaction.amount)}</td>
                  <td>{transaction.detail}</td>
                  <td>
                    <div className={`status-${transaction.type}`}>
                      <span>{transaction?.type}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <nav className="custome-pagination">
          <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
        </nav>
      </div>
    </>
  );
};

export default WalletCard;

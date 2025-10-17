import AccountContext from "@/helper/accountContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";
import emptyWallet from "../../../public/assets/images/svg/empty-wallet.svg";
import medalStar from "../../../public/assets/images/svg/medal-star.svg";
import receipt2 from "../../../public/assets/images/svg/receipt-2.svg";

const VendorSection = ({ statistics, convertCurrency }) => {
  
  const { t } = useTranslation("common");
  const { accountData } = useContext(AccountContext);

  return (
    <>
      <Col xxl="6" xl="12" sm="6" xs="12" className="widget-card-box">
        <a className="widget-card card">
          <div>
            <h6>{t("total__refunds")}</h6>
            <h2>{statistics?.total_refunds}</h2>
          </div>
          <div className="widget-icon">
            <Image
              height={26}
              width={26}
              src={receipt2}
              className="img-fluid"
              alt="receipt2"
            />
          </div>
        </a>
      </Col>
      <Col sm="6" className="widget-card-box">
        <Link href={`/order`}  className="widget-card card">
          <div>
            <h6>{t("total_orders")}</h6>
            <h2>{statistics?.total_orders}</h2>
          </div>
          <div className="widget-icon">
            <Image
              height={26}
              width={26}
              src={medalStar}
              className="img-fluid"
              alt="medal-star"
            />
          </div>
        </Link>
      </Col>
      <Col sm="6" className="widget-card-box">
        <Link href={`/product`} className="widget-card card">
          <div>
            <h6>{t("total_products")}</h6>
            <h2>{statistics?.total_products}</h2>
          </div>
          <div className="widget-icon">
            <Image
              height={26}
              width={26}
              src={receipt2}
              className="img-fluid"
              alt="receipt2"
            />
          </div>
        </Link>
      </Col>
      <Col sm="6" className="widget-card-box">
        <Link href={`/vendor_wallet`} className="widget-card card">
        <div>
            <h6>{t("total_balance")}</h6>
            <h2>{convertCurrency(accountData?.vendor_wallet?.balance)}</h2>
          </div>
          <div className="widget-icon">
            <Image
              height={26}
              width={26}
              src={emptyWallet}
              className="img-fluid"
              alt="emptyWallet"
            />
          </div>
        </Link>
      </Col>
    </>
  );
};

export default VendorSection;

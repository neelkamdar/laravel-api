
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import emptyWallet from "../../../public/assets/images/svg/empty-wallet.svg";
import medalStar from "../../../public/assets/images/svg/medal-star.svg";
import people from "../../../public/assets/images/svg/people.svg";
import receipt2 from "../../../public/assets/images/svg/receipt-2.svg";
import shopWhite from "../../../public/assets/images/svg/shop-white.svg";
import SettingContext from "../../helper/settingContext";
import request from "../../utils/axiosUtils";
import { StatisticsCountAPI } from "../../utils/axiosUtils/API";
import OrderStatus from "./OrderStatus";
import VendorSection from "./VendorSection";
import { useRouter } from "next/navigation";

const TopDashSection = ({ role }) => {

  const { t } = useTranslation("common");
  const [filterType, setFilterType] = useState("All Time");
  const [filterValue, setFilterValue] = useState(null);
  const { convertCurrency } = useContext(SettingContext);
  const router = useRouter();
  const { data, refetch } = useQuery({ queryKey: [StatisticsCountAPI], queryFn: () => request({ url: StatisticsCountAPI, params: { filter_by: filterValue } }, router), refetchOnWindowFocus: false, select: (data) => data?.data });
  useEffect(() => {
    if (filterValue != null) {
      refetch();
    }
  }, [filterValue]);

  return (
    <section className="dashboard-tiles top-dashboard theme-form row">
      <Container fluid={true}>
        <Row className=" g-sm-4 g-3">
          <Col xxl="4" xl="5">
            <Row className="g-sm-4 g-3">
              <Col xs="12" className="widget-card-box">
                <a className="widget-card card mb-0">
                  <div>
                    <h6>{t("total_revenue")}</h6>
                    <h2>{convertCurrency(data?.total_revenue || 0)}</h2>
                  </div>
                  <div className="widget-icon">
                    <Image height={26} width={26} src={emptyWallet} className="img-fluid" alt="emptyWallet"/>
                  </div>
                </a>
              </Col>
              {role !== "vendor" && (
                <>
                  <Col xxl="6" xl="12" sm="6" xs="12" className="widget-card-box">
                    <Link href={`/product`} className="widget-card card mb-0">
                      <div>
                        <h6>{t("total_products")}</h6>
                        <h2>{data?.total_products}</h2>
                      </div>
                      <div className="widget-icon">
                        <Image height={26} width={26} src={receipt2} className="img-fluid" alt="receipt2"/>
                      </div>
                    </Link>
                  </Col>
                  <Col sm="6" className="widget-card-box">
                    <Link
                      href={`/order`}
                      className="widget-card card mb-0"
                    >
                      <div>
                        <h6>{t("total_orders")}</h6>
                        <h2>{data?.total_orders}</h2>
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
                    <Link
                      href={`/store`}
                      className="widget-card card mb-0"
                    >
                      <div>
                        <h6>{t("total_stores")}</h6>
                        <h2>{data?.total_stores}</h2>
                      </div>
                      <div className="widget-icon">
                        <Image
                          height={26}
                          width={26}
                          src={shopWhite}
                          className="img-fluid"
                          alt="shop-white"
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col sm="6" className="widget-card-box">
                    <Link href={`/user`} className="widget-card card">
                      <div>
                        <h6>{t("total_user")}</h6>
                        <h2>{data?.total_users}</h2>
                      </div>
                      <div className="widget-icon">
                        <Image
                          height={26}
                          width={26}
                          src={people}
                          className="img-fluid"
                          alt="people"
                        />
                      </div>
                    </Link>
                  </Col>
                </>
              )}
              {role === "vendor" && (
                <VendorSection
                  statistics={data}
                  convertCurrency={convertCurrency}
                />
              )}
            </Row>
          </Col>
          <OrderStatus
            setFilterValue={setFilterValue}
            data={data}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </Row>
      </Container>
    </section>
  );
};

export default TopDashSection;

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Col, Row } from "reactstrap";
import Box1 from "../../../public/assets/images/svg/box-1.svg";
import boxRemove from "../../../public/assets/images/svg/box-remove.svg";
import boxTime from "../../../public/assets/images/svg/box-time.svg";
import Group from "../../../public/assets/images/svg/group.svg";
import Note from "../../../public/assets/images/svg/note.svg";
import Shop from "../../../public/assets/images/svg/shop.svg";
import OrderFilter from "./OrderFilter";

const OrderStatus = ({ data, filterType, setFilterValue, setFilterType }) => {

  const { t } = useTranslation("common");
  return (
    <Col xxl="8" xl="7">
      <Card className="mb-0">
        <CardBody>
          <div className="title-header">
            <div className="d-flex align-items-center">
              <h5>{t("order_status")}</h5>
            </div>
            <OrderFilter setFilterValue={setFilterValue} setFilterType={setFilterType} />
          </div>
          <Row className="g-sm-4 g-3 booking-status-main">
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "pending" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={boxTime} className="img-fluid" alt="medal-star" />
                </div>
                <div>
                  <h6>{t("pending")}</h6>
                  <h2>
                    {data?.total_pending_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={boxTime} className="img-fluid abs-icon" alt="medal-star" />
              </Link>
            </Col>
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "processing" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={Note} className="img-fluid" alt="note" />
                </div>
                <div>
                  <h6>{t("processing")}</h6>
                  <h2>
                    {data?.total_processing_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={Note} className="img-fluid abs-icon" alt="note" />
              </Link>
            </Col>
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "cancelled" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={boxRemove} className="img-fluid" alt="Box1" />
                </div>
                <div>
                  <h6>{t("cancelled")}</h6>
                  <h2>
                    {data?.total_cancelled_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={boxRemove} className="img-fluid abs-icon" alt="Box1" />
              </Link>
            </Col>
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "shipped" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={Box1} className="img-fluid" alt="Group" />
                </div>
                <div>
                  <h6>{t("shipped")}</h6>
                  <h2>
                    {data?.total_shipped_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={Box1} className="img-fluid abs-icon" alt="Group" />
              </Link>
            </Col>
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "out_for_delivery" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={Group} className="img-fluid" alt="shop" />
                </div>
                <div>
                  <h6>{t("out_for_delivery")}</h6>
                  <h2>
                    {data?.total_out_of_delivery_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={Group} className="img-fluid abs-icon" alt="shop" />
              </Link>
            </Col>
            <Col xxl="4" sm="6" className="booking-status-card">
              <Link className="booking-widget-card card" href={{ pathname: `/order`, query: { status: "delivered" } }}>
                <div className="booking-widget-icon">
                  <Image height={26} width={26} src={Shop} className="img-fluid" alt="boxRemove" />
                </div>
                <div>
                  <h6>{t("delivered")}</h6>
                  <h2>
                    {data?.total_delivered_orders}
                  </h2>
                </div>
                <Image height={26} width={26} src={Shop} className="img-fluid abs-icon" alt="boxRemove" />
              </Link>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default OrderStatus;

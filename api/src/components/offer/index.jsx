"use client";
import Btn from "@/elements/buttons/Btn";
import request from "@/utils/axiosUtils";
import { CouponAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";
import emptyImage from "../../../public/assets/svg/no-product.svg";
import Breadcrumb from "../common/Breadcrumb";
import NoDataFound from "../common/NoDataFound";
import WrapperComponent from "../common/WrapperComponent";
import OfferSkeleton from "./OfferSkeleton";

const Offer = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data, isLoading } = useQuery({queryKey: [CouponAPI], queryFn: () => request({ url: CouponAPI, params: { status: 1 } }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });

  const onCopyCode = (couponData) => {
    navigator.clipboard.writeText(couponData);
  };
  return (
    <>
      <Breadcrumb title={"offers"} subNavigation={[{ name: "offers" }]} />
      {isLoading ? (
        <OfferSkeleton />
      ) : data?.length > 0 ? (
        <WrapperComponent classes={{ sectionClass: "section-b-space section-t-space offer-section", row: "g-md-4 g-3" }} customCol={true}>
          {data?.map((coupon, i) => (
            <Col xxl={3} lg={4} sm={6} key={i}>
              <div className="coupon-box">
                <div className="coupon-name">
                  <div className="card-name">
                    <div>
                      <h5 className="fw-semibold dark-text">{coupon.title}</h5>
                    </div>
                  </div>
                </div>
                <div className="coupon-content">
                  <p className="p-0">{coupon.description}</p>
                  <div className="coupon-apply">
                    <h6 className="coupon-code success-color">#{coupon.code}</h6>
                    <Btn className="theme-btn border-btn copy-btn mt-0" onClick={() => onCopyCode(coupon.code)}>
                      {t("copy_code")}
                    </Btn>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </WrapperComponent>
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "no_Offers_found",
            description: "inform_you_that_the_currently_unavailable",
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default Offer;

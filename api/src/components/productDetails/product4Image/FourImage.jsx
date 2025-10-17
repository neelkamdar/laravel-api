import React from "react";
import { useContext, useState } from "react";
import Image from "next/image";
import { Col, Row } from "reactstrap";

import { useTranslation } from "react-i18next";

const FourImage = ({ productState }) => {
  const [videType, setVideType] = useState(["video/mp4", "video/webm", "video/ogg"]);
  const [audioType, setAudioType] = useState(["audio/mpeg", "audio/wav", "audio/ogg"]);

  const { t } = useTranslation("common");
  return (
    <div className="product-left-box">
      <div className="product-main-1">
        {productState?.product?.is_sale_enable ? (
          <div className="product-label-tag">
            <span>{t("sale")}</span>
          </div>
        ) : productState?.product?.is_featured ? (
          <div className="product-label-tag warning-label-tag">
            <span>{t("featured")}</span>
          </div>
        ) : null}
        <Row className="row g-sm-4 g-2">
          {productState?.product?.product_galleries?.map((image, i) => (
            <Col xs={6} className="col-grid-box" key={i}>
              {/* <div key={i}> */}
              <div className="slider-image w-100 h-100 d-flex align-items-center justify-content-center">
                {videType.includes(image.mime_type) ? (
                  <video className="w-100" controls>
                    <source src={image ? image?.original_url : ""} type={image?.mime_type}></source>
                  </video>
                ) : audioType.includes(image?.mime_type) ? (
                  <div className="slider-main-img">
                    <audio controls>
                      <source src={image ? image.original_url : ""} type={image.mime_type}></source>
                    </audio>
                  </div>
                ) : (
                  image?.original_url && <Image src={image?.original_url} alt={image?.name || ""} zoom="200" className="img-fluid" height={130} width={130} />
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FourImage;

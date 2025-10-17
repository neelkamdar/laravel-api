import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import { productDetailSlider } from "../../../data/SliderSettingsData";
import { useTranslation } from "react-i18next";
import { RiVideoLine } from "react-icons/ri";
import ImageZoom from "react-image-zooom";

const ThumbnailProductImage = ({ productState }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [videType, setVideType] = useState([
    "video/mp4",
    "video/webm",
    "video/ogg",
  ]);
  const [audioType, setAudioType] = useState([
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
  ]);

  const defaultImage = {
    original_url: "/assets/images/placeholder.png",
    name: "Default Image",
    mime_type: "image/png",
  };

  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  useEffect(() => {
    var index =
      productState?.product?.product_galleries &&
      productState?.product?.product_galleries.findIndex((object) => {
        return (
          object.id === productState?.selectedVariation.variation_image?.id
        );
      });
    productState?.selectedVariation.variation_image?.id &&
      slider1.current.slickGoTo(index);
  }, [productState?.selectedVariation.variation_image?.id]);

  const galleryImages =
    productState?.product?.product_galleries?.length > 0
      ? productState.product.product_galleries
      : productState?.product?.product_thumbnail
      ? [productState.product.product_thumbnail]
      : [defaultImage];

  const { t } = useTranslation("common");
  return (
    <div className="product-left-box">
      <Row className="g-2">
        <Col xs={12}>
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
            <Slider
              asNavFor={nav2}
              adaptiveHeight={true}
              arrows={galleryImages.length > 1}
              dots={false}
              ref={(slider) => (slider1.current = slider)}
            >
              {galleryImages.map((image, i) => (
                <div key={i}>
                  <div className="slider-image">
                    {videType.includes(image.mime_type) ? (
                      <>
                        <video className="w-100 " controls>
                          <source
                            src={image ? image?.original_url : ""}
                            type={image?.mime_type}
                          ></source>
                        </video>
                      </>
                    ) : audioType.includes(image?.mime_type) ? (
                      <div className="slider-main-img">
                        <audio controls>
                          <source
                            src={image ? image.original_url : ""}
                            type={image.mime_type}
                          ></source>
                        </audio>
                      </div>
                    ) : (
                      <ImageZoom
                        src={image?.original_url}
                        alt={image?.name || ""}
                        zoom="200"
                        className="img-fluid"
                        height={130}
                        width={130}
                      />
                    )}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </Col>

        {productState?.product?.product_galleries?.length > 0 && (
          <Col xs={12}>
            <div className="bottom-slider-image left-slider slick-top no-arrow">
              <Slider
                adaptiveHeight={true}
                {...productDetailSlider(
                  productState?.product?.product_galleries?.length < 3
                    ? productState?.product?.product_galleries?.length
                    : 3
                )}
                slidesToShow={
                  productState?.product?.product_galleries?.length < 3
                    ? productState?.product?.product_galleries?.length
                    : 3
                }
                asNavFor={nav1}
                ref={(slider) => (slider2.current = slider)}
              >
                {galleryImages.map((image, i) => (
                  <div key={i}>
                    <div className="slider-image position-relative">
                      {videType.includes(image.mime_type) ? (
                        <>
                          <div className="video-icon">
                            <RiVideoLine />
                          </div>
                          <video className="w-100">
                            <source
                              src={image?.original_url}
                              type={image?.mime_type}
                            />
                          </video>
                        </>
                      ) : audioType.includes(image?.mime_type) ? (
                        <div className="slider-main-img">
                          <RiMusic2Line />
                        </div>
                      ) : (
                        image?.original_url && (
                          <Image
                            height={130}
                            width={130}
                            src={image?.original_url}
                            className="img-fluid"
                            alt={image?.name || ""}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ThumbnailProductImage;

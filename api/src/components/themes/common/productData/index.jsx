import { useMemo, useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import Slider from "react-slick";
import { productSliderOptions6 } from "../../../../data/SliderSettingsData";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import ProductBox from "@/components/common/productBox";

const ProductData = ({ dataAPI, products, style, productStyle, customSliderOption = productSliderOptions6, slider, showItem, classObj = {}, paddingClass, spaceClass = true }) => {
  let skeletonLoader = false;
  let skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  const filterProduct = useMemo(() => {
    return products?.filter((el) => dataAPI?.product_ids?.includes(el.id));
  }, [products, dataAPI]);

  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      {/* {Vertical Product Box 1} */}
      {style == "vertical" && (
        <ul className="product-list border-0 p-0 sidebar-product d-flex">
          {!skeletonLoader &&
            filterProduct?.map((product, i) => (
              <li key={i}>
                <ProductBox product={product} style="vertical" />
              </li>
            ))}
        </ul>
      )}

      {/* {Vertical Product Box 2} */}
      {style == "classic" && (
        <div className="best-selling-slider product-wrapper">
          <div className="position-relative">
            <span className="border-effect"></span>
            <ul className="product-list">
              {/* {skeletonItems?.map((item) => (
                                <li></li>
                            ))} */}
              {!skeletonLoader &&
                filterProduct?.map((product, i) => (
                  <li key={i}>
                    <ProductBox product={product} style="vertical" />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {/* { Horizontal Product Box} */}
      {style == "horizontal" && (
        <div className={`${spaceClass ? "section-b-space" : ""}  ${paddingClass || ""}`}>
          <div className={`${productStyle ? "product_img_bg product_border" : ""}  ${themeOption?.product?.full_border ? "full_border" : ""} ${themeOption?.product?.image_bg ? "product_img_bg" : ""} ${themeOption?.product?.product_box_bg ? "full_bg" : ""} ${themeOption?.product?.product_box_border ? "product_border" : ""} `}>
            {skeletonLoader ? (
              <div className="row row-cols-5 m-0">
                {skeletonItems?.map((item, i) => (
                  <li key={i}></li>
                ))}
              </div>
            ) : (
              <div className="product-box-slider">
                {slider ? (
                  <Slider {...customSliderOption}>
                    {filterProduct?.map((product, i) => (
                      <div key={i}>
                        <Row className="m-0">
                          <Col xs={12} className="px-0">
                            <ProductBox product={product} className="boxClass" style="horizontal" />
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div
                    className={`${showItem === 5 ? "row g-sm-4 g-3 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2" : ""}
                                ${showItem === 6 ? "row g-sm-4 g-3 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-2" : ""}
                                ${showItem === 2 ? "row g-sm-4 g-3 row-cols-sm-2 row-cols-2" : ""}
                                ${showItem === 4 ? "row g-sm-4 g-3 row-cols-xl-4 row-cols-md-3 row-cols-sm-2 row-cols-1" : ""}`}
                  >
                    {filterProduct?.map((product, i) => (
                      <Col key={i}>
                        <ProductBox key={i} product={product} className="boxClass" style="horizontal" classObj={classObj} />
                      </Col>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* { Book Product Box} */}
      {style === "book-horizontal" && (
        <div className="row row-cols-xxl-6 row-cols-xl-5 row-cols-lg-4 row-cols-sm-3 row-cols-2 g-sm-4 g-3 no-arrow">
          {filterProduct?.map((product, i) => (
            <div key={i}>
              <ProductBox product={product} className="boxClass" style="horizontal" />
            </div>
          ))}
        </div>
      )}

      {style === "cairo" && (
        <div>
          {!slider ? (
            products?.map((product, i) => (
              <div key={i}>
                <ProductBox product={product} />
              </div>
            ))
          ) : (
            <Slider {...customSliderOption}>
              <div className="product-box-slider">
                {products?.map((product, i) => (
                  <div key={i}>
                    <Row className="m-0">
                      <Col xs={12} className="px-0">
                        <ProductBox product={product} />
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            </Slider>
          )}
        </div>
      )}
    </>
  );
};

export default ProductData;

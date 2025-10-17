import { Col } from "reactstrap";
import { useContext } from "react";
import ProductIdsContext from "@/helper/productIdsContext";
import ImageLink from "@/components/themes/common/imageLink";
import ProductData from "@/components/themes/common/productData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";

const LeftSection = ({ dataAPI }) => {
  const bannerOne =
    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1?.image_url;
  const bannerTwo =
    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2?.image_url;
  const { filteredProduct } = useContext(ProductIdsContext);

  return (
    <>
      {dataAPI?.main_content?.sidebar?.status && (
        <Col xxl={3} xl={4} className="d-none d-xl-block">
          <div className="p-sticky">
            {/* Vertical Category  Section*/}
            {dataAPI?.main_content?.sidebar?.categories_icon_list?.status && (
              <CategoryStyle
                style="vertical"
                categoryIds={
                  dataAPI?.main_content?.sidebar?.categories_icon_list
                    ?.category_ids
                }
                title={
                  dataAPI?.main_content?.sidebar?.categories_icon_list?.title
                }
                classes={{ sliderClass: "feature-panel-slider" }}
              />
            )}

            {/* Vertical Banner  Section*/}
            {dataAPI?.main_content?.sidebar?.left_side_banners?.status && (
              <>
                <ImageLink
                  classes={{ customClass: "ratio_156 section-t-space" }}
                  imgUrl={bannerOne}
                  link={
                    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_1
                  }
                  height={245}
                  width={378}
                />
                <ImageLink
                  classes={{ customClass: "ratio_medium section-t-space" }}
                  imgUrl={bannerTwo}
                  link={
                    dataAPI?.main_content?.sidebar?.left_side_banners?.banner_2
                  }
                  height={245}
                  width={378}
                />
              </>
            )}

            {/* Vertical Product  Section*/}
            {dataAPI?.main_content?.sidebar?.sidebar_products?.status && (
              <div className="section-t-space">
                <div className="category-menu">
                  <h3>
                    {dataAPI?.main_content?.sidebar?.sidebar_products?.title}
                  </h3>
                  <ProductData
                    style="vertical"
                    products={filteredProduct}
                    dataAPI={dataAPI?.main_content?.sidebar?.sidebar_products}
                  />
                </div>
              </div>
            )}
          </div>
        </Col>
      )}
    </>
  );
};

export default LeftSection;

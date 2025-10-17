import { LeafSVG } from "@/components/common/CommonSVG";
import CustomHeading from "@/components/common/CustomHeading";
import NoDataFound from "@/components/common/NoDataFound";
import BannerData from "@/components/themes/common/bannerData/index";
import BlogData from "@/components/themes/common/blogData/index";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import ImageLink from "@/components/themes/common/imageLink";
import ProductData from "@/components/themes/common/productData";
import TopSeller from "@/components/themes/common/topSeller";
import BlogIdsContext from "@/helper/blogIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { categorySliderOption7, featureBlogSliderOption3, productSliderOptions5 } from "../../../../../data/SliderSettingsData";

const RightSection = ({ dataAPI }) => {
  const { filteredProduct } = useContext(ProductIdsContext);
  const productOptios = { ...productSliderOptions5 };
  const [sliderOptions, setSliderOptions] = useState(productOptios);
  const { setGetBlogIds } = useContext(BlogIdsContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const path = useSearchParams();
  const theme = path.get("theme");

  const BlogOptions = { ...featureBlogSliderOption3, infinite: setGetBlogIds?.length > featureBlogSliderOption3.slidesToShow };

  useEffect(() => {
    if ((theme == "paris") == false && themeOption?.product?.product_box_variant == "digital") {
      setSliderOptions({ ...sliderOptions, slidesToShow: 3, infinite: dataAPI?.main_content?.section1_products?.product_ids?.length > sliderOptions.slidesToShow || dataAPI?.main_content?.section4_products?.product_ids.length > sliderOptions.slidesToShow || dataAPI?.main_content?.section7_products?.product_ids.length > sliderOptions.slidesToShow });
    } else {
      setSliderOptions({ ...sliderOptions, slidesToShow: 5, infinite: dataAPI?.main_content?.section1_products?.product_ids?.length > sliderOptions.slidesToShow || dataAPI?.main_content?.section4_products?.product_ids.length > sliderOptions.slidesToShow || dataAPI?.main_content?.section7_products?.product_ids.length > sliderOptions.slidesToShow });
    }
  }, [themeOption?.product?.product_box_variant, theme]);

  return (
    <Col xxl={dataAPI?.main_content?.sidebar?.status ? 9 : 12} xl={dataAPI?.main_content?.sidebar?.status ? 8 : 12}>
      {/* Top Save Today Section   */}
      {dataAPI?.main_content?.section1_products?.status && (
        <>
          <CustomHeading title={dataAPI?.main_content?.section1_products?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={dataAPI?.main_content?.section1_products?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={dataAPI?.main_content?.section1_products} classObj={{ productStyle: "product-modern", productBoxClass: "" }} />
        </>
      )}

      {/* categories Section   */}
      {dataAPI?.main_content?.section2_categories_list?.status && (
        <>
          <CustomHeading title={dataAPI?.main_content?.section2_categories_list?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={dataAPI?.main_content?.section2_categories_list?.description} noCustomClass={true} />
          <CategoryStyle theme="paris" style="horizontal" categoryIds={dataAPI?.main_content?.section2_categories_list?.category_ids} classes={{ sliderOption: categorySliderOption7 }} sliderKey="categorySliderOption7"/>
        </>
      )}

      {/* Two Column Banner Section  */}
      {dataAPI?.main_content?.section3_two_column_banners?.status && (
        <div className="section-b-space section-t-space">
          <Row className="g-md-4 g-3 ratio_30">
            <Col md={6}>
              {/* imgUrl={`${ImagePath}/`} */}
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={dataAPI?.main_content?.section3_two_column_banners?.banner_1?.image_url} height={156} width={579} ratioImage={false} />
            </Col>
            <Col md={6}>
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={dataAPI?.main_content?.section3_two_column_banners?.banner_2?.image_url} ratioImage={false} link={dataAPI?.main_content?.section3_two_column_banners?.banner_2} height={156} width={579} />
            </Col>
          </Row>
        </div>
      )}

      {/* Product Section   */}
      {dataAPI?.main_content?.section4_products?.status && (
        <>
          <CustomHeading title={dataAPI?.main_content?.section4_products?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={dataAPI?.main_content?.section4_products?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={dataAPI?.main_content?.section4_products} classObj={{ productStyle: "product-modern", productBoxClass: "" }} />
        </>
      )}

      {/* Top Seller   */}
      {dataAPI?.main_content?.seller?.status && (
        <>
          <CustomHeading title={dataAPI?.main_content?.seller?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={dataAPI?.main_content?.seller?.description} noCustomClass={true} />
          <TopSeller dataAPI={dataAPI?.main_content?.seller.store_ids} spaceClass="section-b-space" />
        </>
      )}

      {/* Coupons Banner Section  */}
      {dataAPI?.main_content?.section5_coupons?.status && (
        <div className="sale-banner">
          <div className="banner-contain section-b-space">
            <BannerData bannersData={dataAPI?.main_content?.section5_coupons} style="full_width" height={136} width={1183} />
          </div>
        </div>
      )}

      {/* Two Column Banner Section  */}
      {dataAPI?.main_content?.section6_two_column_banners?.status && (
        <div className="section-b-space">
          <Row className="g-md-4 g-3">
            <Col xxl={8} xl={12} md={7}>
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left", customClass: "h-100" }} imgUrl={dataAPI?.main_content?.section6_two_column_banners?.banner_1?.image_url} ratioImage={false} link={dataAPI?.main_content?.section6_two_column_banners?.banner_1} height={283} width={781} />
            </Col>

            <Col xl={12} xxl={4} md={5}>
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={dataAPI?.main_content?.section6_two_column_banners?.banner_2?.image_url} ratioImage={false} link={dataAPI?.main_content?.section6_two_column_banners?.banner_1} height={283} width={378} />
            </Col>
          </Row>
        </div>
      )}

      {/* Our Best Seller Section  */}
      {dataAPI?.main_content?.section7_products?.status && (
        <>
          <div className="section-b-space">
            <CustomHeading title={dataAPI?.main_content?.section7_products?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={dataAPI?.main_content?.section7_products?.description} noCustomClass={true} />
            <ProductData style="classic" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={dataAPI?.main_content?.section7_products} classObj={{ productStyle: "product-modern", productBoxClass: "" }} spaceClass={false} />
          </div>
        </>
      )}

      {/* Full Width Banner Section */}
      {dataAPI?.main_content?.section8_full_width_banner?.status && <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left", customClass: "section-b-space" }} imgUrl={dataAPI?.main_content?.section8_full_width_banner?.image_url} ratioImage={false} link={dataAPI?.main_content?.section8_full_width_banner?.redirect_link?.link_type} height={293} width={1183} />}

      {/* Blogs Section */}
      {dataAPI?.main_content?.section9_featured_blogs?.status && (
        <>
          <CustomHeading title={dataAPI?.main_content?.section9_featured_blogs?.title} subTitle={dataAPI?.main_content?.section9_featured_blogs?.description} svgUrl={<LeafSVG className="icon-width" />} />

          {dataAPI?.main_content?.section9_featured_blogs?.blog_ids?.length > 0 ? <BlogData dataAPI={dataAPI?.main_content?.section9_featured_blogs} svgUrl={<LeafSVG className="icon-width" />} classes={{ sliderClass: "slider-3-blog ratio_65 no-arrow product-wrapper", sliderOption: BlogOptions }} sliderKey="featureBlogSliderOption3" /> : <NoDataFound data={{ customClass: "bg-light no-data-added", title: "no_blog_found" }} />}
        </>
      )}
    </Col>
  );
};

export default RightSection;

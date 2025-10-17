"use client";
import CairoSkelton from "@/components/common/skeletonLoader/CairoSkelton";
import WrapperComponent from "@/components/common/WrapperComponent";
import Btn from "@/elements/buttons/Btn";
import BlogIdsContext from "@/helper/blogIdsContext";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import { Col } from "reactstrap";
import {categorySliderOption9,featureBlogSliderOption3,featureBlogSliderOption4,featurePanelSlider, productSliderOptions6,} from "../../../data/SliderSettingsData";
import CustomHeading from "../../common/CustomHeading";
import BlogData from "../common/blogData";
import BrandData from "../common/brandData";
import CategoryStyle from "../common/categoryData/CategoryStyle";
import CategoryProductFilter from "../common/categoryProductFilter";
import CairoBanner from "../common/homeBanner/CairoBanner";
import ProductData from "../common/productData";
import TopSeller from "../common/topSeller";
import  LiveImagePath from "@/utils/constants";

const CairoTheme = () => {
    const { t } = useTranslation("common");
    const [sliderOptions, setSliderOptions] = useState(productSliderOptions6);
    const path = useSearchParams()
    const theme = path.get('theme')
    let showProductBox = 4;
    const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
    const { setGetBlogIds, blogIdsLoader } = useContext(BlogIdsContext);
    const { setGetProductIds, filteredProduct, isLoading: productLoader, } = useContext(ProductIdsContext);
    const { data, isLoading, refetch } = useQuery({queryKey: ["cairo"], queryFn: () => request({ url: HomePageAPI, params: { slug: "cairo" } }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
    const BlogOptions = { ...featureBlogSliderOption4, infinite: setGetBlogIds?.length > featureBlogSliderOption4.slidesToShow };
  
    useEffect(() => {
     refetch();
    }, [isLoading]);
    const { themeOption } = useContext(ThemeOptionContext);
    useEffect(() => {
        document.documentElement.style.setProperty("--theme-color2", "#dc2430");
        return () => {
            document.documentElement.style.removeProperty("--theme-color2");
        };
    }, []);
    useEffect(() => {
        if (data?.content?.products_ids?.length > 0) {
            setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length });
        }
        if (data?.content?.brands?.brand_ids?.length > 0) {
          setGetBrandIds({ ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(",") });
        }
        if (data?.content?.featured_blogs?.blog_ids?.length > 0) {
          setGetBlogIds({ ids: Array.from(new Set(data?.content?.featured_blogs?.blog_ids))?.join(",") });
        }
    }, [isLoading]);

    useEffect(() => {
        if (theme !== 'cairo' && themeOption?.product?.product_box_variant == 'digital') {
            if (sliderOptions && sliderOptions?.slidesToShow) {
                setSliderOptions({
                    ...sliderOptions,
                    slidesToShow: 3, // Update for digital products
                });
                showProductBox = 4;
            }
        } else {
            if (sliderOptions && sliderOptions?.slidesToShow) {
                setSliderOptions({
                    ...sliderOptions,
                    slidesToShow: 3, // Update for digital products
                });
                showProductBox = 6;
            }

        }

    }, [themeOption?.product?.product_box_variant, theme]);

    useEffect(() => {
        if (!isLoading) {
            if (productLoader || (data?.content?.featured_blogs?.status && data?.content?.featured_blogs?.blog_ids?.length >0 && blogIdsLoader) || ( data?.content?.brands?.status &&  data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader)) {
                document.body.classList.add("skeleton-body");
            } else {
                document.body.classList.remove("skeleton-body");
            }
        }
    }, [isLoading, productLoader, blogIdsLoader, brandIdsLoader])
    if (isLoading) return <Loader />;
    return (
        <>
            {/* Home Banner Section*/}
            <CairoBanner dataAPI={data?.content?.home_banner} />

      {/* Tab Category Section*/}
      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent
          colProps={{ sm: 9 }}
          classes={{
            col: "position-relative",
            row: "justify-content-center",
            sectionClass: "feature-category-panel pt-0",
          }}
        >
          <CairoSkelton />
          <CategoryStyle
            // style="horizontal"
            theme="cairo"
            sliderOptions={featurePanelSlider}
            categoryIds={data?.content?.categories_icon_list?.category_ids}
            classes={{ sliderClass: "feature-panel-slider no-arrow" }}
          />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }} noRowCol={true}>
          <CustomHeading title={data?.content?.products_list_1?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            showItem={4}
            slider={false}
            products={filteredProduct?.filter((el) => data?.content?.products_list_1?.product_ids?.includes(el?.id))}
            dataAPI={data?.content?.products_list_1}
            classObj={{
              productStyle: "product-classic",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Vertical Category Section*/}
      {data?.content?.categories_icon_list_2?.status && (
        <WrapperComponent classes={{ sectionClass: "category-panel section-b-space m-0" }} noRowCol={true}>
          <CustomHeading title={data?.content?.categories_icon_list_2?.title} noCustomClass={true} />
          <CategoryStyle style="cairo_classic" image="true" sliderOptions={categorySliderOption9(data?.content?.categories_icon_list_2?.category_ids?.length)} classes={{ sliderClass: "feature-panel-slider" }} categoryIds={data?.content?.categories_icon_list_2?.category_ids} sliderKey="categorySliderOption9" />
        </WrapperComponent>
      )}

      {/* Slider Product Section*/}
      <WrapperComponent
        style={{
          backgroundImage: `url(${LiveImagePath}${data?.content?.slider_product?.image_url})`,
        }}
        customCol
        classes={{
          row: "g-sm-4 g-3",
          sectionClass: "featured-sec section-b-space",
        }}
      >
        <Col xxl={3} lg={4}>
          <div className="feature-title">
            <div>
              <h2>{data?.content?.slider_product?.title}</h2>
              <p>{data?.content?.slider_product?.description}</p>
              <Btn className="btn theme-bg-color text-light mt-sm-4 mt-3">
                {t("view_all")}
                <FiArrowRight />
              </Btn>
            </div>
          </div>
        </Col>
        <Col xxl={9} lg={8}>
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.slider_product}
            classObj={{
              productStyle: "product-classic",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </Col>
      </WrapperComponent>

      {/* Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} noCustomClass={true} />
          <div className="section-b-space">
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/* Product Filter Section*/}
      {data?.content?.categories_products?.status && <CategoryProductFilter dataAPI={data?.content?.categories_products} products={filteredProduct} grid={showProductBox} />}

      {/*Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent noRowCol classes={{ sectionClass: "category-panel section-b-space m-0" }}>
          <CustomHeading title={data?.content?.featured_blogs?.title} />
          <BlogData
            dataAPI={data?.content?.featured_blogs}
            description={true}
            classes={{
              sliderClass: "slider-4-blog ratio_65 no-arrow",
              sliderOption: BlogOptions,
              height: 238,
              width: 417,
            }}
            sliderKey="featureBlogSliderOption4"
          />
        </WrapperComponent>
      )}

      {/*Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default CairoTheme;

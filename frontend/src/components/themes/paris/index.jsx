"use client";
import WrapperComponent from "@/components/common/WrapperComponent";
import BrandData from "@/components/themes/common/brandData/index";
import ParisBanner from "@/components/themes/common/homeBanner/ParisBanner";
import NewsLetter from "@/components/themes/common/newsletter";
import SliderBanner from "@/components/themes/common/sliderBanner/index";
import BlogIdsContext from "@/helper/blogIdsContext";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import SellerContext from "@/helper/sellerContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import StickyCart from "@/layout/stickyCart";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import LeftSection from "./common/leftSection";
import RightSection from "./common/rightSection";

const ParisTheme = () => {
  const router = useRouter();
  const { setGetProductIds, isLoading: productLoader } = useContext(ProductIdsContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const { setGetBlogIds, blogIdsLoader } = useContext(BlogIdsContext);
  const { isLoading: sellerContextLoader } = useContext(SellerContext);
  const { themeOption } = useContext(ThemeOptionContext);

  const { data, isLoading, refetch } = useQuery({queryKey: ["paris"], queryFn: () => request({ url: HomePageAPI, params: { slug: "paris" } }, router), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length });
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(",") });
    }
    if (data?.content?.main_content?.section9_featured_blogs?.blog_ids?.length > 0) {
      setGetBlogIds({ ids: Array.from(new Set(data?.content?.main_content?.section9_featured_blogs?.blog_ids))?.join(",") });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if ((data?.content?.products_ids?.length > 0  && productLoader) || (data?.content?.main_content?.section9_featured_blogs?.status && data?.content?.main_content?.section9_featured_blogs?.blog_ids?.length >0 && blogIdsLoader) || ( data?.content?.brands?.status &&  data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader) ||(data?.content?.main_content?.seller?.status && data?.content?.main_content?.seller?.store_ids?.length > 0 &&sellerContextLoader)
      ) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  }, [isLoading, productLoader, blogIdsLoader, brandIdsLoader, sellerContextLoader]);

  if (isLoading) return <Loader />;
  return (
    <div className="bg-effect">
      {/* Home Banner Section*/}
      {<ParisBanner dataAPI={data?.content} />}

      {/* Slider Banner Section*/}
      {data?.content?.featured_banners?.status && <SliderBanner bannersData={data?.content?.featured_banners?.banners} />}

      <WrapperComponent classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }} customCol={true}>
        {/* Left Section*/}
        <LeftSection dataAPI={data?.content} />

        {/* Right Section*/}
        <RightSection dataAPI={data?.content} />
      </WrapperComponent>

      {/* Brand Section*/}
      {data?.content?.brands?.status && data?.content?.brands?.brand_ids.length > 0 && (
        <div className="brand-effect">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

      {/* Sticky Cart Section */}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </div>
  );
};

export default ParisTheme;

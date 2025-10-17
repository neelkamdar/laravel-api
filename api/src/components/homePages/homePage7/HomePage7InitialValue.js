const HomePage7InitialValue = (data) => {
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,
        homeBanner7Image: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",
        sliderBanner: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.image_url ? { original_url: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.image_url } : "",
        categoryIconList: data?.content?.categories_icon_list?.category_ids || [],
        brandIds: data?.content?.brands?.brand_ids|| [],
       
        // Redirect Link

        homeBannerLinkType: data?.content?.home_banner?.main_banner?.redirect_link?.link_type || '',
        homeBannerLink: data?.content?.home_banner?.main_banner?.redirect_link?.link || "",
        productListImage1: data?.content?.products_list_1?.product_ids || [],
        coupons: data?.content?.coupons?.image_url ? { original_url: data?.content?.coupons?.image_url } : "",
        
        couponsLinkType: data?.content?.coupons?.redirect_link?.link_type || "",
        couponsLink: data?.content?.coupons?.redirect_link?.link || "",
        
        productSlider1ProductIds:data?.content?.slider_product_with_banner?.slider_products?.product_slider_1?.product_ids || [],
        productSlider2ProductIds:data?.content?.slider_product_with_banner?.slider_products?.product_slider_2?.product_ids || [],
        productSlider3ProductIds:data?.content?.slider_product_with_banner?.slider_products?.product_slider_3?.product_ids || [],
        sliderBannerLinkType: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.redirect_link?.link_type || "",
        sliderBannerLink: data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.redirect_link?.link || "",
        productListImage2: data?.content?.products_list_2?.product_ids || [],
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } : "",

    }
}
export default HomePage7InitialValue
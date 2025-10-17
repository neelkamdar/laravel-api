const CairoHomePageInitialValue = (data) => {
    return {
        content: data?.content,
        sequence: data?.sequence,
        slug: data?.slug,
        homeBannerImage: data?.content?.home_banner?.main_banner?.image_url ? { original_url: data?.content?.home_banner?.main_banner?.image_url } : "",
        newsLetterImage: data?.content?.news_letter?.image_url ? { original_url: data?.content?.news_letter?.image_url } : "",
        sliderImage: data?.content?.slider_product?.image_url ? { original_url: data?.content?.slider_product?.image_url } : "",
        homeCategoryIconList: data?.content?.home_banner?.main_banner?.category_ids || [],
        categoryIconList: data?.content?.categories_icon_list?.category_ids ?  data?.content?.categories_icon_list?.category_ids || [] : [],
        categoryIconList2: data?.content?.categories_icon_list_2?.category_ids || [],
        categoriesProducts: data?.content?.categories_products?.category_ids || [],
        productListImage1: data?.content?.products_list_1?.product_ids || [],
        sliderProductIds: data?.content?.slider_product?.product_ids || [],
        featureBlogSelect: data?.content?.featured_blogs?.blog_ids || [],
        brandIds: data?.content?.brands?.brand_ids|| [],
        sellerID:data?.content?.seller?.store_ids  || [],

    }
}
export default CairoHomePageInitialValue
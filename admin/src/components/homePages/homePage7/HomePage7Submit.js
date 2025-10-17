import { concatDynamicProductKeys } from "../../../utils/customFunctions/concatDynamicProductKeys"

const HomePage7Submit = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))

    if (values['homeBanner7Image']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBanner7Image'].hasOwnProperty('asset_url') ? values['homeBanner7Image']?.asset_url : values['homeBanner7Image']?.original_url  
    } else values['content']['home_banner']['main_banner']['image_url'] = ''
    // For Passing Redirect Link
    if (values['homeBannerLinkType']) {
        values['content']['home_banner']['main_banner']['redirect_link']['link_type'] = values['homeBannerLinkType'];
    } else {
        values['content']['home_banner']['main_banner']['redirect_link']['link_type'] = "";
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = "";
        values['homeBannerLinkType'] = "";
    }
    if (values['homeBannerLink']) {
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = values['homeBannerLink']
        if (values['homeBannerLinkType'] == "product") {
            values['content']['home_banner']['main_banner']['redirect_link']['product_ids'] = values['homeBannerLink']
        } else {
            values['content']['home_banner']['main_banner']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['home_banner']['main_banner']['redirect_link']['link'] = ""
    }

    if (values['brandIds']) {
        values['content']['brands']['brand_ids'] = values['brandIds']
    }

    if (values['categoryIconList']) {
        values['content']['categories_icon_list']['category_ids'] = values['categoryIconList']
    }


    if (values['productListImage1']) {
        values['content']['products_list_1']['product_ids'] = values['productListImage1']
    }
    if (values['productListImage2']) {
        values['content']['products_list_2']['product_ids'] = values['productListImage2']
    }
    if (values['coupons']) {
        values['content']['coupons']['image_url'] = values['coupons']?.hasOwnProperty('asset_url') ? values['coupons']?.asset_url : values['coupons']?.original_url
    } else values['content']['coupons']['image_url'] = null
    // For Passing Redirect Link
    if (values['couponsLinkType']) {
        values['content']['coupons']['redirect_link']['link_type'] = values['couponsLinkType'];
    } else {
        values['content']['coupons']['redirect_link']['link_type'] = "";
        values['content']['coupons']['redirect_link']['link'] = "";
        values['couponsLinkType'] = "";
    }
    if (values['couponsLink']) {
        values['content']['coupons']['redirect_link']['link'] = values['couponsLink']
        if (values['couponsLinkType'] == "product") {
            values['content']['coupons']['redirect_link']['product_ids'] = values['couponsLink']
        } else {
            values['content']['coupons']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['coupons']['redirect_link']['link'] = ""
    }


    if (values['productSlider1ProductIds']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_1']['product_ids'] = values['productSlider1ProductIds']
    }  
    if (values['productSlider2ProductIds']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_2']['product_ids'] = values['productSlider2ProductIds']
    }
    if (values['productSlider3ProductIds']) {
        values['content']['slider_product_with_banner']['slider_products']['product_slider_3']['product_ids'] = values['productSlider3ProductIds']
    }
    
    if (values['sliderBanner']) {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['image_url'] = values['sliderBanner'].hasOwnProperty('asset_url') ? values['sliderBanner']?.asset_url : values['sliderBanner']?.original_url  
    } else values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['image_url'] = ''
    // For Passing Redirect Link
    if (values['sliderBannerLinkType']) {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link_type'] = values['sliderBannerLinkType'];
    } else {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link_type'] = "";
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = "";
        values['sliderBannerLinkType'] = "";
    }
    if (values['sliderBannerLink']) {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = values['sliderBannerLink']
        if (values['sliderBannerLinkType'] == "product") {
            values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = values['sliderBannerLink']
        } else {
            values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['product_ids'] = ''
        }
    } else {
        values['content']['slider_product_with_banner']['left_side_banners']['banner_1']['redirect_link']['link'] = ""
    }
    
    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].hasOwnProperty('asset_url') ? values['newsLetterImage']?.asset_url : values['newsLetterImage']?.original_url  
    } else values['content']['news_letter']['image_url'] = ''
    const submitValue={
        content:values['content'],
        slug:values['slug'],
        _method:"put"
    }
    mutate(submitValue)
}
export default HomePage7Submit
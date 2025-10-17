import { concatDynamicProductKeys } from "../../../utils/customFunctions/concatDynamicProductKeys"

const CairoHomePageSubmitValue = (values, mutate) => {
    values['content']['products_ids'] = Array.from(new Set(concatDynamicProductKeys(values)))
    
    if (values['homeBannerImage']) {
        values['content']['home_banner']['main_banner']['image_url'] = values['homeBannerImage'].hasOwnProperty('asset_url') ? values['homeBannerImage']?.asset_url : values['homeBannerImage']?.original_url
    } else values['content']['home_banner']['main_banner']['image_url'] = ''
    
    if (values['newsLetterImage']) {
        values['content']['news_letter']['image_url'] = values['newsLetterImage'].hasOwnProperty('asset_url') ? values['newsLetterImage']?.asset_url : values['newsLetterImage']?.original_url
    } else values['content']['news_letter']['image_url'] = ''

    if (values['sliderImage']) {
        values['content']['slider_product']['image_url'] = values['sliderImage'].hasOwnProperty('asset_url') ? values['sliderImage']?.asset_url : values['sliderImage']?.original_url
    } else values['content']['slider_product']['image_url'] = ''

    if (values['homeCategoryIconList']) {
        values['content']['home_banner']['main_banner']['category_ids'] = values['homeCategoryIconList']
     }

    if (values['categoryIconList']) {
    values['content']['categories_icon_list']['category_ids'] = values['categoryIconList']
     }  

      if (values['categoryIconList2']) {
        values['content']['categories_icon_list_2']['category_ids'] = values['categoryIconList2']
     }     
     if (values['categoriesProducts']) {
        values['content']['categories_products']['category_ids'] = values['categoriesProducts']
     }
         
    if (values['brandIds']) {
        values['content']['brands']['brand_ids'] = values['brandIds']
    }

    if (values['sellerID']) {
        values['content']['seller']['store_ids'] = values['sellerID']
    }
    
     if (values['productListImage1']) {
         values['content']['products_list_1']['product_ids'] = values['productListImage1']
     }

     if (values['featureBlogSelect']) {
        values['content']['featured_blogs']['blog_ids'] = values['featureBlogSelect']
    }
    const submitValue={
        content:values['content'],
        slug:values['slug'],
        _method:"put"
    }
    mutate(submitValue)
}
export default CairoHomePageSubmitValue
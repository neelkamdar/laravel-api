import { useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import { getHelperText } from "../../../utils/customFunctions/getHelperText";
import CheckBoxField from "../../inputFields/CheckBoxField";
import FileUploadField from "../../inputFields/FileUploadField";
import CommonRedirect from '../CommonRedirect';
import { useTranslation } from "react-i18next";

const HomeBanner4 = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [active, setActive] = useState(0)
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <CheckBoxField name="[content][home_banner][status]" title="status" />
            <FileUploadField name="homeBannerBackgroungImage" title='background_image' showImage={values['homeBannerBackgroungImage']} id="homeBannerBackgroungImage" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('1920x637px')} />
            <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("banner")}</h4>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{t("main_banner")} <RiArrowDownLine /></div>
                {active == 1 && (<div className="rule-edit-form">
                    <FileUploadField name="homeBannerMainImage" title='image' showImage={values['homeBannerMainImage']} id="homeBannerMainImage" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('780x534px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeBannerLinkType', multipleNameKey: 'homeBannerLink' }} setSearch={setSearch} />
                </div>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(2)}>{t("sub_banner")}1 <RiArrowDownLine /></div>
                {active == 2 && (<div className="rule-edit-form">
                    <FileUploadField name="homeBannerSub1Image" title='image' showImage={values['homeBannerSub1Image']} id="homeBannerSub1Image" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('375x534px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner1LinkType', multipleNameKey: 'homeSubBanner1Link' }} setSearch={setSearch} />
                </div>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{t("sub_banner")}2 <RiArrowDownLine /></div>
                {active == 3 && (<div className="rule-edit-form">
                    <FileUploadField name="homeBannerSub2Image" title='image' id="homeBannerSub2Image" showImage={values['homeBannerSub2Image']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('375x254px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner2LinkType', multipleNameKey: 'homeSubBanner2Link' }} setSearch={setSearch} />
                </div>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(4)}>{t("sub_banner")}3 <RiArrowDownLine /></div>
                {active == 4 && (<div className="rule-edit-form">
                    <FileUploadField name="homeBannerSub3Image" title='image' showImage={values['homeBannerSub3Image']} id="homeBannerSub3Image" type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('375x254px')} />
                    <CommonRedirect values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} nameList={{ selectNameKey: 'homeSubBanner3LinkType', multipleNameKey: 'homeSubBanner3Link' }} setSearch={setSearch} />
                </div>
                )}
            </div>
        </>
    )
}
export default HomeBanner4
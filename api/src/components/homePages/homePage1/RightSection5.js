import { useTranslation } from "react-i18next";
import { RiArrowDownLine } from 'react-icons/ri';
import { getHelperText } from '../../../utils/customFunctions/getHelperText';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SimpleInputField from '../../inputFields/SimpleInputField';


const RightSection5 = ({ values, setFieldValue, setActive, active }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(6)}>{t("coupon")}<RiArrowDownLine />
            </div>
            {active == 6 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section5_coupons][title]`, placeholder: t("enter_title"), title: "title" },
                        { name: `[content][main_content][section5_coupons][coupon_code]`, placeholder: t("enter_coupon_code"), title: "coupon_code" }
                    ]} />
                    <FileUploadField name="section5CouponsImage" title='image' id="section5CouponsImage" type="file" values={values} setFieldValue={setFieldValue} showImage={values['section5CouponsImage']} helpertext={getHelperText('1198x138px')} />
                    <CheckBoxField name={`[content][main_content][section5_coupons][status]`} title="status" />
                </div>
            )}
        </div>
    )
}

export default RightSection5
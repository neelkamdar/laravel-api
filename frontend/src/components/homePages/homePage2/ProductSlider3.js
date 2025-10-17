import CheckBoxField from '../../inputFields/CheckBoxField';
import SimpleInputField from '../../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const ProductSlider3 = () => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("product_slider")} 3</h4>
            <SimpleInputField nameList={[
                { name: `[content][main_content][section2_slider_products][product_slider_3][title]`, placeholder: t("enter_title"), title: "title" }
            ]} />
            <CheckBoxField name={`[content][main_content][section2_slider_products][product_slider_3][status]`} title="status" />
        </>
    )
}

export default ProductSlider3
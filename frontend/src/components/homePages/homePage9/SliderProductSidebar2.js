import { RiArrowDownLine } from 'react-icons/ri'
import SimpleInputField from '../../inputFields/SimpleInputField'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import { useTranslation } from "react-i18next";

const SliderProductSidebar2 = ({ values, setActive, active, setFieldValue, productData, setSearch }) => {
    const { t } = useTranslation( 'common');
    return (
        <>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']['slider_product_with_banner']['slider_products']['product_slider_3']['title'] || 'Text Here'}<RiArrowDownLine /></div>
                {active == 3 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_product_with_banner][slider_products][product_slider_3][title]", placeholder: t("enter_title"), title: "title" }]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct3',
                                        title: "products",
                                        inputprops: {
                                            name: 'sliderProduct3',
                                            id: 'sliderProduct3',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    },
                                    ]}
                            />
                            <CheckBoxField name="[content][slider_product_with_banner][slider_products][product_slider_3][status]" title="status" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SliderProductSidebar2
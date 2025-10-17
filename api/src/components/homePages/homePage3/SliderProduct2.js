
import { useTranslation } from "react-i18next";
import { RiArrowDownLine } from "react-icons/ri";
import SimpleInputField from '../../inputFields/SimpleInputField';
import CheckBoxField from '../../inputFields/CheckBoxField';
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";


const SliderProduct2 = ({ setActive, active, values, description, productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']?.['slider_products']?.['product_slider_3']?.['title'] || "Text Here"}<RiArrowDownLine /></div>
                {active == 3 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_products][product_slider_3][title]", placeholder: t("enter_title"), title: "title" }
                            ]} />
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
                            <CheckBoxField name="[content][slider_products][product_slider_3][status]" title="status" />
                        </div>
                    </>
                )}
            </div>
            <div className='shipping-accordion-custom'>
                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(4)}>{values['content']?.['slider_products']?.['product_slider_4']?.['title'] || "Text Here"}<RiArrowDownLine /></div>
                {active == 4 && (
                    <>
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[{ name: "[content][slider_products][product_slider_4][title]", placeholder: t("enter_title"), title: "title" }
                            ]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'sliderProduct4',
                                        title: "products",
                                        inputprops: {
                                            name: 'sliderProduct4',
                                            id: 'sliderProduct4',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    },
                                    ]}
                            />
                            <CheckBoxField name="[content][slider_products][product_slider_4][status]" title="status" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SliderProduct2
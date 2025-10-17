import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"

const RightSection4 = ({ values, active, setActive, productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(4)}>{values['content']?.['main_content']['section4_products']['title']}<RiArrowDownLine />
            </div>
            {active == 4 && (
                <div className="rule-edit-form">
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][section4_products][title]`, placeholder: t("enter_title"), title: "title" },
                        { name: `[content][main_content][section4_products][description]`, placeholder: t("enter_description"), title: "description", type: "textarea" }
                    ]} />
                    <SearchableSelectInput
                        nameList={
                            [{
                                name: 'mainRightBannerProductIds',
                                title: "products",
                                inputprops: {
                                    name: 'mainRightBannerProductIds',
                                    id: 'mainRightBannerProductIds',
                                    options: productData || [],
                                    setsearch: setSearch,
                                }
                            },
                            ]}
                    />
                    <CheckBoxField name={`[content][main_content][section4_products][status]`} title="status" />
                </div>
            )}
        </div>
    )
}

export default RightSection4
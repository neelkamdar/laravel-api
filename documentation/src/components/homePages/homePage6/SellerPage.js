import { RiArrowDownLine } from 'react-icons/ri'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"

const SellerPage = ({ values, active, setActive, storeData, setStoreSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <div className='shipping-accordion-custom'>
            <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(5)}>{values['content']?.['main_content']['seller']['title']}<RiArrowDownLine />
            </div>
            {active == 5 && (
                <div className="rule-edit-form">
                    <CheckBoxField name={`[content][main_content][seller][status]`} title="status" />
                    <SimpleInputField nameList={[
                        { name: `[content][main_content][seller][title]`, placeholder: t("enter_title"), title: "title" },
                        { name: `[content][main_content][seller][description]`, placeholder: t("enter_description"), title: "description", type: "textarea" }
                    ]} />
                    <SearchableSelectInput
                        nameList={
                            [{
                                name: 'sellerID',
                                title: "store",
                                inputprops: {
                                    name: 'sellerID',
                                    id: 'sellerID',
                                    options: storeData || [],
                                    setsearch: setStoreSearch,
                                }
                            },
                            ]}
                    />
                    
                </div>
            )}
        </div>
    )
}

export default SellerPage
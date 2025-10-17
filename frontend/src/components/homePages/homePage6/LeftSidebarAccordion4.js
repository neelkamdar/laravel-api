import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import SimpleInputField from '../../inputFields/SimpleInputField'
import { useTranslation } from "react-i18next"

const LeftSidebarAccordion4 = ({ values, setActive, active, productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <Row className='align-items-center'>
            <Col xs="10">
                <div className='shipping-accordion-custom'>
                    <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(7)}>{values['content']['main_content']['section4_products']['title']}<RiArrowDownLine />
                    </div>
                    {active == 7 && (
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[
                                { name: `[content][main_content][section4_products][title]`, placeholder: t("enter_title"), title: "title" }, { name: `[content][main_content][section4_products][description]`, placeholder: t("enter_description"), title: "description", type: "textarea" }
                            ]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'mainContentProductIds',
                                        title: "products",
                                        inputprops: {
                                            name: 'mainContentProductIds',
                                            id: 'mainContentProductIds',
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
            </Col>
        </Row>
    )
}

export default LeftSidebarAccordion4
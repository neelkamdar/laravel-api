import { Col, Row } from "reactstrap";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import { RiArrowDownLine } from "react-icons/ri";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";


import { useTranslation } from "react-i18next";

const RightSidebarProduct = ({ setActive, values, active, productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <Row className='align-items-center'>
            <Col xs="10">
                <div className='shipping-accordion-custom'>
                    <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']['main_content']['sidebar']['sidebar_products']['title'] || 'Text Here'}<RiArrowDownLine />
                    </div>
                    {active == 3 && (
                        <div className="rule-edit-form">
                            <SimpleInputField nameList={[
                                { name: `[content][main_content][sidebar][sidebar_products][title]`, placeholder: t("enter_title"), title: "title" }
                            ]} />
                            <SearchableSelectInput
                                nameList={
                                    [{
                                        name: 'mainContentRightSidebarProductIds',
                                        title: "products",
                                        inputprops: {
                                            name: 'mainContentRightSidebarProductIds',
                                            id: 'mainContentRightSidebarProductIds',
                                            options: productData || [],
                                            setsearch: setSearch,
                                        }
                                    },
                                    ]}
                            />
                            <CheckBoxField name={`[content][main_content][sidebar][sidebar_products][status]`} title="status" />
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    )
}
export default RightSidebarProduct
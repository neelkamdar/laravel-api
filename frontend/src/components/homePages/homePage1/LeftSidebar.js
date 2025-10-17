import { useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import CheckBoxField from '../../inputFields/CheckBoxField'
import MultiSelectField from '../../inputFields/MultiSelectField'
import SearchableSelectInput from '../../inputFields/SearchableSelectInput'
import SimpleInputField from '../../inputFields/SimpleInputField'
import LeftSideBanner from './LeftSideBanner'
import { useTranslation } from "react-i18next"

const LeftSidebar = ({ values, setFieldValue, productData, categoryData, setSearch }) => {
    const [active, setActive] = useState("1");
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <Row className='align-items-center'>
                <Col xs="10">
                    <CheckBoxField name={`[content][main_content][sidebar][status]`} title="status" />
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{values['content']?.['main_content']?.['sidebar']?.['categories_icon_list']?.['title']}<RiArrowDownLine />
                        </div>
                        {active == 1 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][sidebar][categories_icon_list][title]`, placeholder: t("enter_title"), title: "title" }
                                ]} />
                                <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainLeftCategory' title="Category" data={categoryData} />
                                <CheckBoxField name={`[content][main_content][sidebar][categories_icon_list][status]`} title="status" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <LeftSideBanner values={values} setFieldValue={setFieldValue} active={active} setActive={setActive} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            <Row className='align-items-center'>
                <Col xs="10">
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(3)}>{values['content']?.['main_content']?.['sidebar']?.['sidebar_products']?.['title']}<RiArrowDownLine />
                        </div>
                        {active == 3 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][sidebar][sidebar_products][title]`, placeholder: t("enter_title"), title: "title" }
                                ]} />
                                <SearchableSelectInput
                                    nameList={
                                        [
                                            {
                                                name: 'product_ids',
                                                title: "products",
                                                inputprops: {
                                                    name: 'product_ids',
                                                    id: 'product_ids',
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
        </>
    )
}

export default LeftSidebar
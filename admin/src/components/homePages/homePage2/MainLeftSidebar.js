import { useState } from 'react'
import { RiArrowDownLine } from 'react-icons/ri'
import { Col, Row } from 'reactstrap'
import CheckBoxField from '../../inputFields/CheckBoxField'
import SimpleInputField from '../../inputFields/SimpleInputField'
import MainLeftSidebarProduct1 from './MainLeftSidebarProduct1'
import MainLeftSidebarProduct2 from './MainLeftSidebarProduct2'
import MainLeftSidebarProduct3 from './MainLeftSidebarProduct3'

import SearchableSelectInput from '@/components/inputFields/SearchableSelectInput'
import { useTranslation } from "react-i18next"

const MainLeftSidebar = ({ values, setFieldValue, productData, setSearch }) => {
    const [active, setActive] = useState(0)
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <Row className='align-items-center'>
                <Col xs="10">
                    <div className='shipping-accordion-custom'>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive(1)}>{values['content']?.['main_content']?.['section1_products']?.['title']}<RiArrowDownLine />
                        </div>
                        {active == 1 && (
                            <div className="rule-edit-form">
                                <SimpleInputField nameList={[
                                    { name: `[content][main_content][section1_products][title]`, placeholder: t("enter_title"), title: "title" }
                                ]} />
                                <SearchableSelectInput
                                    nameList={
                                        [{
                                            name: 'mainLeftProduct1',
                                            title: "products",
                                            inputprops: {
                                                name: 'mainLeftProduct1',
                                                id: 'mainLeftProduct1',
                                                options: productData || [],
                                                setsearch: setSearch,
                                            }
                                        },
                                        ]}
                                />
                                <CheckBoxField name={`[content][main_content][section1_products][status]`} title="status" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            <MainLeftSidebarProduct1 values={values} setActive={setActive} active={active} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
            <MainLeftSidebarProduct2 values={values} setActive={setActive} active={active} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
            <MainLeftSidebarProduct3 values={values} setActive={setActive} active={active} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
        </>

    )
}

export default MainLeftSidebar
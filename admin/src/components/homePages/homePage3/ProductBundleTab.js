import { useState } from "react";
import { RiArrowDownLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import Btn from "../../../elements/buttons/Btn";
import { getHelperText } from "../../../utils/customFunctions/getHelperText";
import CheckBoxField from "../../inputFields/CheckBoxField";
import FileUploadField from "../../inputFields/FileUploadField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";

const ProductBundleTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState();
    const removeBanners = (index) => {
        if (values['content']['product_bundles']['bundles'].length > 1) {
            let filterValue = values['content']['product_bundles']['bundles'].filter((item, i) => i !== index)
            setFieldValue("[content][product_bundles][bundles]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.image_url && setFieldValue(`productBundleImage${i}`, { original_url: elem?.image_url })
            })
        }
    }
    return (
        <>
            <CheckBoxField name={`[content][product_bundles][status]`} title="status" />
            {values['content']?.['product_bundles']?.['bundles'] && values['content']?.['product_bundles']?.['bundles'].length < 4 && <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][product_bundles][bundles]", [...values['content']?.['product_bundles']?.['bundles'], { title: "", description: "", status: false }])} title="add_banners" />}
            {
                values['content']?.['product_bundles']?.['bundles']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{values['content']?.['product_bundles']?.['bundles']?.[index]?.['title'] || 'Text Here'}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <SimpleInputField nameList={[
                                            { name: `[content][product_bundles][bundles][${index}][title]`, placeholder: t("enter_title"), title: "title" },
                                            { name: `[content][product_bundles][bundles][${index}][sub_title]`, placeholder: t("enter_sub_title"), title: "sub_title" },
                                            { name: `[content][product_bundles][bundles][${index}][button_text]`, placeholder: t("enter_button_text"), title: "button_text" },
                                        ]} />
                                        <FileUploadField name={`productBundleImage${index}`} title='image' id={`productBundleImage${index}`} showImage={values[`productBundleImage${index}`]} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('382x235px')} />
                                        <CheckBoxField name={`[content][product_bundles][bundles][${index}][status]`} title="status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => removeBanners(index)}>{t('Remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}
export default ProductBundleTab
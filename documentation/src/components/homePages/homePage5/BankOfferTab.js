import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiArrowDownLine } from 'react-icons/ri';
import { Col, Row } from 'reactstrap';
import Btn from '../../../elements/buttons/Btn';
import CheckBoxField from '../../inputFields/CheckBoxField';
import FileUploadField from '../../inputFields/FileUploadField';
import SimpleInputField from '../../inputFields/SimpleInputField';

const BankOfferTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    const [active, setActive] = useState(0)
    const removeBanners = (index) => {
        if (values['content']['bank_wallet_offers']['offers'].length > 1) {
            let filterValue = values['content']['bank_wallet_offers']['offers'].filter((item, i) => i !== index)
            setFieldValue("[content][bank_wallet_offers][offers]", filterValue)
            filterValue?.forEach((elem, i) => {
                elem?.image_url && setFieldValue(`bankOfferImage${i}`, { original_url: elem?.image_url })
            })
        }
    }
    return (
        <>
            <SimpleInputField nameList={[{ name: `[content][bank_wallet_offers][title]`, placeholder: t("enter_title"), title: "title" }
            ]} />
            <CheckBoxField name={`[content][bank_wallet_offers][status]`} title="status" />
            <Btn className="btn-theme my-4" onClick={() => setFieldValue("[content][bank_wallet_offers][offers]" || [], [...values['content']?.['bank_wallet_offers']?.['offers'], { title: "", description: "", status: false }])} title="add_offer" />
            {
                values['content']?.['bank_wallet_offers']?.['offers']?.map((elem, index) => {
                    return <Row className='align-items-center' key={index}>
                        <Col xs="10">
                            <div className='shipping-accordion-custom'>
                                <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== index && index)}>{"Offer"}<RiArrowDownLine />
                                </div>
                                {active == index && (
                                    <div className="rule-edit-form">
                                        <FileUploadField name={`bankOfferImage${index}`} showImage={values[`bankOfferImage${index}`]} title='image' id={`bankOfferImage${index}`} type="file" values={values} setFieldValue={setFieldValue} />
                                        <SimpleInputField nameList={[
                                            { name: `[content][bank_wallet_offers][offers][${index}][coupon_code]`, placeholder: t("enter_coupons_code"), title: "coupon_code" },
                                        ]} />
                                        <CheckBoxField name={`[content][bank_wallet_offers][offers][${index}][status]`} title="status" />
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col xs="2">
                            <a className="h-100 w-100 cursor-pointer"
                                onClick={() => removeBanners(index)}>{t('remove')}</a>
                        </Col>
                    </Row>
                })
            }
        </>
    )
}

export default BankOfferTab
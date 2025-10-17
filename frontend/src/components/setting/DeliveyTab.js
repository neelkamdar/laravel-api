import { Col, Label, Row } from 'reactstrap';
import Btn from '../../elements/buttons/Btn';
import CheckBoxField from '../inputFields/CheckBoxField';
import SimpleInputField from '../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const DeliveyTab = ({ values, setFieldValue }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[{ name: `[values][delivery][default][title]`, title: "title" }]} />
            <SimpleInputField nameList={[{ name: `[values][delivery][default][description]`, title: "description" }]} />
            <CheckBoxField name="[values][delivery][same_day_delivery]" title="same_day_delivery" />
            {values['values']['delivery']?.['same_day_delivery'] && <>
                <SimpleInputField nameList={[{ name: `[values][delivery][same_day][title]`, title: "title", placeholder: t("enter_title") }]} />
                <SimpleInputField nameList={[{ name: `[values][delivery][same_day][description]`, title: "description", placeholder: t("enter_description") }]} />
                <Row className='mb-4 align-items-center g-2'>
                    <Col sm="3"><Label className='col-form-label form-label-title form-label'> {t("default_delivery")}</Label></Col>
                    <Col sm="10">
                        {values['values']['delivery']?.['same_day_intervals'].length > 0 &&
                            values['values']['delivery']['same_day_intervals'].map((elem, i) => (
                                <div className='mb-3' key={i}>
                                    <Row>
                                        <Col sm="10">
                                            <Row className='g-3'>
                                                <Col xs="6">
                                                    <SimpleInputField nameList={[{ name: `[values][delivery][same_day_intervals][${i}][title]`, title: "title", notitle: "true", placeholder: t("enter_title") }]} />
                                                </Col>
                                                <Col xs="6">
                                                    <SimpleInputField nameList={[{ name: `[values][delivery][same_day_intervals][${i}][description]`, title: "description", notitle: "true", placeholder: t("enter_description") }]} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col sm="2" className='px-sm-0'>
                                            <a className="mt-custom d-block invalid-feedback cursor-pointer"
                                                onClick={() => setFieldValue("[values][delivery][same_day_intervals]", values['values']['delivery']['same_day_intervals'].filter((item, index) => index !== i),)}>{t('remove')}</a>
                                        </Col>
                                    </Row>
                                </div>

                            ))}
                        <Btn className="btn-theme mt-4" onClick={() => setFieldValue("[values][delivery][same_day_intervals]", [...values['values']['delivery']['same_day_intervals'], { title: "", description: "" }])} title="add_intervals" />
                    </Col>
                </Row>

            </>}
        </>
    )
}

export default DeliveyTab
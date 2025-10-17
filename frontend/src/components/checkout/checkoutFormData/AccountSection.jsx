import SearchableSelectInput from '@/components/common/inputFields/SearchableSelectInput';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { Col, Input, Label, Row } from 'reactstrap';
import { AllCountryCode } from '../../../data/AllCountryCode';
import { useTranslation } from "react-i18next";
import React from 'react';

const AccountSection = ({ values, setFieldValue, }) => {
    const { t } = useTranslation( 'common');
    return (
        <div className="checkbox-main-box">
            <div className="checkout-title1">
                <h2>{'Account Details'}</h2>
            </div>
            <Row>
                <Col md={4}>
                    <div className='mb-3 form-box'>
                        <SimpleInputField
                            nameList={[
                                { name: 'name', placeholder: t('enter_name'), toplabel: 'name' , require:'true'}]} />
                    </div>
                </Col>
                <Col md={4}>
                    <div className='mb-3 form-box'>
                        <SimpleInputField
                            nameList={[
                                { name: 'email', placeholder: t('enter_email'), toplabel: 'email', require:'true' }]} />
                    </div>
                </Col>
                <Col md={4} className='phone-field'>
                    <div className='form-box position-relative'>
                        <div className='country-input'>
                            <SimpleInputField
                                nameList={[{ name: 'phone', type: 'number', placeholder: t('enter_phone'), require: 'true', toplabel: 'phone', colprops: { xs: 12 }, colclass: 'country-input-box' }]}
                            />
                            <SearchableSelectInput
                                nameList={[
                                    {
                                        name: 'country_code',
                                        notitle: 'true',
                                        inputprops: {
                                            name: 'country_code',
                                            id: 'country_code',
                                            options: AllCountryCode
                                            ,
                                        },
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Col>

                <Col md={12}>
                    <div className='mb-3 form-box form-checkbox'> 
                        <Input className='checkbox_animated check-box' type='checkbox' name='create_account' onChange={(e) => {setFieldValue('create_account', e.target.checked);  }} checked={values.create_account} />
                        <Label className='form-check-label' htmlFor='flexCheckDefault'>
                            {t('create_an_account')}
                        </Label>
                    </div>
                </Col>
        
                {values.create_account == true &&
                    <Col md={6}>
                        <div className='mb-3 form-box'>
                            <SimpleInputField
                                nameList={[
                                    { name: 'password', placeholder: t('enter_password'), type: 'password', title: 'password', toplabel: 'password', require: 'true' },
                                ]}
                            />
                        </div>
                    </Col>
                }
            </Row>
        </div>
    );
};

export default AccountSection;

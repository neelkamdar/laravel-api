import FormBtn from '@/components/common/FormBtn';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import SettingContext from '@/helper/settingContext';
import { YupObject, emailSchema, loginPasswordSchema } from '@/utils/validation/ValidationSchemas';
import { ErrorMessage, Form, Formik } from 'formik';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from "react-i18next";
import { Col, Input, Label } from 'reactstrap';

const LoginForm = ({mutate, isLoading}) => {
  const { t } = useTranslation('common');
  const { settingData } = useContext(SettingContext);
  const reCaptchaRef = useRef()
  
  return (
    <>
      
      <Formik
        initialValues={{
          email: 'john.customer@example.com',
          password: '123456789',
          recaptcha: ''
        }}
        validationSchema={YupObject({
          email: emailSchema,
          password: loginPasswordSchema,
          recaptcha: settingData?.google_reCaptcha?.status ? recaptchaSchema : ""
        })}
        onSubmit={mutate}>
        {({ errors, touched, setFieldValue }) => (
          <Form className='row g-4'>
            <SimpleInputField
              nameList={[
                { name: 'email', placeholder: t('enter_email_address'), title: 'email', label: 'email_address' },
                { name: 'password', placeholder: t('enter_password'), type: 'password', title: 'password', label: 'password' },
              ]}
            />
            {settingData?.google_reCaptcha?.status &&
              <Col sm="12">
                <ReCAPTCHA
                  ref={reCaptchaRef}
                  sitekey={settingData?.google_reCaptcha?.site_key}
                  onChange={(value) => {
                    setFieldValue('recaptcha', value);
                  }}
                />
                {errors.recaptcha && touched.recaptcha && <ErrorMessage name="recaptcha" render={(msg) => <div className="invalid-feedback d-block">{errors.recaptcha}</div>} />}
              </Col>
            }
            <Col xs={12}>
              <div className='forgot-box'>
                <div className='form-check remember-box'>
                  <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                  <Label className='form-check-label' htmlFor='flexCheckDefault'>
                    {t('remember_me')}
                  </Label>
                </div>
                <Link href={`/auth/forgot-password`} className='forgot-password'>
                  {t('forgot_password')}?
                </Link>
              </div>
            </Col>
            <FormBtn title={'log_in'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;

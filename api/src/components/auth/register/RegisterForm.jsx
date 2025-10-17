import { Form, Formik } from 'formik';
import { Col, Input, Label } from 'reactstrap';
import { useTranslation } from "react-i18next";
import { RegisterAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';
import { YupObject, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema } from '@/utils/validation/ValidationSchemas';
import FormBtn from '@/components/common/FormBtn';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { AllCountryCode } from '../../../data/AllCountryCode';
import SearchableSelectInput from '@/components/common/inputFields/SearchableSelectInput';

const RegisterForm = () => {
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useCreate(RegisterAPI, false, `/account/dashboard`, 'Register Successfully');
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_code: '91',
        phone: '',
      }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        password_confirmation: passwordConfirmationSchema,
        phone: nameSchema,
      })}
      onSubmit={mutate}>
      {({ values, errors, touched, setFieldValue }) => (
        <Form className='row g-md-4 g-3'>
          <SimpleInputField
            nameList={[
              { name: 'name', placeholder: t('enter_full_name'), title: 'name', label: 'full_name' },
              { name: 'email', placeholder: t('enter_email_address'), title: 'email', label: 'email_address' },
            ]}
          />
          <Col xs='12'>
            <div className='country-input'>
              <SearchableSelectInput
                nameList={[
                  {
                    name: 'country_code',
                    notitle: 'true',
                    inputprops: {
                      name: 'country_code',
                      id: 'country_code',
                      options: AllCountryCode,
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  {
                    name: 'phone',
                    type: 'number',
                    placeholder: t('enter_phone_number'),
                    colclass: 'country-input-box',
                    title: 'phone',
                    label: 'phone',
                  },
                ]}
              />
            </div>
          </Col>

          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('password'), type: 'password', title: 'password', label: 'password' },
              { name: 'password_confirmation', type: 'password', placeholder: t('enter_confirm_password'), title: 'confirm_password', label: 'confirm_password' },
            ]}
          />

          <Col xs={12}>
            <div className='forgot-box'>
              <div className='form-check remember-box'>
                <Input className='checkbox_animated check-box' type='checkbox' id='flexCheckDefault' />
                <Label className='form-check-label' htmlFor='flexCheckDefault'>
                  {t('i_agree_with')}
                  <span>{t('terms')}</span> {t('and')} <span>{t('privacy')}</span>
                </Label>
              </div>
            </div>
          </Col>
          <FormBtn title={'sign_up'} classes={{ btnClass: 'btn btn-animation w-100' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

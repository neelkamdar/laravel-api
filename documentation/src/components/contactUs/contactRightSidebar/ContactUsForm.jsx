import { Row } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";
import { YupObject, emailSchema, nameSchema, phoneSchema } from '@/utils/validation/ValidationSchemas';
import useCreate from '@/utils/hooks/useCreate';
import { ContactUsAPI } from '@/utils/axiosUtils/API';
import { RiChat2Fill, RiMailFill, RiSmartphoneLine, RiUserFill } from 'react-icons/ri';
import { ToastNotification } from '@/utils/customFunctions/ToastNotification';

const ContactUsForm = () => {
  const { t } = useTranslation( 'common');
  const { mutate, isLoading } = useCreate(ContactUsAPI, false, false, 'No',(resDta)=>ToastNotification("success",resDta?.data?.message ));
  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', subject: '', message: '' }}
      validationSchema={YupObject({
        name: nameSchema,
        email: emailSchema,
        phone: phoneSchema,
        subject: nameSchema,
        message: nameSchema,
      })}
      onSubmit={(values, { resetForm }) => {mutate(values, { onSuccess: () => { resetForm(); },});}}
      >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <Row>
            <SimpleInputField
              nameList={[
                { name: 'name', placeholder: t('enter_full_name'), toplabel: 'full_name', inputaddon: 'true', prefixvalue: <RiUserFill />, colprops: { xs: 12 } },
                { name: 'email', placeholder: t('enter_email'), toplabel: 'email_address', inputaddon: 'true', prefixvalue: <RiMailFill />, colprops: { xxl: 6, lg: 12, sm: 6 } },
                {
                  name: 'phone',
                  placeholder: t('enter_phone'),
                  toplabel: 'phone_number',
                  inputaddon: 'true',
                  prefixvalue: <RiSmartphoneLine />,
                  type: 'number',
                  colprops: { xxl: 6, lg: 12, sm: 6 },
                },
                { name: 'subject', placeholder: t('enter_subject'), toplabel: 'subject', inputaddon: 'true', prefixvalue: <RiUserFill />, colprops: { xs: 12 } },
                { name: 'message', placeholder: t('enter_your_message'), toplabel: 'message', inputaddon: 'true', prefixvalue: <RiChat2Fill />, colprops: { xs: 12 }, type: 'textarea', rows: 5 },
              ]}
            />
          </Row>
          <Btn className='btn btn-animation btn-md fw-bold ms-auto' type='submit' loading={Number(isLoading)}>
            {t('send_message')}
          </Btn>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;

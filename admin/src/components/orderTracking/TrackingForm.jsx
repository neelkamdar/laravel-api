import { Form, Formik } from 'formik';
import { Col } from 'reactstrap';
import FormBtn from '@/components/common/FormBtn';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';
import { YupObject, emailSchema, nameSchema } from '@/utils/validation/ValidationSchemas';



const TrackingForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const onSubmit = (values) => {
    const queryParams = new URLSearchParams({
      order_number: values?.order_number,
      email_or_phone: values?.email_or_phone,
    });
    router.push(`${'/order/details'}?${queryParams}`);
  };

  return (
    <Formik
      initialValues={{
        order_number: '',
        email_or_phone: '',
      }}
      validationSchema={YupObject({
        email_or_phone: nameSchema,
        order_number: nameSchema,
      })}
      onSubmit={onSubmit}>
      {({ errors, touched, setFieldValue }) => (
        <Form className='row g-4'>
          <SimpleInputField
            nameList={[
              { name: 'order_number', placeholder: t('enter_order_number'), title: 'order_number', label: 'order_number' },
              { name: 'email_or_phone', placeholder: t('enter_email_or_phone'), title: 'enter_email_or_phone', label: 'enter_email_or_phone' },
            ]}
          />

          <Col>
            <FormBtn title={'track'} classes={{ btnClass: 'btn btn-animation w-100' }} loading="" />
          </Col>
        </Form>
      )}
    </Formik>
  );
};

export default TrackingForm;

import { useContext } from 'react';
import { Form, Formik } from 'formik';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';

import useUpdatePassword, { UpdatePasswordSchema } from '@/utils/hooks/auth/useUpdatePassword';
import { useTranslation } from "react-i18next";
import FormBtn from '@/components/common/FormBtn';

const UpdatePasswordForm = () => {
  
  const { t } = useTranslation( 'common');
  const { mutate, isLoading } = useUpdatePassword();
  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
      }}
      validationSchema={UpdatePasswordSchema}
      onSubmit={mutate}>
      {() => (
        <Form className='row g-2'>
          <SimpleInputField
            nameList={[
              { name: 'password', placeholder: t('enter_password'), title: 'password',type: 'password', label: 'password' },
              { name: 'password_confirmation', placeholder: t('enter_confirm_password'),type: 'password', title: 'confirm_password', label: 'confirm_password' },
            ]}
          />
          <FormBtn title={'forgot_password'} classes={{ btnClass: 'btn-animation w-100 justify-content-center' }} loading={isLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;

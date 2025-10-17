import FormBtn from '@/components/common/FormBtn';
import { obscureEmail } from '@/utils/customFunctions/EmailFormates';
import useOtpVerification from '@/utils/hooks/auth/useOtpVerification';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Input } from 'reactstrap';

const OTPVerificationForm = () => {
  const cookies = Cookies.get('ue');
  const [otp, setOtp] = useState('');
  const { t } = useTranslation( 'common');
  const { mutate: otpVerification } = useOtpVerification();
  const handleChange = (e) => {
    if (e.target.value.length <= 5 && !isNaN(Number(e.target.value))) {
      setOtp(e.target.value);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={(values) => otp && otp.length === 5 && otpVerification({ email: cookies, token: otp })}>
        {() => (
          <Form className='row g-2'>
            <div className='log-in-title'>
              <h3 className='text-content'>{t('please_enter_the_one_time_password_to_verify_your_account')}</h3>
              <h5 className='text-content'>
                {t('a_code_has_been_sent_to') + ' '}
                <span>{obscureEmail(cookies)}</span>
              </h5>
            </div>
            <div className='outer-otp'>
              <div className='inner-otp'>
                <Input type='text' className='no-background' maxLength='5' onChange={handleChange} value={otp} />
              </div>
            </div>
            <FormBtn title={'validate'} classes={{ btnClass: 'btn btn-animation w-100 mt-3' }}  />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OTPVerificationForm;

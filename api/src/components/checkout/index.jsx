'use client';
import AccountContext from '@/helper/accountContext';
import SettingContext from '@/helper/settingContext';
import { AddToCartAPI, AddressAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';
import { emailSchema, nameSchema, idCreateAccount, phoneSchema } from '@/utils/validation/ValidationSchemas';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import * as Yup from "yup";
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import CheckoutForm from './CheckoutForm';
import CheckoutSidebar from './checkoutSidebar';
import DeliveryAddress from './DeliveryAddress';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import { useQuery } from '@tanstack/react-query';
import request from '@/utils/axiosUtils';


const CheckoutContent = () => {
  const { accountData, refetch } = useContext(AccountContext);
  const { settingData } = useContext(SettingContext);
  const [address, setAddress] = useState([]);
  const [modal, setModal] = useState('');
  const access_token = Cookies.get('uaf');
  let cart = Cookies.get('cartData');
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    accountData?.address.length > 0 && setAddress((prev) => [...accountData?.address]);
  }, [accountData]);

  // Initial Value for checkout
  const [initValues, setInitValues] = useState(
    {
      products: [],
      shipping_address_id: "",
      billing_address_id: "",
      points_amount: "",
      wallet_balance: "",
      coupon: "",
      delivery_description: "",
      delivery_interval: "",
      payment_method: "",
      create_account: false,
      name: '',
      email: '',
      country_code: '91',
      phone: '',
      password: '',
      shipping_address: {
        title: '',
        street: '',
        city: '',
        country_code: '91',
        phone: '',
        pincode: '',
        country_id: '',
        state_id: '',
      },
      billing_address: {
        same_shipping: false,
        title: '',
        street: '',
        city: '',
        country_code: '91',
        phone: '',
        pincode: '',
        country_id: '',
        state_id: '',
      },
    });

   // Calling Add to Cart API
   const { data: addToCartData, isLoading: addToCartLoader, refetch:addToCartRefatch } = useQuery({queryKey: [AddToCartAPI], queryFn: () => request({ url: AddToCartAPI },router), enabled:false, refetchOnWindowFocus: false, cacheTime: 0, select: (res) => res?.data });
  
   useEffect(() => {
    access_token && !addToCartLoader && addToCartRefatch()
   }, [addToCartLoader ,access_token])
    
  const { mutate, isLoading } = useCreate(AddressAPI, false, false, 'Address Added successfully', (resDta) => {
    setAddress((prev) => [...prev, resDta?.data]);
    refetch();
    setModal('');
  });

  const addressSchema = Yup.object().shape({
    title: nameSchema,
    street: nameSchema,
    city: nameSchema,
    country_code: nameSchema,
    phone: nameSchema,
    pincode: nameSchema,
    country_id: nameSchema,
    state_id: nameSchema,
  })
  return (
    <Fragment>
      <Breadcrumb title={'checkout'} subNavigation={[{ name: 'checkout' }]} />
      <WrapperComponent classes={{ sectionClass: 'compare-section section-b-space', row: 'g-0 compare-row' }} customCol={true}>
        <Formik
          initialValues={initValues}
          validationSchema={Yup.object().shape({
            name: nameSchema,
            email: emailSchema,
            phone: phoneSchema,
            password: idCreateAccount,
            shipping_address: addressSchema,
            billing_address: addressSchema
          })}
          onSubmit={mutate}>
          {({ values, setFieldValue, errors }) => (
            <Form>
              <div className='pb-4 checkout-section-2'>
                <Row className='g-sm-4 g-3'>
                  <Col xxl='8' xl='7'>
                    <div className='left-sidebar-checkout'>
                      {settingData?.activation?.guest_checkout && !access_token &&
                        <div className='checkout-form-section'>
                          <CheckoutForm values={values} setFieldValue={setFieldValue} errors={errors} />
                        </div>
                      }
                      {access_token &&
                        <div className='checkout-detail-box'>
                          <ul>
                            {!addToCartData?.is_digital_only &&<DeliveryAddress key='shipping' type='shipping' title={'Shipping'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={mutate} isLoading={isLoading} setModal={setModal}
                            />}
                            <DeliveryAddress key='billing' type='billing' title={'Billing'} values={values} updateId={values['consumer_id']} setFieldValue={setFieldValue} address={address} modal={modal} mutate={mutate} isLoading={isLoading} setModal={setModal}
                            />
                            {!addToCartData?.is_digital_only && <DeliveryOptions values={values} setFieldValue={setFieldValue} />}
                            <PaymentOptions values={values} setFieldValue={setFieldValue} />
                          </ul>
                        </div>
                      }
                    </div>
                  </Col>
                  <CheckoutSidebar addToCartData={addToCartData} values={values} setFieldValue={setFieldValue} errors={errors} />
                </Row>
              </div>
            </Form>
          )}
        </Formik>
      </WrapperComponent>
    </Fragment>
  );
};

export default CheckoutContent;

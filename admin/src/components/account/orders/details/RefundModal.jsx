import { useContext } from 'react';
import { Form, Formik } from 'formik';
import CustomModal from '@/components/common/CustomModal';
import { placeHolderImage } from '../../../../data/CommonPath';
import Avatar from '@/components/common/Avatar';
import SettingContext from '@/helper/settingContext';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";
import { Label } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import { YupObject, nameSchema } from '@/utils/validation/ValidationSchemas';
import useCreate from '@/utils/hooks/useCreate';
import { RefundAPI } from '@/utils/axiosUtils/API';

const RefundModal = ({ modal, setModal, storeData }) => {
  
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(RefundAPI, false, false, false, (resDta) => {
    if (resDta.status == 200 || resDta.status == 201) {
      setModal(false);
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal view-modal', modalHeaderClass: 'p-0', title: 'Refund' }}>
      <Formik
        initialValues={{ reason: '', payment_type: '' }}
        validationSchema={YupObject({
          reason: nameSchema,
          payment_type: nameSchema,
          product_id: storeData?.id,
        })}
        onSubmit={(values) => {
          mutate(values);
        }}>
        {({ values, setFieldValue, errors }) => (
          <Form className='product-review-form'>
            <div className='product-wrapper'>
              <div className='product-image'>
                <Avatar data={storeData?.product_thumbnail ? storeData?.product_thumbnail : placeHolderImage} customImageClass='img-fluid' name={storeData?.name} />
              </div>
              <div className='product-content'>
                <h5 className='name'>{storeData?.name}</h5>
                <div className='product-review-rating'>
                  <div className='product-rating'>
                    <h6 className='price-number'>{convertCurrency(storeData.sale_price)}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className='review-box'>
              <SimpleInputField nameList={[{ name: 'reason', placeholder: t('enter_reason'), type: 'textarea', toplabel: 'reason', require: 'true', rows: 3 }]} />
              <Label className='form-label' htmlFor='address1'>
                {t('payment_options')}
              </Label>
              <select className='form-control' name='payment_type' onChange={(e) => setFieldValue('payment_type', e.target.value)}>
                <option disabled>{t('select_payment_option')}</option>
                <option value='wallet'>{t('wallet')}</option>
                <option value='paypal'>{t('paypal')}</option>
              </select>
              {errors['payment_type'] && <div className='invalid-feedback d-block'>{t('payment_type_is_required')}</div>}
            </div>
            <Btn className='btn-md btn-theme-outline fw-bold' title='cancel' type='button' onClick={() => setModal('')} />
            <Btn className='btn-md fw-bold text-light theme-bg-color' title='submit' type='submit' loading={Number(isLoading)} />
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default RefundModal;

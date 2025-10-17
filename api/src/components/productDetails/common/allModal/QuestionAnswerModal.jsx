import CustomModal from '@/components/common/CustomModal';
import Btn from '@/elements/buttons/Btn';

import { useTranslation } from "react-i18next";
import { Form, Formik } from 'formik';
import { useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { placeHolderImage } from '../../../../data/CommonPath';
import SettingContext from '@/helper/settingContext';
import Image from 'next/image';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { QuestionAnswerAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';

const QuestionAnswerModal = ({ modal, setModal, productState, update, refetch }) => {

  const { t } = useTranslation('common');
  const { convertCurrency } = useContext(SettingContext);
  const toggle = () => {
    setModal((prev) => prev !== prev);
  };
  const { mutate, isLoading } = useCreate(QuestionAnswerAPI, false, false, 'Question Send Successfully', (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refetch && refetch();
      setModal('');
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal', modalHeaderClass: 'p-0', customChildren: true }}>
      <ModalHeader className='border-color' toggle={toggle}>
        {t('ask_a_question')}
        <RiCloseLine className='modal-close-btn' />
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            question: update?.editData && update?.editData !== 'Add' ? update?.editData?.question : '',
            product_id: productState?.product?.id,
          }}
          onSubmit={(values) => {
            if (update && update?.editData !== 'Add') {
              update?.updateQnA(values);
            } else mutate(values);
          }}>
          {() => (
            <Form>
              <div className='product-review-form'>
                <div className='product-wrapper'>
                  <div className='product-image'>
                    {productState?.product.product_thumbnail &&
                      <Image
                        src={productState?.product.product_thumbnail ? productState?.product.product_thumbnail.original_url : placeHolderImage}
                        className='img-fluid'
                        height={80}
                        width={80}
                        alt={productState?.product?.name || ""}
                      />
                    }
                  </div>
                  <div className='product-content'>
                    <h5 className='name'>{productState?.product?.name}</h5>
                    <div className='product-review-rating'>
                      <div className='product-rating'>
                        <h6 className='price-number'>{convertCurrency(productState?.product?.sale_price)}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='review-box'>
                  <SimpleInputField
                    nameList={[{ name: 'question', type: 'textarea', placeholder: t('enter_your_questions'), rows: '3', toplabel: 'your_questions', require: 'true', colprops: { xs: 12 } }]}
                  />
                </div>
              </div>
              <ModalFooter className='p-0'>
                <Btn title='cancel' type='button' className='btn-md btn-theme-outline fw-bold' onClick={() => setModal(false)} />
                <Btn title='submit' className='btn-md fw-bold text-light theme-bg-color' type='submit' loading={Number(update?.updateLoader || isLoading)} />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </CustomModal>
  );
};

export default QuestionAnswerModal;

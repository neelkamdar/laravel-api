import { useContext } from 'react';
import { RiQuestionLine } from 'react-icons/ri';
import { useTranslation } from "react-i18next";
import Btn from '@/elements/buttons/Btn';
import CustomModal from './CustomModal';

const ConfirmationModal = ({ modal, setModal, isLoading, confirmFunction }) => {
  const { t } = useTranslation( 'common');
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-0' }}>
      <RiQuestionLine className='icon-box wo-bg' />
      <h5 className='modal-title'>{t('confirmation')}</h5>
      <p>{t('are_you_sure_you_want_to_proceed')} </p>
      <div className='button-box'>
        <Btn title='no' className='btn btn-md btn-theme-outline fw-bold' onClick={() => setModal('')} />
        <Btn title='yes' className='theme-bg-color btn-md fw-bold text-light' loading={Number(isLoading)} onClick={confirmFunction} />
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;

import Btn from '@/elements/buttons/Btn';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiFlashlightLine } from 'react-icons/ri';
import HeaderDealModal from './HeaderDealModal';

const TodaysDeal = () => {
  const [modal, setModal] = useState(false);
  
  const { t } = useTranslation( 'common');
  return (
    <>
      <div className='header-nav-right'>
        <Btn className='btn deal-button' onClick={() => setModal(true)}>
          <RiFlashlightLine />
          <span>{t('deal_today')}</span>
        </Btn>
      </div>
      <HeaderDealModal modal={modal} setModal={setModal}  />
    </>
  );
};

export default TodaysDeal;

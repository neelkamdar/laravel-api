import React, { useContext } from 'react';
import { RiTimeLine } from 'react-icons/ri';
import TopbarSlider from '../common/TopbarSlider';
import Btn from '@/elements/buttons/Btn';

import { useTranslation } from "react-i18next";

const StandardTopbar = () => {
  
  const { t } = useTranslation( 'common');
  return (
    <div className='header-notification theme-bg-color overflow-hidden py-2'>
      <TopbarSlider customClassName='text-center' />
      <Btn className='btn close-notification'>
        <span>{t('close')}</span> <RiTimeLine />
      </Btn>
    </div>
  );
};

export default StandardTopbar;

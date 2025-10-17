'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import WrapperComponent from './WrapperComponent';
import { RiHome3Fill } from 'react-icons/ri';

const Breadcrumb = ({ title, subNavigation }) => {
  const { t } = useTranslation('common');
  return (
    <WrapperComponent classes={{ sectionClass: 'breadcrumb-section pt-0' }} colProps={{ md: 12 }}>
      <div className='breadcrumb-contain'>
        <h2>{t(title)}</h2>
        <nav>
          <ol className='breadcrumb mb-0'>
            <li className='breadcrumb-item'>
              <Link href='/'>
                <RiHome3Fill />
              </Link>
            </li>
            {subNavigation?.map((result, i) => (
              <li className='breadcrumb-item active text-capitalize' key={i}>
                {t(result?.name)}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </WrapperComponent>
  );
};

export default Breadcrumb;

import React, { useContext } from 'react';
import { Col, ModalFooter, Row } from 'reactstrap';

import { useTranslation } from "react-i18next";
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import Btn from '@/elements/buttons/Btn';

const UpdatePasswordForm = ({ isLoading, setModal }) => {
  const { t } = useTranslation( 'common');
  return (
    <Row>
      <SimpleInputField
        nameList={[
          { name: 'current_password', placeholder: t('enter_current_password'), toplabel: 'current_password', colprops: { xs: 12 }, require: 'true', type: 'password' },
          { name: 'password', placeholder: t('enter_password'), toplabel: 'new_password', colprops: { xs: 12 }, require: 'true', type: 'password' },
          { name: 'password_confirmation', placeholder: t('enter_confirm_password'), toplabel: 'confirm_password', colprops: { xs: 12 }, require: 'true', type: 'password' },
        ]}
      />
      <Col xs={12}>
      <ModalFooter className='ms-auto justify-content-end save-back-button pt-0'>
        <Btn className='btn btn-md btn-theme-outline fw-bold' title='cancel' onClick={() => setModal(false)} />
        <Btn className='btn-md fw-bold text-light theme-bg-color' type='submit' title='submit' loading={Number(isLoading)} />
      </ModalFooter>
      </Col>
    </Row>
  );
};

export default UpdatePasswordForm;

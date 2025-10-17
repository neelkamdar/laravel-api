import { useContext } from 'react';
import { Col, ModalFooter, Row } from 'reactstrap';
import SearchableSelectInput from '@/components/common/inputFields/SearchableSelectInput';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { AllCountryCode } from '../../../data/AllCountryCode';
import Btn from '@/elements/buttons/Btn';

import { useTranslation } from "react-i18next";
const EmailPasswordForm = ({ isLoading, setModal }) => {
  const { t } = useTranslation( 'common');
  return (
    <Row>
      <SimpleInputField
        nameList={[
          { name: 'name', placeholder: t('enter_name'), toplabel: 'name', colprops: { xs: 12 }, require: 'true' },
          { name: 'email', placeholder: t('enter_email'), toplabel: 'email', disabled: true, colprops: { xs: 12 }, require: 'true' },
        ]}
      />
      <div className='country-input'>
        <SimpleInputField nameList={[{ name: 'phone', type: 'number', placeholder: t('enter_phone'), require: 'true', toplabel: 'phone', colprops: { xs: 12 }, colclass: 'country-input-box' }]} />
        <SearchableSelectInput
          nameList={[
            {
              name: 'country_code',
              notitle: 'true',
              inputprops: {
                name: 'country_code',
                id: 'country_code',
                options: AllCountryCode,
              },
            },
          ]}
        />
      </div>
      <Col xs={12}>
        <ModalFooter className='ms-auto justify-content-end save-back-button pt-0'>
          <Btn className='btn btn-md btn-theme-outline fw-bold' title='cancel' onClick={() => setModal(false)} />
          <Btn className='btn-md fw-bold text-light theme-bg-color' type='submit' title='submit' loading={Number(isLoading)} />
        </ModalFooter>
      </Col>
    </Row>
  );
};

export default EmailPasswordForm;

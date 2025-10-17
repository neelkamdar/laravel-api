import SearchableSelectInput from '@/components/common/inputFields/SearchableSelectInput';
import SimpleInputField from '@/components/common/inputFields/SimpleInputField';
import { Form } from 'formik';
import { ModalFooter, Row } from 'reactstrap';
import { AllCountryCode } from '../../../data/AllCountryCode';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from "react-i18next";

const SelectForm = ({ values, isLoading, data, setModal , isFooterDisplay=true }) => {
  
  const { t } = useTranslation( 'common');
  return (
    <Form>
      <Row>
        <SimpleInputField
          nameList={[
            { name: 'title', placeholder: t('enter_title'), toplabel: 'title', colprops: { xs: 12 }, require: 'true' },
            { name: 'street', placeholder: t('enter_address'), toplabel: 'address', colprops: { xs: 12 }, require: 'true' },
          ]}
        />
        <SearchableSelectInput
          nameList={[
            {
              name: 'country_id',
              require: 'true',
              title: 'country',
              toplabel: 'country',
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: 'country_id',
                id: 'country_id',
                options: data,
                defaultOption: 'Select state',
              },
            },
            {
              name: 'state_id',
              require: 'true',
              title: 'State',
              toplabel: 'State',
              colprops: { xxl: 6, lg: 12, sm: 6 },
              inputprops: {
                name: 'state_id',
                id: 'state_id',
                options: values?.['country_id'] ? data?.filter((country) => Number(country.id) === Number(values?.['country_id']))?.[0]?.['state'] : [],
                defaultOption: 'Select state',
              },
              disabled: values?.['country_id'] ? false : true,
            },
          ]}
        />
        <SimpleInputField
          nameList={[
            { name: 'city', placeholder: t('enter_city'), toplabel: 'City', colprops: { xxl: 6, lg: 12, sm: 6 }, require: 'true' },
            { name: 'pincode', placeholder: t('enter_pincode'), toplabel: 'pincode', colprops: { xxl: 6, lg: 12, sm: 6 }, require: 'true' },
          ]}
        />
        <div className='country-input'>
          <SimpleInputField
            nameList={[{ name: 'phone', type: 'number', placeholder: t('enter_phone_number'), require: 'true', toplabel: 'phone', colprops: { xs: 12 }, colclass: 'country-input-box' }]}
          />
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
        {isFooterDisplay &&
          <ModalFooter className='ms-auto justify-content-end save-back-button'>
          <Btn className='btn btn-md btn-theme-outline fw-bold' title='cancel' onClick={() => setModal(false)} />
          <Btn className='btn-md fw-bold text-light theme-bg-color' type='submit' title='submit' loading={Number(isLoading)} />
        </ModalFooter>
        }
        
      </Row>
    </Form>
  );
};

export default SelectForm;

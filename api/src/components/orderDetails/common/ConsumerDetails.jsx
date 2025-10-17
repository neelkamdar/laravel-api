
import SettingContext from '@/helper/settingContext';
import { useTranslation } from "react-i18next";
import { useContext } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

const ConsumerDetails = ({ data }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation('common');
  return (
    <>
      <Row>
        <Col xxl={8} lg={12} md={7}>
          <Card>
            <CardBody>
              <h3 className='fw-semibold mb-3'>{t('consumer_details')}</h3>
              <div className='customer-detail tracking-wrapper'>
                <ul className='row g-3'>
                  {data?.billing_address ? (
                    <li className='col-sm-6'>
                      <label>{t('billing_address')}:</label>
                      <h4>

                        {data.billing_address.street}
                        {data.billing_address.city} {data.billing_address.state_id} {data.billing_address.country_id}
                        {data.billing_address.pincode} <br></br>
                        {t('phone')} : +{data?.shipping_address?.country_code} {data.billing_address.phone}
                      </h4>
                    </li>
                  ) : null}
                  {!data?.is_digital_only &&
                    data?.shipping_address ? (
                    <li className='col-sm-6'>
                      <label>{t('shipping_address')}:</label>
                      <h4>
                        {data.shipping_address.street}
                        {data.shipping_address.city} {data.shipping_address.state_id} {data.shipping_address.country_id}
                        {data.shipping_address.pincode} <br></br>
                        {t('phone')} : +{data.shipping_address.country_code} {data.shipping_address.phone}
                      </h4>
                    </li>
                  ) : null}
                  {!data?.is_digital_only &&
                    data?.delivery_description ? (
                    <li className='col-sm-6'>
                      <label>{t('delivery_slot')}:</label>
                      <h4>{data.delivery_description}</h4>
                    </li>
                  ) : null}
                  {data?.payment_method ? (
                    <li className='col-3'>
                      <label>{t('payment_mode')}:</label>
                      <div className='d-flex align-items-center gap-2'>
                        <h4>{data.payment_method}</h4>
                      </div>
                    </li>
                  ) : null}
                  {data?.payment_status ? (
                    <li className='col-3'>
                      <label>{t('payment_status')}:</label>
                      <div className='d-flex align-items-center gap-2'>
                        <h4>{data.payment_status}</h4>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xxl={4} lg={12} md={5}>
          <Card className='h-m30'>
            <CardBody>
              <h3 className='fw-semibold mb-3'>{'summary'}</h3>
              <div className='tracking-total tracking-wrapper'>
                <ul>
                  <li>
                    {t('subtotal')} <span>{data?.amount ? convertCurrency(data?.amount) : 0}</span>
                  </li>
                  <li>
                    {t('shipping')} <span>{data?.shipping_total ? convertCurrency(data?.shipping_total) : 0}</span>
                  </li>
                  <li>
                    {t('tax')} <span>{data?.tax_total ? convertCurrency(data?.tax_total) : 0}</span>
                  </li>
                  {data?.points_amount != 0 ? (
                    <li className='txt-primary fw-bold'>
                      {t('points')} <span>{data?.points_amount}</span>
                    </li>
                  ) : null}
                  {data?.wallet_balance != 0 ? (
                    <li className='txt-primary fw-bold'>
                      {t('wallet_balance')}<span>{convertCurrency(data?.wallet_balance)}</span>
                    </li>
                  ) : null}
                  <li>
                    {t('total')} <span>{data?.total ? convertCurrency(data?.total) : 0}</span>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ConsumerDetails;

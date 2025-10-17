import Avatar from '@/components/common/Avatar';
import { Card, CardBody, Table, Tooltip } from 'reactstrap';
import { placeHolderImage } from '../../../../data/CommonPath';
import { useContext, useState } from 'react';
import RefundModal from './RefundModal';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';

const DetailsTable = ({ data }) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const { convertCurrency } = useContext(SettingContext);
  const [modal, setModal] = useState('');
  const [storeData, setStoreData] = useState('');
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Card>
        <CardBody>
          <div className='tracking-wrapper table-responsive'>
            <Table className='product-table'>
              <thead>
                <tr>
                  <th scope='col'>{t('image')}</th>
                  <th scope='col'>{t('name')}</th>
                  <th scope='col'>{t('price')}</th>
                  <th scope='col'>{t('quantity')}</th>
                  <th scope='col'>{t('subtotal')}</th>
                  <th scope='col'>{t('refund_status')}</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.length > 0
                  ? data?.products?.map((product, i) => (
                    <tr key={i}>
                      <td className='product-image'>
                        <Avatar
                          data={
                            product?.pivot?.variation && product?.pivot?.variation?.variation_image
                              ? product?.pivot?.variation?.variation_image
                              : product?.product_thumbnail
                                ? product?.product_thumbnail
                                : placeHolderImage
                          }
                          name={product?.pivot?.variation ? product?.pivot?.variation?.name : product?.name}
                          customImageClass='img-fluid'
                        />
                      </td>
                      <td>
                        <h6>{product?.pivot?.variation ? product?.pivot?.variation?.name : product?.name}</h6>
                      </td>
                      <td>
                        <h6>{convertCurrency(product?.pivot?.single_price)}</h6>
                      </td>
                      <td>
                        <h6>{product?.pivot?.quantity}</h6>
                      </td>
                      <td>
                        <h6>{convertCurrency(product?.pivot?.subtotal)}</h6>
                      </td>
                      <td>
                        {product?.is_return === 1 && data?.payment_status && data?.payment_status === 'COMPLETED' && data.order_status && data.order_status.slug == 'delivered' &&
                          !product?.pivot?.refund_status ? (
                          <a className="btn btn-md fw-bold text-light theme-bg-color btn-sm d-inline-block" href="javascript:void(0)" onClick={() => onModalOpen(product)}>
                            {t('refund')}
                          </a>) : product.is_return === 0 ? (
                            <span>{t('non_refundable')}</span>
                          ) :
                          product?.pivot?.refund_status ? (
                            <span>{product?.pivot?.refund_status}</span>
                          ) :
                          <>
                            <div className="black-tooltip" id="myDiv" onMouseOver={toggle} onMouseOut={toggle}>
                              {!product?.pivot?.refund_status &&
                                  <a className="btn-theme-outline btn btn-sm d-inline-block disabled">{t('refund')}</a>
                              }
                            </div>
                             <Tooltip placement="bottom" isOpen={isOpen} target="myDiv">
                              {t('enable_after_delivery')}
                           </Tooltip>
                           </>
                        }

                      </td>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <RefundModal modal={modal} setModal={setModal} storeData={storeData} />
    </>
  );
};

export default DetailsTable;

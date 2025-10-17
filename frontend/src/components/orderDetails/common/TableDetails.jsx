import Avatar from '@/components/common/Avatar';
import { Card, CardBody, Table } from 'reactstrap';
import { placeHolderImage } from '../../../data/CommonPath';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import SettingContext from '@/helper/settingContext';

const TableDetails = ({ data }) => {
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  const [modal, setModal] = useState('');
  const [storeData, setStoreData] = useState('');
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };
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
                      </tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TableDetails;

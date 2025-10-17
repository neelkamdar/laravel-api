'use client';
import ProductIdsContext from '@/helper/productIdsContext';
import SettingContext from '@/helper/settingContext';
import Link from 'next/link';
import { useContext } from 'react';
import { placeHolderImage } from '../../data/CommonPath';
import Avatar from '../common/Avatar';
import NoDataFound from '../common/NoDataFound';

const TrendingProduct = ({ dataAPI }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { filteredProduct } = useContext(ProductIdsContext);
  return (
    <div className='section-t-space'>
      <div className='category-menu'>
        <h3>{dataAPI?.main_content?.sidebar?.sidebar_products?.title}</h3>
        {dataAPI?.main_content?.sidebar?.sidebar_products?.product_ids?.length > 0 ? (
          <ul className='product-list'>
            {filteredProduct
              ?.filter((el) => dataAPI?.main_content?.sidebar?.sidebar_products?.product_ids.includes(el.id))
              ?.map((elem) => (
                <li key={elem?.id}>
                  <div className='offer-product'>
                    <Link href={`/product/${elem?.slug}`} className='offer-image'>
                      <Avatar data={elem?.product_thumbnail} placeHolder={placeHolderImage} name={elem?.name} height={80} width={80} />
                    </Link>
                    <div className='offer-detail'>
                      <div>
                        <Link href={`/product/${elem?.slug}`} className='text-title'>
                          <h6 className='name'>{elem?.name}</h6>
                        </Link>
                        <span>{elem?.unit}</span>
                        <div className='vertical-price'>
                          <h6 className='price theme-color'>{convertCurrency(elem?.sale_price)}</h6>
                          {
                            elem?.discount || elem?.discount ? (
                              <del>{convertCurrency(elem?.price)}</del>
                            ) : null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <NoDataFound data={{ customClass: 'no-data-added bg-light', title: 'no_product_found' }} />
        )}
      </div>
    </div>
  );
};

export default TrendingProduct;

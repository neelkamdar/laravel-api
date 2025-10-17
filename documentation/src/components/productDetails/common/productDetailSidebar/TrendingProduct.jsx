import { useContext, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import request from '@/utils/axiosUtils';
import { ProductAPI } from '@/utils/axiosUtils/API';
import { useTranslation } from "react-i18next";
import { useQuery } from '@tanstack/react-query';
import SettingContext from '@/helper/settingContext';
import { useRouter } from 'next/navigation';

const TrendingProduct = ({ productState }) => {
  const router = useRouter()
  const { t } = useTranslation( 'common');
  const { convertCurrency } = useContext(SettingContext);
  const categoryId = useMemo(() => {
    return productState?.product?.categories?.map((elem) => elem?.id);
  }, [productState?.product?.categories]);
  const {
    data: productData,
    refetch: productRefetch,
  } = useQuery({queryKey: [categoryId], queryFn: () => request({ url: ProductAPI, params: { status: 1, trending: 1, category_ids: categoryId?.join() } },router),
    enabled: categoryId?.length > 0,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    categoryId?.length > 0 && productRefetch();
  }, [categoryId]);
  if (productData?.length == 0) return null;
  return (
    <div className='pt-25 section-b-space'>
      <div className='category-menu'>
        <h3>{t('trending_products')}</h3>
        <ul className='product-list product-right-sidebar border-0 p-0'>
          {productData?.slice(0, 4)?.map((elem, i) => (
            <li key={i}>
              <div className='offer-product'>
                <Link href={`/product/${elem?.slug}`} className='offer-image'>
                  {elem?.product_thumbnail?.original_url && <Image src={elem?.product_thumbnail?.original_url} className='img-fluid' alt={elem?.name || ""} height={80} width={80} />}
                </Link>

                <div className='offer-detail'>
                  <div>
                    <Link href={`/product/${elem?.slug}`}>
                      <h6 className='name'>{elem?.name}</h6>
                    </Link>
                    <span>{elem?.unit}</span>
                    <div className='vertical-price'>
                      <h5 className='price theme-color'>
                        {convertCurrency(elem?.sale_price)} 
                        {
                          elem?.discount || elem?.discount ? (
                            <del className='text-content'>{convertCurrency(elem?.price)}</del>
                          ) : null
                        }
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingProduct;

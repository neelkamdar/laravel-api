import React, { useContext } from 'react';
import Link from 'next/link';
import { placeHolderImage } from '../../../../data/CommonPath';
import CategoryContext from '@/helper/categoryContext';
import Avatar from '@/components/common/Avatar';
import { useTranslation } from 'react-i18next';

const CategoryVertical = ({ dataAPI }) => {
  const { t } = useTranslation('common');
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
    <div className='category-menu'>
      <h3>{dataAPI?.main_content?.sidebar?.categories_icon_list?.title}</h3>
      <ul>
        {dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids?.length > 0 ? (
          categoryData
            ?.filter((el) => dataAPI?.main_content?.sidebar?.categories_icon_list?.category_ids.includes(el.id))
            ?.map((elem,i) => (
              <li key={i}>
                <div className='category-list'>
                  <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem?.name} />
                  <h5>
                    <Link href='/'>{elem?.name}</Link>
                  </h5>
                </div>
              </li>
            ))
        ) : (
          <li>
            <div className='category-list'>
              <h5>
                <a>{t('no_category_found')}</a>
              </h5>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CategoryVertical;

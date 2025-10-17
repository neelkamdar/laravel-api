import React, { useContext } from 'react';
import Slider from 'react-slick';
import { collectionCategorySlider } from '../../../data/SliderSettingsData';
import WrapperComponent from '../../common/WrapperComponent';
import Avatar from '../../common/Avatar';
import CategoryContext from '@/helper/categoryContext';
import { placeHolderImage } from '../../../data/CommonPath';
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from 'next/navigation';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import NoDataFound from '@/components/common/NoDataFound';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const CollectionSlider = ({ filter, setFilter }) => {
  const [attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(['attribute', 'price', 'rating', 'sortBy', 'field', 'layout']);
  const { filterCategory } = useContext(CategoryContext);
  const { themeOption } = useContext(ThemeOptionContext);
  const categoryData = filterCategory('product');
  const { t } = useTranslation( 'common');
  const pathname = usePathname();
  const router = useRouter();
  const redirectToCollection = (slug) => {
    let temp = [...filter?.category];
    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...attribute, ...price, ...rating, ...sortBy, ...field, ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...attribute, ...price, ...rating, ...sortBy, ...field, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <WrapperComponent colProps={{ xs: 12 }}>
      {categoryData?.length > 0 ? (
        <div className='slider-7_1 no-space shop-box no-arrow'>
          <Slider {...collectionCategorySlider}>
            {
              categoryData?.filter((data,i)=>themeOption?.collection?.collection_categories_ids?.includes(data?.id))?.map((elem, i) => (
                <div key={i}>
                  <div className={`category-box shop-category-box ${filter?.category?.includes(elem.slug) ? 'active' : ''}`}>
                    <a onClick={() => redirectToCollection(elem?.slug)}>
                      <Avatar data={elem?.category_icon} placeHolder={placeHolderImage} name={elem?.name} height={45} width={187} customeClass={'shop-category-image'} />
                      <div className='category-box-name'>
                        <h6>{elem?.name}</h6>
                      </div>
                    </a>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      ) : (
        <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'no_category_found' }} />
      )}
    </WrapperComponent>
  );
};

export default CollectionSlider;

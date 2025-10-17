'use client';
import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import LayoutSidebar from './layoutSidebar';
import MainCollectionSlider from './collectionSlider';
import CollectionBanner from './collectionBanner';
import CollectionLeftSidebar from './collectionLeftSidebar';
import CollectionOffCanvas from './collectionOffcanvas';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import CollectionRightSidebar from './collectionRightSidebar';
import CollectionNoSidebar from './collectionNoSidebar';

const CollectionContain = () => {
  const [filter, setFilter] = useState({ category: [],brand: [], price: [], attribute: [], rating: [],page:1, sortBy: 'asc', field: 'created_at' });
  const { themeOption } = useContext(ThemeOptionContext);
  const [category, brand, attribute, price, rating, sortBy, field, layout,page] = useCustomSearchParams(['category','brand', 'attribute', 'price', 'rating', 'sortBy', 'field', 'layout','page']);
  const collectionLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;
  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        page: page ? page?.page : 1 ,
        category: category ? category?.category?.split(',') : [],
        brand: brand ? brand?.brand?.split(',') : [],
        attribute: attribute ? attribute?.attribute?.split(',') : [],
        price: price ? price?.price?.split(',') : [],
        rating: rating ? rating?.rating?.split(',') : [],
        sortBy: sortBy ? sortBy?.sortBy : 'asc',
        field: field ? field?.field : 'created_at',
      };
    });
  }, [category,brand, attribute, price, rating, sortBy, field ,page]);

  const isCollectionMatch = {
    collection_category_slider: <MainCollectionSlider filter={filter} setFilter={setFilter} />,
    collection_category_sidebar: <LayoutSidebar filter={filter} setFilter={setFilter} />,
    collection_banner: <CollectionBanner filter={filter} setFilter={setFilter} />,
    collection_offcanvas_filter: <CollectionOffCanvas filter={filter} setFilter={setFilter} />,
    collection_no_sidebar: <CollectionNoSidebar filter={filter} setFilter={setFilter} />,
    collection_left_sidebar: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_right_sidebar: <CollectionRightSidebar filter={filter} setFilter={setFilter} />,
    collection_3_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_4_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_5_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_list: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
  };
  return (
    <>
      <Breadcrumb title={'collection'} subNavigation={[{ name: 'collection' }]} />
      {isCollectionMatch[collectionLayout]}
    </>
  );
};

export default CollectionContain;

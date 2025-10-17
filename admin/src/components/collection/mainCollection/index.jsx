import { useContext, useEffect, useState } from 'react';
import FilterSort from './FilterSort';
import GridBox from './GridBox';
import CollectionProducts from './CollectionProducts';
import OfferBanner from '@/components/parisTheme/OfferBanner';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import FilterBtn from './FilterBtn';
import { useTranslation } from "react-i18next";
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { RiFilterFill } from 'react-icons/ri';

const MainCollection = ({ filter, setFilter, isBanner, isOffcanvas, classicStoreCard, initialGrid = 4, noSidebar, sellerClass ,categorySlug, authorSlug }) => {
  const [grid, setGrid] = useState(initialGrid);
  const { themeOption, setCollectionMobile } = useContext(ThemeOptionContext);
  const { t } = useTranslation( 'common');
  const [layout] = useCustomSearchParams(['layout']);
  useEffect(() => {
    if (layout?.layout == 'collection_3_grid') {
      setGrid(3);
    } else if (layout?.layout == 'collection_4_grid') {
      setGrid(4);
    } else if (layout?.layout == 'collection_5_grid') {
      setGrid(5);
    } else if (layout?.layout == 'collection_list') {
      setGrid('list');
    }
  }, [layout]);
  return (
    <div className={`${sellerClass ? sellerClass : `col-custome-${isOffcanvas || noSidebar ? '12' : '9'}`}`}>
      {classicStoreCard && classicStoreCard}
      {isBanner && themeOption?.collection?.collection_banner_image_url && (
        <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect mb-4' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
      )}
      <div className='show-button'>
        <div className='filter-button-group mt-0'>
          <div className='filter-button d-inline-block d-lg-none' onClick={() => setCollectionMobile((prev) => !prev)}>
            <a>
              <RiFilterFill /> {t('filter_menu')}
            </a>
          </div>
        </div>
        <div className={`top-filter-menu${isOffcanvas ? '-2' : ''}`}>
          <FilterBtn isOffcanvas={isOffcanvas} />
          <FilterSort filter={filter} setFilter={setFilter} />
          <GridBox grid={grid} setGrid={setGrid} />
        </div>
      </div>
      <CollectionProducts filter={filter} grid={grid} setFilter={setFilter} categorySlug={categorySlug} authorSlug={authorSlug} />
    </div>
  );
};

export default MainCollection;

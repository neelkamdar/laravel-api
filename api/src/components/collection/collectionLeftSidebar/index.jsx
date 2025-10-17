import { useContext } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import WrapperComponent from '@/components/common/WrapperComponent';
import OfferBanner from '@/components/parisTheme/OfferBanner';
import CollectionSidebar from '../collectionSidebar';
import MainCollection from '../mainCollection';

const CollectionLeftSidebar = ({ filter, setFilter ,hideCategory ,categorySlug }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      {
        !hideCategory &&
        <WrapperComponent colProps={{ xs: 12 }}>
        {themeOption?.collection?.collection_banner_image_url && (
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
        )}
      </WrapperComponent>
      }      
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
         <CollectionSidebar filter={filter} setFilter={setFilter}  hideCategory  />
         <MainCollection filter={filter} setFilter={setFilter} categorySlug={categorySlug} />
      </WrapperComponent>
    </>
  );
};

export default CollectionLeftSidebar;

import WrapperComponent from "@/components/common/WrapperComponent"
import ImageLink from '@/components/themes/common/imageLink'

const MoscowBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-bg pt-0 overflow-hidden', fluidClass: 'p-0' }} colProps={{ xs: 12 }}>
      <div className='slider-animate skeleton-banner-xl'>
        {dataAPI?.home_banner?.main_banner?.image_url ? <ImageLink classes={{ customHoverClass: 'home-contain rounded-0 p-0' }} imgUrl={dataAPI?.home_banner?.main_banner?.image_url}  elem={dataAPI?.home_banner?.main_banner}  height={800} width={1528}/> : null}
      </div>
    </WrapperComponent>
  );
};

export default MoscowBanner;

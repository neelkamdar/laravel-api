import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import WrapperComponent from "@/components/common/WrapperComponent"
import ImageLink from '@/components/themes/common/imageLink'
import LiveImagePath  from '@/utils/constants';

const TokyoBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section home-section-ratio pt-2', row: 'g-4' }} customCol={true}>
      {dataAPI?.sub_banner_1?.image_url ?
       <SkeletonWrapper classes={{ colProps: { xxl: 3, lg: 4, sm: 6 }, colClass: 'ratio_180 d-sm-block d-none', divClass: 'home-contain rounded skeleton-banner-vertical' }}>
        <ImageLink classes={{ customClass: 'home-contain rounded', customHoverClass: 'h-100 b-top' }} imgUrl={dataAPI?.sub_banner_1?.image_url} ratioImage={true} link={dataAPI?.sub_banner_1}/>
      </SkeletonWrapper> : null}
      {
        dataAPI?.main_banner?.image_url ? <SkeletonWrapper classes={{ colProps: { xxl: 6, lg: 8 }, colClass: 'order-xxl-0 ratio_87', divClass: 'home-contain rounded skeleton-banner-xl' }}>
        <ImageLink classes={{ customClass: 'home-contain rounded', customHoverClass: 'h-100' }} imgUrl={dataAPI?.main_banner?.image_url} ratioImage={true} link={dataAPI?.main_banner} />
      </SkeletonWrapper> : null
      }
      {dataAPI?.sub_banner_2?.image_url ?<SkeletonWrapper
        classes={{ colProps: { xxl: 3, xl: 4, sm: 6 }, colClass: 'ratio_180 custom-ratio d-xxl-block d-lg-none d-sm-block d-none', divClass: 'home-contain rounded skeleton-banner-vertical' }}>
        <ImageLink classes={{ customClass: 'home-contain rounded' ,customHoverClass: 'b-top' }} imgUrl={dataAPI?.sub_banner_2?.image_url}  ratioImage={true} link={dataAPI?.sub_banner_2} />
      </SkeletonWrapper> : null }
      
    </WrapperComponent>
  );
};

export default TokyoBanner;

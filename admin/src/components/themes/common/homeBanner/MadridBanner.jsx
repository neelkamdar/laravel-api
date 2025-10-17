import WrapperComponent from '@/components/common/WrapperComponent';
import ImageLink from '@/components/themes/common/imageLink';

const MadridBanner = ({ dataAPI , skeletonClass}) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-bg pt-0 overflow-hidden', fluidClass: 'p-0' }} colProps={{ xs: 12 }}>
      <div className={`slider-animate skeleton-banner-xl ${skeletonClass}`}>
        <ImageLink classes={{ customClass: 'home-contain rounded-0 p-0' }} imgUrl={dataAPI?.image_url}  ratioImage={false} link={dataAPI} width={2880} height={864} />
      </div>
    </WrapperComponent>
  );
};

export default MadridBanner;
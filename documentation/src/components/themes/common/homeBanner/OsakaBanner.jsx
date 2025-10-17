import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import WrapperComponent from "@/components/common/WrapperComponent"
import ImageLink from '@/components/themes/common/imageLink'

const OsakaBanner = ({ dataAPI }) => {
    return (
        <WrapperComponent classes={{ sectionClass: 'home-section pt-2', row: 'g-4' }} customCol={true}>
            {
                dataAPI?.main_banner?.image_url ?
               <SkeletonWrapper classes={{ colProps: { xl: 9, lg: 8 }, divClass: 'home-contain h-100 skeleton-banner-xl ratio_50' }}>
                    <ImageLink classes={{ customClass: 'home-contain h-100' }} imgUrl={dataAPI?.main_banner?.image_url}  ratioImage={true} link={dataAPI?.main_banner} />
                </SkeletonWrapper> : null
            } 
            {
                dataAPI?.sub_banner_1?.image_url ? <SkeletonWrapper classes={{ colProps: { xl: 3, lg: 4 }, colClass: 'd-lg-inline-block d-none ratio_156', divClass: 'home-contain h-100 skeleton-banner-vertical' }}>
                 <ImageLink classes={{ customClass: 'h-100' }} imgUrl={dataAPI?.sub_banner_1?.image_url} ratioImage={true} link={dataAPI?.sub_banner_1} />
                 </SkeletonWrapper> : null
            }
            
        </WrapperComponent>
    );
};

export default OsakaBanner;

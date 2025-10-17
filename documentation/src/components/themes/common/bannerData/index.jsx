import ImageLink from '@/components/themes/common/imageLink';
import Slider from 'react-slick';
import { BannerSliderOption4 } from '../../../../data/SliderSettingsData';

const BannerData = ({ bannersData,ratioImage, elem, style, height, width, customRatioClass ,bannerClass}) => {
   const bannerOptions = {...BannerSliderOption4,infinite:bannersData?.length > BannerSliderOption4.slidesToShow}
   return (
        <>
                {bannersData?.length && style == "horizontal" &&
                    <div className="banner-slider">
                        <Slider {...bannerOptions}>
                            {bannersData?.map((banner,i) => (
                                banner.status && 
                                <div  className='banner-contain' key={i}>
                                    <ImageLink classes={{ customClass: 'banner-contain' }} customRatioClass={customRatioClass} imgUrl={banner.image_url} ratioImage={ratioImage} link={banner} height={height} width={width} />
                                </div>
                                
                            ))}
                        </Slider>
                    </div>
                }

            {bannersData?.image_url && style == "vertical" &&
                <div className="home-contain hover-effect">
                    <ImageLink classes={{ customClass: 'banner-contain' }} imgUrl={image_url} ratioImage={ratioImage} link={elem}  height={height} width={width}/>
                </div>
            }

            {bannersData?.image_url && style == "full_width" &&
                <ImageLink classes={{ customClass: `banner-contain ${bannerClass ?bannerClass :""} ` }} imgUrl={bannersData?.image_url} ratioImage={ratioImage} link={bannersData} height={height} width={width}/>
            }            
        </>
    );
};

export default BannerData;

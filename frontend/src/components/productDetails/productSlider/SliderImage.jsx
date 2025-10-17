import WrapperComponent from '@/components/common/WrapperComponent';
import Image from 'next/image';
import Slider from 'react-slick';
import { productDetailTopSlider } from '../../../data/SliderSettingsData';

import { useTranslation } from "react-i18next";
import { useContext, useEffect, useRef, useState } from 'react';
import { RiMusic2Line, RiVideoLine } from 'react-icons/ri';

const SliderImage = ({ productState }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [videType, setVideType] = useState(['video/mp4', 'video/webm', 'video/ogg']);
  const [audioType, setAudioType] = useState(['audio/mpeg', 'audio/wav', 'audio/ogg']);
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);
  const { t } = useTranslation('common');
  return (
    <WrapperComponent colProps={{ xs: 12 }}>
      <div className='slider-3-product product-wrapper product-section position-relative'>
        <div className='product-main-1'>
          {productState?.product?.is_sale_enable ? (
            <div className='product-label-tag'>
              <span>{t('sale')}</span>
            </div>
          ) : productState?.product?.is_featured ? (
            <div className='product-label-tag warning-label-tag'>
              <span>{t('featured')}</span>
            </div>
          ) : null}
          <Slider {...productDetailTopSlider}>
          {productState?.product?.product_galleries?.map((image, i) => (
                <div key={i}>
                  <div className='slider-image position-relative'>
                    {videType.includes(image.mime_type) ? (
                      <>
                        <video className="w-100 " controls>
                          <source src={image ? image?.original_url : ''} type={image?.mime_type}></source>
                        </video>
                      </>
                    ) : audioType.includes(image?.mime_type) ? (
                      <div className="slider-main-img">
                        <audio controls>
                          <source src={image ? image.original_url : ''} type={image.mime_type}></source>
                        </audio>
                      </div>
                    ) : image?.original_url &&
                    <Image src={image?.original_url} className='img-fluid' alt={image?.name || ""} height={264} width={264}/>
                    }
                  </div>
                </div>
              ))}
            {/* {productState?.product?.product_galleries?.map((elem, i) => (
              <div key={i}>
                <div className='product-slider-image'>
                  {elem?.original_url && <Image src={elem?.original_url} alt={elem?.name || ""} className='img-fluid' height={264} width={264} />}
                </div>
              </div>
            ))} */}
          </Slider>
        </div>
      </div>
    </WrapperComponent>
  );
};

export default SliderImage;

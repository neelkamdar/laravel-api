import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { RiVideoLine } from 'react-icons/ri';
import Slider from 'react-slick';
import { Col } from 'reactstrap';
import { placeHolderImage } from '../../../../../data/CommonPath';
import { viewModalSliderOption } from '../../../../../data/SliderSettingsData';

const LeftSideModal = ({ cloneVariation, productObj }) => {
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
  return (
    <Col lg='6'>
      <div className='view-image-slider'>
        <Slider asNavFor={nav2} adaptiveHeight={true} ref={(slider) => (slider1.current = slider)}>
          {cloneVariation?.product?.product_galleries?.map((item, i) => (
            <div className='slider-image' key={i}>
              {videType.includes(item.mime_type) ? (
                <video className="w-100 " controls>
                  <source src={item ? item?.original_url : ''} type={item?.mime_type}></source>
                </video>
              ) : audioType.includes(item?.mime_type) ? (
                <div className="slider-main-img">
                  <audio controls>
                    <source src={item ? item.original_url : ''} type={item.mime_type}></source>
                  </audio>
                </div>
              ) : (
                item?.original_url && <Image src={item ? item?.original_url : placeHolderImage} className='img-fluid' alt={cloneVariation?.product?.name || ""} width={500} height={500} />
              )}

            </div>
          ))}
        </Slider>
      </div>
      <div className="thumbnail-slider">
        <Slider {...viewModalSliderOption} adaptiveHeight={true} slidesToShow={3} asNavFor={nav1} ref={(slider) => (slider2.current = slider)}>
          {cloneVariation?.product?.product_galleries?.map((item, i) => (
            <div className='slider-image' key={i}>
              <div className="thumbnail-image">
                {videType.includes(item.mime_type) ? (
                  <>
                    <div className="video-icon">
                      <RiVideoLine />
                    </div>
                    <video className="w-100 " controls>
                      <source src={item ? item?.original_url : ''} type={item?.mime_type}></source>
                    </video>
                  </>
                ) : audioType.includes(item?.mime_type) ? (
                  <div className="slider-main-img">
                    <audio controls>
                      <source src={item ? item.original_url : ''} type={item.mime_type}></source>
                    </audio>
                  </div>
                ) : (
                  item?.original_url && <Image src={item ? item?.original_url : placeHolderImage} className='img-fluid' alt={cloneVariation?.product?.name || ""} width={500} height={500} />
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/*>
       
       */}
    </Col>
  );
};

export default LeftSideModal;

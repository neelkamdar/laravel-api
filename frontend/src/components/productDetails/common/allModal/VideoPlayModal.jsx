import CustomModal from '@/components/common/CustomModal';
import { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Col, Row } from 'reactstrap';
import { productDetailSlider } from '../../../../data/SliderSettingsData';

const VideoPlayModal = ({ modal, setModal, productState }) => {
    const [state, setState] = useState({ nav1: null, nav2: null });
    const [videType, setVideType] = useState(['video/mp4', 'video/webm', 'video/ogg']);
    const [audioType, setAudioType] = useState(['audio/mpeg', 'audio/wav', 'audio/ogg']);
    const [type, setType] = useState("img")
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
        <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: 'theme-modal modal-lg audio-video-modal', title: 'Preview Image' }}>
            <div className="modal-media">
                {productState?.product?.preview_type === 'video' ? (
                    <video width="1000" height="590" controls>
                        <source src={productState?.product?.preview_video_file ? productState?.product?.preview_video_file?.original_url : ''} type={productState?.product?.preview_video_file?.mime_type} />
                    </video>
                ) : productState?.product?.preview_type === 'audio' ? (
                    <audio controls>
                        <source src={productState?.product?.preview_video_file ? productState?.product?.preview_video_file?.original_url : ''} type={productState?.product?.preview_video_file?.mime_type} />
                    </audio>
                ) :
                    type === 'img' &&
                    <ul>
                        <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
                            {productState?.product?.product_galleries?.map((image, i) => (
                                <div key={i}>
                                    <div className='slider-image'>
                                        {videType.includes(image.mime_type) ? (
                                            <video className="w-100" controls>
                                                <source src={image ? image?.original_url : ''} type={image?.mime_type}></source>
                                            </video>
                                        ) : audioType.includes(image?.mime_type) ? (
                                            <div className="slider-main-img">
                                                <audio controls>
                                                    <source src={image ? image.original_url : ''} type={image.mime_type}></source>
                                                </audio>
                                            </div>
                                        ) :
                                            image?.original_url && <Image src={image?.original_url} alt={image?.name || ""} zoom="200" className='img-fluid' height={400} width={400} />
                                        }
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </ul>
                }
            </div>
        </CustomModal>
    );
};

export default VideoPlayModal;

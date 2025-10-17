'use client';
import Breadcrumb from '@/components/common/Breadcrumb';
import WrapperComponent from '@/components/common/WrapperComponent';
import { Col } from 'reactstrap';
import { useTranslation } from "react-i18next";
import orderTracking from '../../../public/assets/images/inner-page/order-tracking.svg';
import TrackingForm from './TrackingForm';
import Image from 'next/image';

const TrackingData = ({ params }) => {
    
    const { t } = useTranslation('common');
    return (
        <>
            <Breadcrumb title={'order_tracking'} subNavigation={[{ name: 'order_tracking' }]} />
            <WrapperComponent classes={{ sectionClass: 'log-in-section section-b-space d-block' }} customCol={true}>
                <Col xxl={6} xl={5} lg={6} className='d-lg-block d-none ms-auto'>
                    <div className='image-contain'>
                        {orderTracking && <Image src={orderTracking} className='img-fluid' alt='orderTracking' height={465} width={550} />}
                    </div>
                </Col>
                <Col xxl={4} xl={5} lg={6} sm={8} className='mx-auto'>
                    <div className="log-in-box">
                        <div className="log-in-title">
                            <h3>{t('order_tracking')}</h3>
                            <p>{t('order_tracking_description')}</p>
                        </div>
                        <div className='input-box'>
                            <TrackingForm />
                        </div>
                    </div>
                </Col>
            </WrapperComponent>
        </>
    );
};

export default TrackingData;

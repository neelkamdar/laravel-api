import WrapperComponent from '@/components/common/WrapperComponent';
import Image from 'next/image';

const ServiceBanner = ({ serviceData }) => {
    return (
        <WrapperComponent classes={{ sectionClass: 'service-section' }} noRowCol={true}>
            <div className="row g-3 row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2">
                {serviceData?.map((service, i) => (
                    <div key={i}>
                        <div className="service-contain-2">
                        {service.image_url && <Image src={service.image_url} className="icon-width" alt={service?.sub_title || ""}  height={45} width={45}/>}
                            <div className="service-detail">
                                <h3>{service?.title}</h3>
                                <h6 className="text-content">{service?.sub_title}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </WrapperComponent>
    );
};

export default ServiceBanner;

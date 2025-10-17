import { Col, Row } from 'reactstrap';
import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import WrapperComponent from "@/components/common/WrapperComponent"
import ImageLink from '@/components/themes/common/imageLink'
import LiveImagePath  from '@/utils/constants';

const RomeBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section-2 home-section-small section-b-space' }} noRowCol={true} style={{ backgroundImage: `url(${dataAPI?.bg_image_url})` }}>
      <Row className='g-4'>
        {
          dataAPI?.main_banner?.image_url ?
            <SkeletonWrapper classes={{ colProps: { xxl: 6, md: 8 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
              <ImageLink classes={{ customClass: 'home-contain h-100' }} imgUrl={dataAPI?.main_banner?.image_url} ratioImage={true} link={dataAPI?.main_banner} />
            </SkeletonWrapper>
            : null
        }
        {
          dataAPI?.sub_banner_1?.image_url ?
            <SkeletonWrapper classes={{ colProps: { xxl: 3, md: 4 }, colClass: 'ratio_medium d-md-block d-none', divClass: 'home-contain home-small h-100 skeleton-banner-vertical' }}>
              <ImageLink classes={{ customClass: 'home-contain home-small h-100', customHoverClass: 'h-100' }} imgUrl={dataAPI?.sub_banner_1?.image_url} ratioImage={true} link={dataAPI?.sub_banner_1} />
            </SkeletonWrapper>
            : null
        }



        <Col xxl={3} className='ratio_65 d-xxl-block d-none'>
          <Row className='g-3'>
            {
              dataAPI?.sub_banner_2.image_url ? <SkeletonWrapper classes={{ colProps: { xxl: 12, sm: 6 }, divClass: 'home-contain skeleton-banner-sm' }}>
                <ImageLink classes={{ customClass: 'home-contain' }} customRatioClass='img-fluid' imgUrl={dataAPI?.sub_banner_2.image_url} ratioImage={true} link={dataAPI?.sub_banner_2.image_url} />
              </SkeletonWrapper> : null
            }
            {
              dataAPI?.sub_banner_3.image_url ?
                <SkeletonWrapper classes={{ colProps: { xxl: 12, sm: 6 }, divClass: 'home-contain skeleton-banner-sm' }}>
                  <ImageLink classes={{ customClass: 'home-contain' }} imgUrl={dataAPI?.sub_banner_3.image_url} ratioImage={true} link={dataAPI?.sub_banner_3.image_url} />
                </SkeletonWrapper>
                : null
            }
          </Row>
        </Col>
      </Row>
    </WrapperComponent>
  );
};

export default RomeBanner;

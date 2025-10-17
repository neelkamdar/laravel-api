import { Col, Row } from 'reactstrap';
import WrapperComponent from '@/components/common/WrapperComponent';
import ImageLink from '@/components/themes/common/imageLink'
import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import  LiveImagePath  from '@/utils/constants';

const ParisBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent classes={{ sectionClass: 'home-section pt-2', row: 'g-4' }} customCol={true}>
      {
        dataAPI?.home_banner?.main_banner?.image_url ?
          <SkeletonWrapper classes={{ colProps: { xl: 8 }, colClass: 'ratio_65', divClass: 'home-contain h-100 skeleton-banner-xl' }}>
            <ImageLink
              classes={{ customClass: 'home-contain h-100', customHoverClass: 'h-100 b-left' }}
              imgUrl={dataAPI?.home_banner?.main_banner?.image_url}
              ratioImage={true}
              link={dataAPI?.home_banner?.main_banner}
            />
          </SkeletonWrapper> : null
      }


      <Col xl={4} className='ratio_65'>
        <Row className='g-4'>
          {dataAPI?.home_banner?.sub_banner_1?.image_url ? <SkeletonWrapper classes={{ colProps: { xl: 12, md: 6 }, colClass: 'skeleton-banner-sm', divClass: 'home-contain' }}>
            <ImageLink classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_1?.image_url} ratioImage={true} link={dataAPI?.home_banner?.sub_banner_1} />
          </SkeletonWrapper> : null}

          {dataAPI?.home_banner?.sub_banner_2?.image_url ? <SkeletonWrapper classes={{ colProps: { xl: 12, md: 6 }, colClass: 'skeleton-banner-sm', divClass: 'home-contain' }}>
            <ImageLink classes={{ customHoverClass: 'home-contain' }} imgUrl={dataAPI?.home_banner?.sub_banner_2?.image_url} ratioImage={true} link={dataAPI?.home_banner?.sub_banner_2} />
          </SkeletonWrapper> : null}

        </Row>
      </Col>
    </WrapperComponent>
  );
};

export default ParisBanner;

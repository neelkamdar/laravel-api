import { Col } from "reactstrap";
import SkeletonWrapper from '@/components/common/SkeletonWrapper';
import WrapperComponent from "@/components/common/WrapperComponent"
import ImageLink from '@/components/themes/common/imageLink'


const BerlinBanner = ({ dataAPI }) => {
  return (
    <WrapperComponent
      classes={{ sectionClass: "home-section pt-2 ratio_50", row: "g-4" }}
      customCol={true}
    >
      {dataAPI?.main_banner?.image_url ?
        <SkeletonWrapper classes={{colProps: { xl: 9, lg: 8 },colClass: "ratio_50_1",divClass: "skeleton-banner-xl",}}>
        <ImageLink
          classes={{customHoverClass: "home-contain furniture-contain-2 b-top",}}
          imgUrl={dataAPI?.main_banner?.image_url}
          ratioImage={true}
          link={dataAPI?.main_banner}
        />
      </SkeletonWrapper>
      : null }
      {
        dataAPI?.sub_banner_1?.image_url ?       
        <Col
          xl={3}
          lg={4}
          className="d-lg-inline-block d-none skeleton-banner-vertical"
         >
        <div className="skeleton-text-wrap">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-5"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
        </div>
        <ImageLink
          ratioImage
          classes={{
            customClass: "h-100",
            customHoverClass: "home-contain h-100 home-furniture b-top",
          }}
          ratioImage={true}
          imgUrl={dataAPI?.sub_banner_1?.image_url}
          link={dataAPI?.sub_banner_1}
        />
      </Col> : null }
    </WrapperComponent>
  );
};

export default BerlinBanner;

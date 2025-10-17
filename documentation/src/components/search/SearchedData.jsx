import WrapperComponent from '../common/WrapperComponent';
import { Col, Row } from 'reactstrap';
import NoDataFound from '../common/NoDataFound';
import emptyImage from '../../../..../..//public/assets/svg/empty-items.svg';
import ProductBox from '../common/productBox';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useContext } from 'react';

const SearchedData = ({ data }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <WrapperComponent classes={{ sectionClass: 'section-b-space' }} noRowCol={true}>
      {data?.length > 0 ? (
      <Row xs={2} md={3} xxl={6} className='cols-lg-4 g-3 g-sm-4 product-list-section'>
          {data?.map((product, i) => (
            <Col key={i}>
              <div className='search-product product-wrapper'>
              <div className={`${themeOption?.product?.full_border ? "full_border" : ''} ${themeOption?.product?.image_bg ? "product_img_bg" : ''} ${themeOption?.product?.product_box_bg ? "full_bg" : ''} ${themeOption?.product?.product_box_border ? "product_border" : ''} `}>
                  <ProductBox product={product} className="boxClass" style="horizontal" />
              </div>
              </div>
            </Col>
          ))}
      </Row>
      ) : (
        <NoDataFound data={{ customClass: 'no-data-added', imageUrl: emptyImage, title: "no_product_found", description: 'please_check_misspelt_something_searching_other_way', height: 300, width: 300,}}/>
      )}
    </WrapperComponent>
  );
};

export default SearchedData;

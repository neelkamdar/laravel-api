import React, { useMemo, useContext } from 'react';
import { Col, Row } from 'reactstrap';
import ProductIdsContext from '@/helper/productIdsContext';
import ProductData from '../productData';

const FourColProduct = ({ dataAPI, classes, customRow }) => {

    const { filteredProduct } = useContext(ProductIdsContext);
    const filterTopProducts = useMemo(() => {
        return Object.values(dataAPI).filter((el) => (el?.title && el.status && el.product_ids.length >= 3 ? true : false));
    }, [dataAPI]);

    return (
        <>

            <Row className='g-sm-4 g-3'>
                {dataAPI?.product_slider_1?.status
                    && dataAPI?.product_slider_1?.product_ids?.length &&
                    <Col xl={3}  {...classes?.colClass}>
                        <div className="category-menu">
                            <h3>{dataAPI?.product_slider_1?.title}</h3>
                            <ProductData style='vertical' products={filteredProduct.filter(p => dataAPI?.product_slider_1?.product_ids.includes(p.id))} dataAPI={dataAPI?.product_slider_1} />
                        </div>
                    </Col>
                }
                {dataAPI?.product_slider_2?.status
                    && dataAPI?.product_slider_2?.product_ids?.length &&
                    <Col xl={3}  {...classes?.colClass}>
                        <div className="category-menu">
                            <h3>{dataAPI?.product_slider_2?.title}</h3>
                            <ProductData style='vertical' products={filteredProduct.filter(p => dataAPI?.product_slider_2?.product_ids.includes(p.id))} dataAPI={dataAPI?.product_slider_2} />
                        </div>
                    </Col>
                }
                {dataAPI?.product_slider_3?.status
                    && dataAPI?.product_slider_3?.product_ids?.length &&
                    <Col xl={3}  {...classes?.colClass}>
                        <div className="category-menu">
                            <h3>{dataAPI?.product_slider_3?.title}</h3>
                            <ProductData style='vertical' products={filteredProduct} dataAPI={dataAPI?.product_slider_3} />
                        </div>
                    </Col>
                }
                {dataAPI?.product_slider_4?.status
                    && dataAPI?.product_slider_4?.product_ids?.length &&
                    <Col xl={3}  {...classes?.colClass}>
                        <div className="category-menu">
                            <h3>{dataAPI?.product_slider_4?.title}</h3>
                            <ProductData style='vertical' products={filteredProduct} dataAPI={dataAPI?.product_slider_4} />
                        </div>
                    </Col>
                }
            </Row>
        </>
    );
};

export default FourColProduct;

import WrapperComponent from '@/components/common/WrapperComponent';
import { CompareAPI } from '@/utils/axiosUtils/API';
import { dateFormat } from '@/utils/customFunctions/DateFormat';
import useCreate from '@/utils/hooks/useCreate';
import { usePathname, useRouter } from 'next/navigation';
import { RiHeartLine, RiShuffleLine } from 'react-icons/ri';
import { Col } from 'reactstrap';
import VendorContains from '../common/VendorContains';
import DigitalImage from './DigtitalImage';
import WishlistContext from '@/helper/wishlistContext';
import Cookies from 'js-cookie';
import { useContext, useState } from 'react';
import ProductContent from '../common/ProductContent';
import ProductWholesale from '../common/ProductWholesale';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';

const ProductDigital = ({ productState, setProductState }) => {
const [productWishlist, setProductWishlist] = useState(productState?.product?.is_wishlist)

  const { addToWishlist ,removeWishlist} = useContext(WishlistContext);
  const [category,brand, attribute, price, rating, sortBy, field, layout,theme] = useCustomSearchParams(["category" , "brand", "attribute", "price", "rating", "sortBy", "field", "layout","theme"]);
  const pathname = usePathname();
  const router = useRouter();
  const {  mutate } = useCreate(CompareAPI, false, false, 'Added to Compare List');

  const handelWishlist = () => {
    if (Cookies.get('uaf')) {
      if (!productWishlist) {
        addToWishlist(productState?.product)
        setProductWishlist(prev => !prev) 
      }else{
        removeWishlist(productState?.product?.product_id, productState?.product?.id)
        setProductWishlist(prev => !prev)
      }
    } else {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category ,...theme }).toString();
      const sendPath = `${pathname}?${queryParams}`
      Cookies.set('CallBackUrl', sendPath);
      Cookies.set('wishListID', productObj.id);
      router.push(`/auth/login`);
    }
  };
  const addToCompare = () => {
    if (!Cookies.get('uaf')) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category ,...theme }).toString();
       const sendPath = `${pathname}?${queryParams}`
       Cookies.set('CallBackUrl', sendPath);
       Cookies.set('compareId', productState?.product?.id);
       router.push("/auth/login");
    } else {
      mutate({ product_id: productState?.product?.id });
    }
  };
  return (
    <WrapperComponent classes={{ sectionClass: 'product-section section-b-space theme-product-section', row: 'g-4' }} customCol={true}>
      <Col xl={8} lg={7}>
        <DigitalImage productState={productState} />
      </Col>
      <Col xl={4} lg={5} className='vendor-right-box'>
        <div className="right-box-contain">
          <div className="main-right-box-contain">
            <div className="vendor-box">
              <VendorContains productState={productState} />
              <div className="vendor-detail">
                <p>{productState?.product?.short_description}</p>
              </div>
            </div>

            <ProductContent productState={productState} setProductState={setProductState} />
            <div className="buy-box">
              <a onClick={handelWishlist}>
                <RiHeartLine  className={productWishlist ?"theme-color" :""} />
                <span>{'Add to Wishlist'}</span>
              </a>

              <a onClick={addToCompare} >
                <RiShuffleLine />
                <span>{'Add to Compare'}</span>
              </a>
            </div>

            <div className="pickup-box">
              <div className="product-title">
                <h4>{'Assets Information'}</h4>
              </div>

              <div className="product-info">
                <ul className="product-info-list product-info-list-2">
                  <li>
                    {'Created'} :
                    <a >{dateFormat(productState?.product?.created_at)}
                    </a>
                  </li>
                  {productState.product.updated_at &&
                    <li>{'Last Update '}:
                      <a>{dateFormat(productState?.product?.updated_at)}</a>
                    </li>
                  }

                  {productState?.product?.tags?.length ? (
                    <li className="d-flex align-items-center">
                      <span>{'Tags'} :</span>
                      <ul className="tag-list">
                        {productState?.product?.tags?.map((tag, i) => (
                          <li key={i}>
                            <a>{tag.name}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : null
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
        {!productState?.product?.wholesales?.length ? (
          <>
            <ProductWholesale productState={productState} />
          </>
        ) : null
        }

      </Col >
    </WrapperComponent >
  );
};

export default ProductDigital;

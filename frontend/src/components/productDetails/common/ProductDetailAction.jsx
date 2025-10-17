import React, { useContext, useEffect, useState } from 'react';
import { Input, InputGroup } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import AddToWishlist from '@/components/common/productBox/AddToWishlist';
import AddToCompare from '@/components/common/productBox/AddToCompare';
import AddToCartButton from './AddToCartButton';
import SettingContext from '@/helper/settingContext';
import ProductWholesale from './ProductWholesale';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const ProductDetailAction = ({ productState, setProductState, extraOption , isDisplay=true}) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { handleIncDec, isLoading } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const [totalPrice, settotalPrice] = useState(0)
  const router = useRouter();
  const addToCart = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    setCartCanvas(!cartCanvas)
  };
  const buyNow = () => {
    handleIncDec(productState?.productQty, productState?.product, false, false, false, productState);
    router.push(`/checkout`);
  };
  const updateQty = (qty) => {
    if (1 > productState?.productQty + qty) return;
    setProductState((prev) => {
      return { ...prev, productQty: productState?.productQty + qty }; 
    });
    checkStockAvailable();
    wholesalePriceCal();
  };
  const checkStockAvailable = () => {
    if (productState?.selectedVariation) {
      setProductState((prevState) => {
        const tempSelectedVariation = { ...prevState.selectedVariation };
        tempSelectedVariation.stock_status = tempSelectedVariation.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          selectedVariation: tempSelectedVariation,
        };
      });
    } else {
      setProductState((prevState) => {
        const tempProduct = { ...prevState.product };
        tempProduct.stock_status = tempProduct.quantity < prevState.productQty ? 'out_of_stock' : 'in_stock';
        return {
          ...prevState,
          product: tempProduct,
        };
      });
    }
  };

  const wholesalePriceCal = () => {
    let wholesale = productState?.product?.wholesales?.find(value => value?.min_qty <= productState?.productQty && value?.max_qty >= productState?.productQty) || null

    if (wholesale && productState?.product.wholesale_price_type == 'fixed') {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * wholesale.value } })
    } else if (wholesale && productState?.product.wholesale_price_type == 'percentage') {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * (prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price) } })
      setProductState(prev => { return { ...prev, totalPrice: prev?.totalPrice - (prev?.totalPrice * (wholesale.value / 100)) } })
    } else {
      setProductState(prev => { return { ...prev, totalPrice: prev?.productQty * (prev?.selectedVariation ? prev?.selectedVariation.sale_price : prev?.product.sale_price) } })
    }
  }

  useEffect(() => {
    wholesalePriceCal();
  }, [totalPrice])
  return (
    <>
      
      {productState?.product?.wholesales?.length ? (
        <>
          <ProductWholesale productState={productState} />
          <h4>{'Total Price:'} <span className="theme-color">{convertCurrency(productState?.totalPrice)}</span></h4>
        </>
      ) : null
      }

      {!productState?.product.external_url &&  isDisplay &&
      <div className='note-box product-package'>
        <div className='cart_qty qty-box product-qty'>
          <InputGroup>
            <Btn type='button' className='qty-right-plus' onClick={() => updateQty(-1)}>
              <RiSubtractLine />
            </Btn>
            <Input className='input-number qty-input' type='number' value={productState?.productQty} readOnly />
            <Btn type='button' className='qty-left-minus' onClick={() => updateQty(1)}>
              <RiAddLine />
            </Btn>
          </InputGroup>
        </div>
        {extraOption !== false ? (
          <div className='wishlist-btn-group'>
            <AddToWishlist productObj={productState?.product} customClass={'wishlist-button btn'} />
            <AddToCompare productObj={productState?.product} customClass={'wishlist-button btn'} />
          </div>
        ) : null}
      </div>
      }
      <AddToCartButton productState={productState} isLoading={isLoading} addToCart={addToCart} buyNow={buyNow} extraOption={extraOption} />
    </>
  );
};

export default ProductDetailAction;

import { useContext } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from "react-i18next";
import ThemeOptionContext from '@/helper/themeOptionsContext';

const AddToCartButton = ({ productState, addToCart, isLoading, buyNow, extraOption }) => {
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  const externalProductLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  }
  return (
    <div className='dynamic-checkout'>
      {!productState?.product?.is_external ? (
        <>
          {productState?.product?.type == 'simple' ? (
            <Btn
              className={`${productState?.product?.status === 0 || productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty
                ? 'btn btn-md scroll-button'
                : 'bg-theme btn-md scroll-button'
                }`}
              onClick={addToCart}
              disabled={productState?.product?.status === 0 || productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty}
              loading={Number(isLoading)}>
              {productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty ? null : <RiShoppingCartLine className='me-2' />}
              {productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty ? t('sold_out') : t('add_to_cart')}
            </Btn>
          ) : (
            <Btn
              className={`${productState?.selectedVariation
                ? productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty
                  ? 'btn btn-md scroll-button'
                  : 'bg-theme btn-md scroll-button'
                : 'bg-theme btn-md scroll-button'
                }`}
              disabled={productState?.selectedVariation ? productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty : true}
              onClick={addToCart}
              loading={Number(isLoading)}>
              {productState?.product?.status === 0 || productState?.product?.variations?.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty ? null : <RiShoppingCartLine className='me-2' />}
              {productState?.selectedVariation
                ? productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.selectedVariation?.quantity < productState?.productQty
                  ? t('sold_out')
                  : t('add_to_cart')
                : t('add_to_cart')}
            </Btn>
          )}
          {extraOption !== false ? (
            productState?.product?.type == 'simple' ? (
              <Btn
                className='border-theme-color btn btn-md scroll-button'
                onClick={buyNow}
                disabled={productState?.product?.status === 0 || productState?.product?.stock_status == 'out_of_stock' || productState?.product?.quantity < productState?.productQty ? true : false}
                // loading={Number(isLoading)}
                >
                {t('buy_now')}
              </Btn>
            ) : (
              <Btn
                className='border-theme-color btn btn-md scroll-button'
                onClick={buyNow}
                disabled={productState?.product?.status === 0 || productState?.product?.variations?.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == 'out_of_stock' || productState?.stock_status == 'out_of_stock' ? true : false}
                // loading={Number(isLoading)}
                >
                {t('buy_now')}
              </Btn>
            )
          ) : null}
        </>) : <Btn
          className='btn btn-md bg-theme scroll-button'
          onClick={externalProductLink(productState.product.external_url)}
          // loading={Number(isLoading)}
          >
        {productState?.product?.external_button_text ? productState?.product?.external_button_text : t('buy_now')}
      </Btn>}
    </div>
  );
};

export default AddToCartButton;
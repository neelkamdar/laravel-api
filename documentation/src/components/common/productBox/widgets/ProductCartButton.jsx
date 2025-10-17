import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Input } from 'reactstrap';
import { useTranslation } from "react-i18next";
import Btn from '@/elements/buttons/Btn';
import CartContext from '@/helper/cartContext';
import VariationModal from '../productBox1/variationModal';
import { RiAddLine, RiSubtractLine, FiShoppingCart } from 'react-icons/ri';
import ThemeOptionContext from '@/helper/themeOptionsContext';

const ProductCartButton = ({ productObj, text, iconClass }) => {
    const { cartProducts, handleIncDec } = useContext(CartContext);
    const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
    const [variationModal, setVariationModal] = useState('');
    const { t } = useTranslation('common');
    const [productQty, setProductQty] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const getSelectedVariant = useMemo(() => {
        return cartProducts.find((elem) => elem.product_id === productObj?.id);
    }, [cartProducts]);
    useEffect(() => {
        if (cartProducts.length > 0) {
            const foundProduct = cartProducts.find((elem) => elem?.product_id === productObj?.id);
            if (foundProduct) {
                setIsOpen(true);
                setProductQty(foundProduct.quantity); // Use the quantity from the found product directly
            } else {
                setProductQty(0);
                setIsOpen(false);
            }
        } else {
            setProductQty(0);
            setIsOpen(false);
        }
    }, [cartProducts]);

    const externalProductLink = (link) => {
        if (link) {
            window.open(link, "_blank");
        }
    }

    return (
        <>
            {productObj?.stock_status == 'in_stock' ? (
                <Btn id={`add-to-cart'+${productObj.id}`}
                    className="btn btn-add-cart addcart-button"
                    disabled={productObj?.stock_status !== 'in_stock' ? true : false}
                    onClick={() => {
                        productObj.external_url ? window.open(productObj.external_url, "_blank") : productObj?.stock_status == 'in_stock' && productObj?.type === 'classified' ? setVariationModal(productObj?.id) : handleIncDec(1, productObj, productQty, setProductQty, setIsOpen),
                        productObj?.type === 'classified' ? setVariationModal(productObj?.id) : setCartCanvas(!cartCanvas)  
                    }}>

                    {iconClass ? (
                        <RiAddLine />

                    ) : text
                    }
                </Btn >
            ) :
                <Btn id={`out-of-stock'+${productObj.id}`}
                    className="btn btn-add-cart addcart-button"
                    disabled={productObj?.stock_status !== 'in_stock' ? true : false}>
                    {iconClass ? (
                        <RiAddLine />

                    ) : text ? 'sold_out' : ''}
                </Btn >

            }

            {productQty > 0 &&
                <div className={`cart_qty qty-box ${isOpen && productQty >= 1 ? 'open' : ''}`}>
                    <div className="input-group">
                        <Btn type='button' className='qty-left-minus' onClick={() => handleIncDec(-1, productObj, productQty, setProductQty, setIsOpen, getSelectedVariant ? getSelectedVariant : null)}>
                            <RiSubtractLine></RiSubtractLine>
                        </Btn>
                        <Input className='form-control input-number qty-input' type='text' name='quantity' value={productQty} readOnly />
                        <Btn type='button' className='qty-right-plus' onClick={() => { handleIncDec(1, productObj, productQty, setProductQty, setIsOpen, getSelectedVariant ? getSelectedVariant : null) }}>
                            <RiAddLine></RiAddLine>
                        </Btn>
                    </div>
                </div>
            }

            <VariationModal setVariationModal={setVariationModal} variationModal={variationModal} productObj={productObj} />

            {productObj?.is_external ? (
                <Btn id="'add-to-cart'+product.id"
                    className="btn btn-add-cart addcart-button"
                    onClick={() => { externalProductLink(productObj.external_url) }}>
                    {productObj.external_button_text ? productObj.external_button_text : 'buy_now'}
                </Btn >
            ) : ""
            }

        </>

    );
};

export default ProductCartButton;
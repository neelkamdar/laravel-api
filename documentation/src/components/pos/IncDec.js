import React, { useEffect, useState } from 'react'
import { RiAddLine, RiSubtractLine } from 'react-icons/ri'
import { Input } from 'reactstrap'
import Btn from '../../elements/buttons/Btn'
import { ToastNotification } from '../../utils/customFunctions/ToastNotification'

const IncDec = ({ item, deleteMutate, addToCart, values, setFieldValue }) => {
    const [quantity, setQuantity] = useState('')
    useEffect(() => {
        setQuantity(item?.quantity)
    }, [item])

    const incrementDecrement = (value, qty) => {
        const cart = [...values['products']];
        const index = cart.findIndex(item => item.product_id === value.product_id);
        const productQty = cart[index]?.variation ? cart[index]?.variation?.quantity : cart[index]?.product?.quantity;

        if (productQty < cart[index]?.quantity + qty) {
            ToastNotification("error", `You can not add more items than available. In stock ${productQty} items.`)
            return false;
        }
        cart[index].quantity = cart[index]?.quantity + qty;
        if(cart[index].product?.wholesales?.length){ 
            let wholesale = cart[index].product.wholesales.find(value => value.min_qty <= cart[index].quantity && value.max_qty >= cart[index].quantity) || null;
            if(wholesale && cart[index].product.wholesale_price_type == 'fixed') {
                cart[index].sub_total = cart[index].quantity * wholesale.value;
                cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
              } else if(wholesale && cart[index].product.wholesale_price_type == 'percentage') {
                cart[index].sub_total = cart[index].quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
                cart[index].sub_total = cart[index].sub_total - (cart[index].sub_total * (wholesale.value / 100));
                cart[index].wholesale_price = cart[index].sub_total / cart[index].quantity;
              } else {
                cart[index].sub_total = cart[index]?.quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
                cart[index].wholesale_price = null;
              }

         }
        else{
            cart[index].sub_total = cart[index].quantity * (cart[index]?.variation ? cart[index]?.variation?.sale_price : cart[index].product.sale_price);
            cart[index].wholesale_price = null;
        
        }
       
        if (cart[index].quantity < 1) {
            setFieldValue('products', values['products'].filter((elem) => {
                return elem.id !== value.id
            }))
            deleteMutate(value.id)
        }
        let total = values['products'].reduce((prev, curr) => {
            return (prev + Number(curr.sub_total));
        }, 0);
        setFieldValue("total", total)
        setQuantity((prev) => prev + qty)
        let obj = {
            id: value.id,
            product_id: value.product_id,
            variation_id: value?.variation_id ? value?.variation_id : "",
            quantity: qty
        }
        if (cart[index].quantity > 0) {
            addToCart(obj)
        }

    }
    return (
        <div className="qty-box cart_qty">
            <div className="input-group">
                <Btn className="btn btn-primary qty-left-minus" onClick={() => incrementDecrement(item, -1)}>
                    <RiSubtractLine />
                </Btn>
                <Input className="form-control input-number qty-input" type="text" name="quantity" value={quantity} readOnly={true} />
                <Btn className={`btn btn-primary qty-right-plus`} onClick={() => incrementDecrement(item, 1)}>
                    <RiAddLine />
                </Btn>
            </div>
        </div>
    )
}

export default IncDec
import Btn from "@/elements/buttons/Btn";
import { useTranslation } from "react-i18next";

const VariationAddToCart = ({ cloneVariation, setFieldValue, mutate, isLoading }) => {
    const { t } = useTranslation( 'common');
    const addToCart = (allProduct) => {
        if (cloneVariation.selectedVariation) {
            const params = {
                product_id: allProduct?.id,
                variation_id: cloneVariation?.selectedVariation?.id,
                quantity: cloneVariation?.productQty,
            };
            setFieldValue('variation_id', cloneVariation?.selectedVariation?.id)
            mutate(params)
        }else{
          let obj = {
              product_id: allProduct?.id,
              variation_id: "",
              quantity: cloneVariation?.productQty
            }
         mutate(obj)
        }
    }

    return (
        <div className="addtocart_btn">
            {
                cloneVariation?.selectedVariation?.stock_status == 'in_stock' ||  cloneVariation?.product?.stock_status == 'in_stock' && cloneVariation?.product.type === 'simple' ? <Btn onClick={() => addToCart(cloneVariation.product)} className="add-button addcart-button btn buy-button" loading={Number(isLoading)} > {t("add_to_cart")} </Btn> : <Btn disabled={true} className="btn btn-animation disabled">
                    {cloneVariation?.selectedVariation?.stock_status == 'out_of_stock' || cloneVariation?.product.stock_status == 'out_of_stock' ? t("out_of_stock") : t("add_to_cart") }
                </Btn>

            }
        </div>
    )
}

export default VariationAddToCart
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CardBody } from "reactstrap";
import Btn from "../../elements/buttons/Btn";
import SettingContext from "../../helper/settingContext";
import { AddtoCartAPI } from "../../utils/axiosUtils/API";
import IncDec from "./IncDec";
import useDelete from "../../utils/hooks/useDelete";
import useCreate from "../../utils/hooks/useCreate";
import placeHolderImage from "../../../public/assets/images/placeholder.png";

import { useTranslation } from "react-i18next";
import EmptyImage from '../../../public/assets/svg/empty-cart.svg'

const PosDetailCard = ({ values, setFieldValue, initValues }) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const pathname = usePathname();
  const { convertCurrency } = useContext(SettingContext)
  const { mutate: deleteMutate, isLoading: deleteLoader } = useDelete(AddtoCartAPI);
  const { mutate: addToCart, isLoading: addToCartLoader } = useCreate(AddtoCartAPI, false, false, "No");
  useEffect(() => {
    setFieldValue('products', initValues?.products)
    setFieldValue('total', initValues?.total)
  }, [initValues])
  return (
    <CardBody>
      <div className="title-header">
        <h5 className="fw-bold">{t("cart_details")}</h5>
      </div>
      <div className="product-details">
        {!values['products']?.length ? (
          <>
            <div className="empty-cart">
              <Image src={EmptyImage} className="img-fluid" alt="Empty Cart" height={150} width={150} />
              <h4>{t("no_items_in_a_cart")}</h4>
            </div>
          </>
        ) : (
          <>
            <ul className="cart-listing">
              {values['products']?.map((item, i) => (
                <li key={i}>
                  <Image src={item?.variation && item?.variation?.variation_image ? item?.variation?.variation_image?.original_url
                    : item?.product?.product_thumbnail ? item?.product?.product_thumbnail?.original_url
                      : placeHolderImage} className="img-fluid" alt={item?.product?.name || ''} width={70} height={70} />
                  <div className="cart-content">
                    <h4>{item?.variation ? item?.variation?.name : item?.product?.name}</h4>
                    <div>
                      <h5>
                        {item?.variation ? convertCurrency(item?.variation.sale_price) : item?.product && item?.wholesale_price ? convertCurrency(item?.wholesale_price) : convertCurrency(item?.product?.sale_price)}
                      </h5>
                      {pathname !== '/checkout' && <IncDec item={item} deleteMutate={deleteMutate} addToCart={addToCart} values={values} setFieldValue={setFieldValue} />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul className={`summary-total`}>
              <>
                <li>
                  <h4>{t("subtotal")}</h4>
                  <h4 className="price">{convertCurrency(values['total'])}</h4>
                </li>
                <li>
                  <h4>{t("shipping")}</h4>
                  <h4 className="price">{t("cost_at_checkout")}</h4>
                </li>
                <li>
                  <h4>{t("tax")}</h4>
                  <h4 className="price">{t("cost_at_checkout")}</h4>
                </li>
                <li className="list-total">
                  <h4>{t("total")}</h4>
                  <h4 className="price">{convertCurrency(values['total'])}</h4>
                </li>
              </>
            </ul>
            {pathname !== '/checkout' && <Btn
              className="btn btn-animation payment-btn mt-4"
              onClick={() => {
                router.push("/checkout");
                setFieldValue("amount", values["products"].map((item) => item.subtotal).reduce((partialSum, a) => Number(partialSum) + Number(a), 0),
                );
              }}>
              {t("proceed_to_checkout")}
            </Btn>}
          </>
        )}

      </div>
    </CardBody>
  );
};

export default PosDetailCard;

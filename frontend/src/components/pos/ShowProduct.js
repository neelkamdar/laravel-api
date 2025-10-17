import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Col } from "reactstrap";
import { RiAddLine } from "react-icons/ri";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import ProductVariationModal from "./ProductVariationModal";
import useCreate from "../../utils/hooks/useCreate";
import { AddtoCartAPI } from "../../utils/axiosUtils/API";
import SettingContext from "../../helper/settingContext";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import { useTranslation } from "react-i18next";

const ShowProduct = ({ productData, setFieldValue, values }) => {
  
  const { t } = useTranslation( 'common');
  const [modal, setModal] = useState();
  const { convertCurrency, settingObj } = useContext(SettingContext)
  const { data, mutate, isLoading } = useCreate(AddtoCartAPI, false, false, true, (resDta) => {
    setModal(false)
  });
  useEffect(() => {
    // Taking data from API response
    if (data?.data?.items) {
      let productCopy = values['products'] ? [...values['products']] : []
      const index = productCopy.findIndex(item => item.id === data?.data?.items[0].id);
      if (index == -1) {
        let initialTotal = [...values['products'], ...data?.data?.items]?.reduce((prev, curr) => {
          return (prev + +curr.sub_total);
        }, 0);
        setFieldValue("total", initialTotal)
      } else {
        productCopy[index].quantity = productCopy[index]?.quantity + 1;
        productCopy[index].sub_total = productCopy[index].quantity * productCopy[index].product.sale_price;
        let total = values['products']?.reduce((prev, curr) => {
          return (prev + +curr.sub_total);
        }, 0);
        setFieldValue("total", total)
      }
      const cart = values['products']?.map((value, index) => {
        if (value.id == data?.data?.items[0].id) {
          return data?.data?.items[0]
        } else {
          return value
        }
      })
      setFieldValue("products", index !== -1 ? cart : [...values['products'], ...data?.data?.items])
    }
  }, [data, isLoading])
  const addProduct = (singleProduct) => {
    setModal(singleProduct.id);
  }
  return (
    <Col>
      <div className="product-box">
        <div className="product-image">
          <Image src={productData?.product_thumbnail?.original_url ?? placeHolderImage} alt="product Images" className="img-fluid" width={100} height={100} />
        </div>
        <div className="product-detail">
          <h6 className="name name-2 h-100" onClick={() => window.open(`${settingObj?.general?.site_url}/product/${productData.slug}`)}>{productData.name}</h6>          <h6 className="sold weight text-content fw-normal">{productData?.unit}</h6>
          <div className="counter-box">
            <h6 className="sold theme-color">{convertCurrency(productData?.sale_price)}</h6>
            <div className="addtocart_btn">
              {
                productData?.product_type != 'external' ?   productData?.stock_status == 'in_stock'? <Btn onClick={() => addProduct(productData, 1)} className={"add-button addcart-button btn buy-button"} id={productData.type === 'classified' ? "": 'addcartbtn'+productData?.id }>{t('add')} <RiAddLine /></Btn> : <Btn disabled={true} className="add-button addcart-button btn buy-button disabled"> {t('out_of_stock')} </Btn> : <Btn onClick={()=>window.open(productData?.external_url,"_blank")} className="add-button addcart-button btn buy-button">{productData?.external_button_text ?productData.external_button_text : t("buy_now")} </Btn>
              }
            </div>
          </div>
        </div>
      </div>
      <ShowModal  title={"ProductDetails"} open={productData.id == modal} setModal={setModal} modalAttr={{ className: "view-modal modal-lg theme-modal" }}>
        <ProductVariationModal productData={productData} values={values} setFieldValue={setFieldValue} setModal={setModal} mutate={mutate} isLoading={isLoading} />
      </ShowModal>
    </Col>
  );
};

export default ShowProduct;

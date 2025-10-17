
import SettingContext from "@/helper/settingContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import AddToWishlist from "../AddToWishlist";
import Btn from "@/elements/buttons/Btn";
import { RiCloseLine, RiShoppingCartLine } from "react-icons/ri";
import CartContext from "@/helper/cartContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Image from "next/image";
import WishlistContext from "@/helper/wishlistContext";
import VariationModal from '../productBox1/variationModal';
import { placeHolderImage } from '../../../../data/CommonPath';
import ProductRating from "../widgets/ProductRating";

const DigitalProductBox = ({ product, isClose }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  const { handleIncDec, isLoading, cartProducts } = useContext(CartContext);
  const { removeWishlist} = useContext(WishlistContext);
  const [variationModal, setVariationModal] = useState('');
  const [isDigitalProductBox, setIsDigitalProductBox] = useState(true)
  const [productQty, setProductQty] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);
  const addToCart = () => {
    handleIncDec(1, product);
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      const foundProduct = cartProducts.find((elem) => elem?.product_id === product?.id);
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
  return (
    <div className="product-theme-box">
      {product?.is_trending ? (
        <div className="label-tag">
          <span>{t("trending")}</span>
          <FiZap />
        </div>
      ) : null}
      <div className="img-box">
        <a className="bg-size">    
          <Image src={product.product_thumbnail ? product.product_thumbnail.original_url : placeHolderImage} className="bg-img img-fluid" alt="product" width={600} height={600} />
        </a>
        {!isClose && <AddToWishlist productObj={product} customClass={false} />}
        {isClose && (
                    <div className='product-header-top' onClick={() => removeWishlist(product.product_id, product.id)}>
                        <Btn className='wishlist-button close_button'>
                            <RiCloseLine />
                        </Btn>
                    </div>
                )}
      </div>

      <div className="content-box">
        <div className="top-content">
          <Link href={{ pathname: `/product/${product?.slug}`, query: isDigitalProductBox ? { layout: 'product_digital' } : {} }}>
            <h5>{product?.name}</h5>
          </Link>

          <div className="d-block">
            <h6>
              by <a href="#!"> {product?.store?.store_name}</a> in{" "}
              <a href="#!">{product?.categories?.name}</a>
            </h6>
            <div className="product-rating review-rating">
            <ProductRating totalRating={product?.rating_count || 0} />
              <span className="content-color">
                ({product?.rating_count?.toFixed(2) || 0})
              </span>
            </div>
          </div>
        </div>
        <div className="bottom-content">
          <div>
            <span>{product?.orders_count} {t('sales')}</span>
            <h5 className="price">{convertCurrency(product?.sale_price)}</h5>
          </div>

          <div className="btn-grp">
            <Btn id="'add-to-cart'+product.id"
              className={productQty ? 'btn btn-add-cart addcart-button active' : 'btn btn-add-cart addcart-button'}
              onClick={() => {
                product.external_url ? window.open(product.external_url, "_blank") : product?.stock_status == 'in_stock' && product?.type === 'classified' ? setVariationModal(product?.id) : addToCart(), 
                product?.type === 'classified' ? setVariationModal(product?.id) : setCartCanvas(!cartCanvas) 
              }}>
              <RiShoppingCartLine />
            </Btn>
            <Link className="btn" href={{ pathname: `/product/${product?.slug}`, query: isDigitalProductBox ? { layout: 'product_digital' } : {} }}>{t("preview")}</Link>
          </div>

          <VariationModal setVariationModal={setVariationModal} variationModal={variationModal} productObj={product} />
        </div>
      </div>
    </div>
  );
};

export default DigitalProductBox;

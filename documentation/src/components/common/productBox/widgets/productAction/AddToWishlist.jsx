import { useContext, useState } from 'react';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import Btn from '@/elements/buttons/Btn';
import WishlistContext from '@/helper/wishlistContext';
import Cookies from 'js-cookie';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';
import { usePathname, useRouter } from 'next/navigation';

const AddToWishlist = ({ productObj, customClass, hideAction }) => {
  const { addToWishlist ,removeWishlist} = useContext(WishlistContext);
  const [productWishlist, setProductWishlist] = useState(productObj.is_wishlist)
  const [category,brand, attribute, price, rating, sortBy, field, layout,theme] = useCustomSearchParams(["category" , "brand", "attribute", "price", "rating", "sortBy", "field", "layout","theme"]);
  const pathname = usePathname();
  const router = useRouter();
  const handelWishlist = (productObj) => {
    if (Cookies.get('uaf')) {
      if(!productWishlist){
        addToWishlist(productObj)
        setProductWishlist(prev => !prev)
      }else{
        removeWishlist(productObj.product_id, productObj.id)
        setProductWishlist(prev => !prev)
      }
    }else{
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category ,...theme }).toString();
      const sendPath = `${pathname}?${queryParams}`
      Cookies.set('CallBackUrl', sendPath);
      Cookies.set('wishListID', productObj.id);
      router.push(`/auth/login`);
    }
  };
  return (
    <>
     {customClass ? (
        <Btn className={customClass ? customClass : ''} onClick={() => handelWishlist(productObj)}>
         {productWishlist ? <RiHeartFill className="theme-color" /> : <RiHeartLine />}
        </Btn>
      ) : (
        !hideAction?.includes('wishlist') &&
        <li title='Wishlist' onClick={() => handelWishlist(productObj)}>
          <a className={'heart-icon'}>
            {productWishlist ? <RiHeartFill className="theme-color" /> : <RiHeartLine />}
          </a>
        </li>
      )}
    </>
  );
};

export default AddToWishlist;

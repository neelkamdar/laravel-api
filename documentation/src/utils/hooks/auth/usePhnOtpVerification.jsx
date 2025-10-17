import AccountContext from '@/helper/accountContext';
import CartContext from '@/helper/cartContext';
import CompareContext from '@/helper/compareContext';
import WishlistContext from '@/helper/wishlistContext';
import { useMutation } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import request from "../../axiosUtils";
import { CompareAPI, SyncCart, VerifyOTPAPI } from "../../axiosUtils/API";
import useCreate from '../useCreate';

const transformLocalStorageData = (localStorageData) => {
  const transformedData = localStorageData?.map(item => ({
    product_id: item?.product_id,
    variation_id: item?.variation_id || '', 
    quantity:item?.quantity
  }));

  return transformedData
    
};
const LoginHandle = (responseData, router, refetch,compareRefetch,CallBackUrl,mutate,cartRefetch,setShowBoxMessage ,addToWishlist ,compareCartMutate) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set('uaf', responseData.data?.access_token, { path: '/', expires: new Date(Date.now() + 24 * 60 * 6000) });
    const ISSERVER = typeof window === 'undefined';
    if (typeof window !== 'undefined') {
      Cookies.set('account', JSON.stringify(responseData.data));
      localStorage.setItem('account', JSON.stringify(responseData.data));
    }
    Cookies.remove("uc");
    Cookies.remove("up");
    const oldCartValue = JSON.parse(localStorage.getItem('cart'))?.items;
    oldCartValue?.length >0 && mutate(transformLocalStorageData(oldCartValue))
    refetch();
    compareRefetch()
    cartRefetch()
    const wishListID = Cookies.get('wishListID')
    const CompareId = Cookies.get('compareId')
    CompareId ? compareCartMutate({ product_id: CompareId }) : null
    const productObj ={ id : wishListID }
    wishListID ? addToWishlist(productObj) : null
    router.push(`/${CallBackUrl}`);
    Cookies.remove("wishListID")
    Cookies.remove("compareId")
    localStorage.removeItem('cart');
    Cookies.remove("CallBackUrl")
  }else {
    setShowBoxMessage(responseData.response.data.message);
  }
};


const usePhnOtpVerification = (setShowBoxMessage) => {
  const cookieUAT = Cookies.get('uaf');
  const { mutate } = useCreate(SyncCart, false, false, 'No',);
  const { addToWishlist} = useContext(WishlistContext);
  const { mutate:compareCartMutate } = useCreate(CompareAPI, false, false, 'Added to Compare List');
  if (!cookieUAT && Cookies.get('CallBackUrl')== undefined) {
    Cookies.set("CallBackUrl", "");
  }
  const CallBackUrl = Cookies.get('CallBackUrl')
  const { refetch } = useContext(AccountContext);
  const { refetch:cartRefetch } = useContext(CartContext);
  const { refetch:compareRefetch } = useContext(CompareContext);
  const router = useRouter();
    return useMutation({ mutationFn: (data) => request({ url: VerifyOTPAPI, method: "post", data }, router),
    onSuccess: (responseData) => LoginHandle(responseData, router, refetch,compareRefetch,CallBackUrl,mutate,cartRefetch, setShowBoxMessage ,addToWishlist ,compareCartMutate),
  }
)};
export default usePhnOtpVerification;

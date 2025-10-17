import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useCreate from '@/utils/hooks/useCreate';
import { CompareAPI } from '@/utils/axiosUtils/API';
import CompareContext from '@/helper/compareContext';
import Btn from '@/elements/buttons/Btn';
import { RiRefreshLine } from 'react-icons/ri';
import { useCustomSearchParams } from '@/utils/hooks/useCustomSearchParams';

const AddToCompare = ({ productObj, customClass }) => {
  const { compareState, setCompareState } = useContext(CompareContext);
  const cookieUAT = Cookies.get('uaf');
  const router = useRouter();
  const pathname = usePathname();
  const { data, mutate, isLoading } = useCreate(CompareAPI, false, false, 'Added to Compare List');
  const [category,brand, attribute, price, rating, sortBy, field, layout,theme] = useCustomSearchParams(["category" , "brand", "attribute", "price", "rating", "sortBy", "field", "layout","theme"]);

  const addToCompare = (productObj) => {
    if (!cookieUAT) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category ,...theme }).toString();
       const sendPath = `${pathname}?${queryParams}`
       Cookies.set('CallBackUrl', sendPath);
       Cookies.set('compareId', productObj?.id);
      router.push("/auth/login");
    } else {
      mutate({ product_id: productObj?.id });
    }
  };

  useEffect(() => {
    if ((data?.status === 200 || data?.status === 201) && productObj?.id) {
      setCompareState(prev => {
        const alreadyExists = prev.some(p => p.id === productObj.id);
        return alreadyExists ? prev : [...prev, productObj];
      });
    }
  }, [data]); // ✅ not isLoading
  
  return (
    <>
      {customClass ? (
        <Btn className={customClass ?? ''} onClick={() => addToCompare(productObj)}>
          <RiRefreshLine />
        </Btn>
      ) : (
        <li title='Compare' onClick={() => addToCompare(productObj)}>
          <a>
            <RiRefreshLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToCompare;

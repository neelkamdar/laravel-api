import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import NoDataFound from '@/components/common/NoDataFound';

const FooterLink = ({useFull_Link=true}) => {
    const { themeOption } = useContext(ThemeOptionContext);
    const router = useRouter()
    const cookieUAT = Cookies.get("uaf");

    const redirect = (path) => {
        router.push(`/${path}`)
      }
    
    const setPath= (path) => {
        if( path=='compare' || path=='account/dashboard' || path=='account/notifications' || path=='account/wallet' || path=='account/bank-details'
          || path=='account/point' || path=='account/refund' || path=='account/order' || path=='account/addresses' || path == 'wishlist'
        )
        {
          if (!cookieUAT) {
            Cookies.set("CallBackUrl",path);
            redirect('auth/login')
          } else {
            redirect(path)
          }
        }
        else{
        redirect(path)}
      }

    return (
        <>
      {useFull_Link ? ( <ul>
            {themeOption?.footer?.useful_link?.length > 0 ? (
                themeOption?.footer?.useful_link?.map((elem, i) => (
                    <li key={i}>
                        <Link href={`/${elem.value}`} className='text-content text-capitalize'>
                            {elem.name}
                        </Link>
                    </li>
                ))
            ) : (
                <NoDataFound
                    data={{
                        customClass: 'no-data-footer',
                        title: 'no_link_found',
                    }}
                />
            )}
        </ul>):
        <ul>
         {themeOption?.footer?.help_center?.length > 0 ? (
             themeOption?.footer?.help_center?.map((elem, i) => (
                 <li key={i}>
                    <a className='text-content text-capitalize' onClick={() => setPath(elem.value)}>{elem.name}</a>
                 </li>
             ))
         ) : (
             <NoDataFound
                 data={{
                     customClass: 'no-data-footer',
                     title: 'no_link_found',
                 }}
             />
         )}
     </ul>}
     </>
    );
};

export default FooterLink;

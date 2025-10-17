import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { footerMenuItems } from '../../data/FooterData';
import { usePathname } from 'next/navigation';
import CartContext from '@/helper/cartContext';
import { useTranslation } from 'react-i18next';

const MobileMenu = () => {
  
  const pathName = usePathname();
  const [active, setActive] = useState({});
  const { t } = useTranslation( 'common');
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    let newPath = pathName;
    if (pathName) {
      let found = false;
      footerMenuItems?.forEach((footerMenu) => {
        if (footerMenu?.path.toString() == newPath?.toString()) {
          setActive(footerMenu);
          found = true;
        }
      });
      if (!found) {
        setActive(''); // Set to an empty string if the path is not found
      }
    }
  }, [pathName,  footerMenuItems]);
  return (
    <div className='mobile-menu d-md-none d-block mobile-cart'>
      <ul>
        {footerMenuItems.map((data, index) => (
          <li className={`${active?.title == data?.title ? 'active' : ''} ${data.className ? data.className : ''}`} key={index} onClick={() => setActive(data)}>

             {data.path === '/cart' && cartProducts?.length > 0 && (
                <span className='badge'>
                {cartProducts?.length}
                <span className='visually-hidden'>{t('unread_messages')}</span>
              </span>
              )}
            <Link href={`${data.path}`} >
              {active?.title == data?.title ? data.fillIcon : data.lineIcon}
              <span>{data.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;

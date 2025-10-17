import React, { useContext } from 'react';
import Link from 'next/link';
import { RiHomeLine, RiMailLine } from 'react-icons/ri';
import ThemeOptionContext from '@/helper/themeOptionsContext';


const FooterAbout = () => {
    const { themeOption } = useContext(ThemeOptionContext);
    return (
        <div className='footer-logo-contain'>
            {themeOption?.footer?.footer_about && <p>{themeOption?.footer?.footer_about}</p>}

            <ul className='address'>
                {themeOption?.footer?.about_address && (
                    <li>
                        <RiHomeLine />
                        <Link href='https://www.google.com/maps' target='_blank'>
                            {themeOption?.footer?.about_address}
                        </Link>
                    </li>
                )}
                {themeOption?.footer?.about_email && (
                    <li>
                        <RiMailLine />
                        <Link href={`mailto:${themeOption?.footer?.about_email}`}>
                            {themeOption?.footer?.about_email}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default FooterAbout;

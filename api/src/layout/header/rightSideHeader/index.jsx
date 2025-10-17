import React, { useContext, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import HeaderWishList from './HeaderWishList';
import HeaderCart from './HeaderCart';
import HeaderContactUs from './HeaderContactUs';
import HeaderProfile from './HeaderProfile';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import HeaderSearchBar from '../common/HeaderSearchBar';

const RightSideHeader = ({ noContactUs, wishListIcon ,ClassicHeader  }) => {
  const [ searchBarOpen ,setSearchBarOpen] =useState(false)

  const { cartCanvas, setCartCanvas } = useContext(ThemeOptionContext);

  return (
    <div className='rightside-box'>
      <HeaderSearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} ResponsiveSearch ClassicHeader={ClassicHeader} />
      <ul className='right-side-menu'>
        <li className={`right-side ${!ClassicHeader ? "d-xl-none":""} `}>
          <div className='delivery-login-box'>
            <div className='delivery-icon' >
              <div className='search-box' onClick={()=>setSearchBarOpen(prev=>!prev)}>
                <RiSearchLine />
              </div>
            </div>
          </div>
        </li>
        {!noContactUs && <HeaderContactUs />}
        {!ClassicHeader ? <HeaderWishList wishListIcon={wishListIcon} /> :null } 
        <HeaderCart />
        <HeaderProfile />
      </ul>
      <div className={`${cartCanvas ? 'show' : ''}`} onClick={() => setCartCanvas((prev) => !prev)} />
    </div>
  );
};

export default RightSideHeader;
import Cookies from 'js-cookie';
import Link from "next/link";
import { RiHeartLine } from "react-icons/ri";

const HeaderWishList = ({ wishListIcon }) => {
  const cookieUAT = Cookies.get("uaf");

  return (
    <li className="right-side">
      <Link
        href="/wishlist"
        className="btn p-0 position-relative header-wishlist"
        onClick={() => {
          if (!cookieUAT) {
            Cookies.set("CallBackUrl", "wishlist");
          }
        }}
      >
        {wishListIcon ? wishListIcon : <RiHeartLine />}
      </Link>
    </li>
  );
};

export default HeaderWishList;

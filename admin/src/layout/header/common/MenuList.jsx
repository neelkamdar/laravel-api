import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LinkWithImage from "../../../../public/assets/images/menu_banner_3.jpg";
import LinkBox from "./LinkBox";
import MenuSlider from "./MenuSlider";

const MenuList = ({ menu, isOpen, setIsOpen, level }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const cookieUAT = Cookies.get("uaf");

  const redirect = (path) => {
    router.push(`/${path}`);
  };

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
    } else {
      redirect(path);
    }
  };
  return (
    <>
      <li
        className={`${
          menu.link_type == "sub" && menu.child
            ? "nav-item dropdown"
            : "nav-item"
        } ${menu?.badge_text ? "new-nav-item" : ""} ${
          menu.mega_menu ? "dropdown-mega" : ""
        }`}
      >
        {menu.link_type === "sub" && (
          <a
            onClick={() => {
              const temp = isOpen.slice();
              temp[level] = menu.title !== temp[level] && menu.title;
              setIsOpen(temp);
            }}
            className="nav-link dropdown-toggle"
          >
            <span>{menu.title}</span>
            {menu.badge_text && (
              <label className="new-dropdown">{menu.badge_text}</label>
            )}
          </a>
        )}

        {/* {menu.link_type === 'link' && menu.is_target_blank === 0 && menu.path=='/compare' && (

        <a className={`dropdown-item ${isOpen[level] === menu.title ? 'show' : ''}`} 
        onClick={() =>  {
          if (!cookieUAT) {
            Cookies.set("CallBackUrl",menu.path);
          }
        }}>
          xxxx{menu.title}
          {menu.badge_text && <label className={`menu-label ${menu.badge_color}`}>{menu.badge_text}</label>}
        </a>
        )} */}

        {menu.link_type === "link" && menu.is_target_blank === 0 && (
          <a
            className={`dropdown-item ${
              isOpen[level] === menu.title ? "show" : ""
            }`}
            onClick={() => setPath(menu.path)}
          >
            {menu.title}
            {menu.badge_text && (
              <label className={`menu-label ${menu.badge_color}`}>
                {menu.badge_text}
              </label>
            )}
          </a>
        )}

        {menu.is_target_blank === 1 && (
          <a
            className={`dropdown-item ${
              isOpen[level] === menu.title ? "show" : ""
            }`}
            href={menu.path}
          >
            {menu.title}
            {menu.badge_text && (
              <label className={`menu-label ${menu.badge_color}`}>
                {menu.badge_text}
              </label>
            )}
          </a>
        )}
        {menu?.mega_menu === 1 &&
        menu?.child?.length &&
        menu.mega_menu_type !== "link_with_image" ? (
          <div
            className={`dropdown-menu dropdown-menu-2 ${
              isOpen[level] === menu.title ? "show" : ""
            }`}
          >
            <div className="row">
              {menu.mega_menu_type === "side_banner" ? (
                <div className="col-9">
                  <div className="row">
                    {menu?.child?.map((megaMenu, i) => (
                      <div className="dropdown-column col-xl-4 mb-4" key={i}>
                        <LinkBox menu={megaMenu} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                menu?.child?.map((megaMenu, i) => (
                  <div className="dropdown-column  col-xl-3 mb-4" key={i}>
                    <LinkBox menu={megaMenu} />
                  </div>
                ))
              )}
              <MenuSlider menu={menu} />
            </div>
          </div>
        ) : (
          ""
        )}

        {menu?.mega_menu === 1 &&
        menu?.mega_menu_type === "link_with_image" &&
        menu?.child?.length ? (
          <div
            className={`dropdown-menu dropdown-menu-2 dropdown-image  ${
              !isOpen.length
                ? "show"
                : isOpen[level] === menu.title
                ? "show"
                : ""
            }`}
          >
            <div className="dropdown-column">
              {menu?.child.map((imageMenu, i) => (
                <a
                  key={i}
                  className="dropdown-item text-center"
                  onClick={() => redirect(imageMenu.path)}
                >
                  {imageMenu.item_image && (
                    <Image
                      src={
                        imageMenu.item_image
                          ? imageMenu.item_image.original_url
                          : LinkWithImage
                      }
                      className="img-fluid"
                      alt={imageMenu?.title || "menu-image"}
                      height={500}
                      width={500}
                    />
                  )}
                  <span>{imageMenu.title}</span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {menu?.child && !menu.mega_menu && (
          <ul
            className={`dropdown-menu  ${
              isOpen[level] === menu.title ? "show" : ""
            }`}
          >
            {menu.child.map((childMenu, i) => (
              <MenuList
                menu={childMenu}
                key={i}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuList;

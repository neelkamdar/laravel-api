import {
  RiArticleLine,
  RiContactsLine,
  RiCoupon2Line,
  RiListOrdered,
  RiSettings3Line,
  RiStore3Line,
  RiWindowLine,
} from "react-icons/ri";

export const QuickLinksData = [
  {
    title: "add_user",
    path: "/user/create",
    icon: <RiContactsLine />,
    permission: ["user.create"],
  },
  {
    title: "add_product",
    path: "/product/create",
    icon: <RiStore3Line />,
    permission: ["product.create"],
  },
  {
    title: "add_coupon",
    path: "/coupon/create",
    icon: <RiCoupon2Line />,
    permission: ["coupon.create"],
  },
  {
    title: "add_blog",
    path: "/blog/create",
    icon: <RiArticleLine />,
    permission: ["blog.create"],
  },
  {
    title: "all_orders",
    path: "/order",
    icon: <RiListOrdered />,
    permission: ["order.index"],
  },
  {
    title: "settings",
    path: "/setting",
    icon: <RiSettings3Line />,
    permission: ["setting.index"],
  },
  {
    title: "app_settings",
    path: "/app_setting",
    icon: <RiSettings3Line />,
    permission: ["app_setting.index"],
  },
  {
    title: "theme_options",  
    path: "/theme_option",
    icon: <RiWindowLine />,
    permission: ["theme_option.index"],
  },
];

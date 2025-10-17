import {
  RiBankLine,
  RiCoinLine,
  RiFileTextLine,
  RiHomeLine,
  RiNotificationLine,
  RiWalletLine,
  RiMapPinLine,
  RiDownload2Line,
} from "react-icons/ri";

export const sidebarMenu = [
  {
    title: "dashboard",
    icon: <RiHomeLine />,
    id: "dashboard",
    path: "/account/dashboard",
  },
  {
    title: "notifications",
    icon: <RiNotificationLine />,
    id: "notification",
    path: "/account/notifications",
    notification:true
  },
  {
    title: "bank_details",
    icon: <RiBankLine />,
    id: "bank-details",
    path: "/account/bank-details",
  },
  {
    title: "my_wallet",
    icon: <RiWalletLine />,
    id: "wallet",
    path: "/account/wallet",
  },
  {
    title: "earning_points",
    icon: <RiCoinLine />,
    id: "point",
    path: "/account/point",
  },
  {
    title: "my_orders",
    icon: <RiFileTextLine />,
    id: "order",
    path: "/account/order",
  },
  {
    title: "downloads",
    icon: <RiDownload2Line />,
    id: "download",
    path: "/account/downloads",
  },
  {
    title: "refund_history",
    icon: <RiMapPinLine />,
    id: "refund",
    path: "/account/refund",
  },
  {
    title: "saved_address",
    icon: <RiMapPinLine />,
    id: "address",
    path: "/account/addresses",
  },
];

import { RiArrowLeftRightLine, RiHeartLine, RiProfileLine, RiSearchLine, RiShoppingCartLine, RiUser3Line } from 'react-icons/ri';

export const footerUseFulLink = [
  { value: 'order', name: 'your_order' },
  { value: 'account', name: 'your_account' },
  { value: 'track-order', name: 'track_order' },
  { value: 'wishlist', name: 'your_wishlist' },
  { value: 'search', name: 'search' },
  { value: 'faq', name: 'FAQ' },
];

export const optionList = [
  { id: 2,  customClass: 'search-box search-icon', icon: <RiSearchLine /> ,searchIcon:true },
  { id: 3, callBackUrl:true, path: '/compare', icon: <RiArrowLeftRightLine /> },
  { id: 4, callBackUrl:true, path: '/wishlist', customClass: 'swap-icon', icon: <RiHeartLine /> },
  { id: 5, customClass: 'bag-icon', icon: <RiShoppingCartLine />, isBadge: true },
];

export const categoryTags = [
  { id: 1, title: 'ValueOfTheDay', path: '/' },
  { id: 2, title: 'Top50Offers', path: '/' },
  { id: 3, title: 'NewArrivals', path: '/' },
];

export const optionListMinimal = [
  { id: 1, icon: <RiSearchLine />, customClass: 'search-box search-icon' ,searchIcon:true },
  { id: 2,callBackUrl:true, path: '/compare', icon: <RiArrowLeftRightLine /> },
  { id: 3,callBackUrl:true, path: '/wishlist', icon: <RiHeartLine />, customClass: 'swap-icon' },
  { id: 4, icon: <RiShoppingCartLine />, customClass: 'bag-icon', isBadge: true },
];

export const filterPrice = [
  {
    id: 1,
    price: 100,
    text: 'Below',
    value: '100',
  },
  {
    id: 2,
    minPrice: 100,
    maxPrice: 200,
    value: '0-200',
  },
  {
    id: 3,
    minPrice: 200,
    maxPrice: 400,
    value: '200-400',
  },
  {
    id: 4,
    minPrice: 400,
    maxPrice: 600,
    value: '400-600',
  },
  {
    id: 5,
    minPrice: 600,
    maxPrice: 800,
    value: '600-800',
  },
  {
    id: 6,
    minPrice: 800,
    maxPrice: 1000,
    value: '800-1000',
  },
  {
    id: 7,
    price: 1000,
    text: 'Above',
    value: '1000',
  },
];

export const filterSort = [
  {
    value: 'asc',
    label: 'Ascending Order',
  },
  {
    value: 'desc',
    label: 'Descending Order',
  },
  {
    value: 'low-high',
    label: 'Low - High Price',
  },
  {
    value: 'high-low',
    label: 'High - Low Price',
  },
  {
    value: 'a-z',
    label: 'A - Z Order',
  },
  {
    value: 'z-a',
    label: 'Z - A Order',
  },
  {
    value: 'discount-high-low',
    label: '% Off - Hight To Low',
  },
];

export const blogSkeleton = [
  { xs: 6 },
  { xs: 7 },
  { xs: 10 },
  { xs: 9 },
  { xs: 7 },
  { xs: 6 },
  { xs: 7 },
  { xs: 11 },
  { xs: 9 },
  { xs: 7 },
  { xs: 8 },
  { xs: 7 },
  { xs: 11 },
  { xs: 9 },
  { xs: 7 },
  { xs: 6 },
  { xs: 8 },
  { xs: 4 },
  { xs: 9 },
  { xs: 7 },
];

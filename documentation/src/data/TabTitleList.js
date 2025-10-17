import { RiAccountBoxLine, RiAlertLine, RiBankCardLine, RiBankLine, RiCheckboxCircleLine, RiCloseCircleLine, RiComputerLine, RiContactsLine, RiDatabaseLine, RiEarthLine, RiFacebookCircleLine, RiFileList2Line, RiFileListLine, RiGoogleFill, RiGoogleLine, RiImageLine, RiLayoutBottom2Line, RiLayoutTop2Line, RiLineChartLine, RiMailOpenLine, RiPaypalLine, RiPercentLine, RiPhoneLockLine, RiPieChartLine, RiRadioButtonLine, RiRecordCircleLine, RiRefundLine, RiSettingsLine, RiShoppingBasketLine, RiToolsLine, RiTruckLine, RiWallet3Fill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import product01 from "../../public/assets/images/theme-option/product/01.jpg";
import product02 from "../../public/assets/images/theme-option/product/02.jpg";
import product03 from "../../public/assets/images/theme-option/product/04.jpg";
import product04 from "../../public/assets/images/theme-option/product/07.jpg";
import product05 from "../../public/assets/images/theme-option/product/08.jpg";
import product06 from "../../public/assets/images/theme-option/product/09.jpg";
import basicSellerStore from "../../public/assets/images/theme-option/seller/basic-details.png";
import basicSeller from "../../public/assets/images/theme-option/seller/basic.png";
import classicSellerStore from "../../public/assets/images/theme-option/seller/classic-details.png";
import classicSeller from "../../public/assets/images/theme-option/seller/classic.png";
import { default as blog01, default as blogStore1 } from "../../public/assets/images/theme-option/shop/01.jpg";
import blog02 from "../../public/assets/images/theme-option/shop/02.jpg";
import themeOption3 from "../../public/assets/images/theme-option/shop/03.jpg";
import themeOption4 from "../../public/assets/images/theme-option/shop/04.jpg";
import themeOption5 from "../../public/assets/images/theme-option/shop/05.jpg";
import themeOption6 from "../../public/assets/images/theme-option/shop/06.jpg";
import themeOption7 from "../../public/assets/images/theme-option/shop/07.jpg";
import blogStore2 from "../../public/assets/images/theme-option/shop/08.jpg";
import blogStore3 from "../../public/assets/images/theme-option/shop/09.jpg";
import themeOption1 from "../../public/assets/images/theme-option/shop/10.jpg";
import themeOption2 from "../../public/assets/images/theme-option/shop/11.jpg";

export const ProductTabTitleListData = [
  {
    title: "general",
    icon: <RiSettingsLine />,
    inputs: ["product_type", "store_id", "name", "description", "short_description", "description", "tax_id"],
  },
  {
    title: "product_images",
    icon: <RiImageLine />,
    inputs: ["product_thumbnail", "product_thumbnail_id", "size_chart_image", "size_chart_image_id", "product_galleries", "product_galleries_id", "watermark", "watermark_position", "watermark_image_id"],
  },
  {
    title: "inventory",
    icon: <RiFileListLine />,
    inputs: ["type", "stock_status", "sku", "quantity", "price", "discount", "sale_price", "wholesale_price_type", "wholesale_prices", "external_url", "external_button_text"],
  },
  {
    title: "variants",
    icon: <RiDatabaseLine />,
    inputs: ["type", "stock_status", "sku", "quantity", "price", "sale_price", "show_stock_quantity", "discount", "visible_time", "variations", "is_licensable", "is_licensekey_auto", "separator", "license_key"],
  },
  {
    title: "digital_product",
    icon: <RiComputerLine />,
    inputs: ["is_licensable", "is_licensekey_auto", "separator", "license_key", "preview_audio_file_id", "preview_type", "preview_video_file_id", "preview_url"],
  },
  {
    title: "setup",
    icon: <RiToolsLine />,
    inputs: ["is_sale_enable", "sale_starts_at", "sale_expired_at", "unit", "tags", "brand_id", "is_random_related_products", "related_products", "categories", "cross_sell_products", "cross_sell_product_id", "is_all_categories", "is_all_tags", "is_all_author"],
  },
  {
    title: "seo",
    icon: <RiEarthLine />,
    inputs: ["meta_title", "meta_description ", "product_meta_image"],
  },
  {
    title: "shipping",
    icon: <RiTruckLine />,
    inputs: ["is_free_shipping", "is_return", "estimated_delivery_text", "return_policy_text", "weight"],
  },
  {
    title: "status",
    icon: <RiCheckboxCircleLine />,
    inputs: ["is_featured", "safe_checkout", "secure_checkout", "social_share", "encourage_order", "encourage_view", "is_trending", "status"],
  },
];
export const CouponTabTitleListData = [
  {
    title: "general",
    icon: <RiSettingsLine />,
    inputs: ["code", "type", "amount", "status", "is_expired"],
  },
  {
    title: "restriction",
    icon: <RiCloseCircleLine />,
    inputs: ["products", "exclude_products", "min_spend", "max_spend"],
  },
  {
    title: "Usage",
    icon: <RiPieChartLine />,
    inputs: ["is_unlimited", "usage_per_coupon", "usage_per_customer"],
  },
];

export const SettingTabTitleListData = [
  { title: "general", icon: <RiSettingsLine /> },
  { title: "activation", icon: <RiRadioButtonLine /> },
  { title: "wallet_points", icon: <RiWallet3Fill /> },
  { title: "email_configuration", icon: <RiMailOpenLine /> },
  { title: "sms_configuration", icon: <RiMailOpenLine /> },
  { title: "media_configuration", icon: <RiMailOpenLine /> },
  { title: "vendor_commission", icon: <RiPercentLine /> },
  { title: "refund", icon: <RiRefundLine /> },
  { title: "re-captcha", icon: <RiGoogleFill /> },
  { title: "delivery", icon: <TbTruckDelivery /> },
  { title: "payment_method", icon: <RiBankCardLine /> },
  { title: "analytics", icon: <RiLineChartLine /> },
  { title: "maintenance", icon: <RiAlertLine /> },
];

export const ThemeOptionTabTitleListData = [
  { title: "general", icon: <RiSettingsLine /> },
  { title: "header", icon: <RiLayoutTop2Line /> },
  { title: "footer", icon: <RiLayoutBottom2Line /> },
  { title: "collection_layout", icon: <RiShoppingBasketLine /> },
  { title: "product_layout", icon: <RiShoppingBasketLine /> },
  { title: "blog", icon: <RiFileList2Line /> },
  { title: "seller", icon: <RiFileList2Line /> },
  { title: "about_us", icon: <RiContactsLine /> },
  { title: "contact_page", icon: <RiContactsLine /> },
  { title: "404_error_page", icon: <RiAlertLine /> },
  { title: "popup", icon: <RiAlertLine /> },
  { title: "seo", icon: <RiEarthLine /> },
];

export const waterMarkPosition = [
  {
    id: "top-left",
    name: "Top Left",
  },
  {
    id: "top",
    name: "Top",
  },
  {
    id: "top-right",
    name: "Top Right",
  },
  {
    id: "left",
    name: "Left",
  },
  {
    id: "center",
    name: "Center",
  },
  {
    id: "right",
    name: "Right",
  },
  {
    id: "bottom-left",
    name: "Bottom Left",
  },
  {
    id: "bottom",
    name: "Bottom",
  },
  {
    id: "bottom-right",
    name: "Bottom Right",
  },
];

export const SettingPaymentMethodTab = [
  {
    key: "PaypalProvider",
    title: "paypal",
    inputs: ["site_title", "site_tagline", "default_timezone", "default_currency", "default_language", "min_order_amount", "front_site_langauge_direction", "admin_site_langauge_direction", "store_prefix", "copyright"],
  },
  {
    key: "StripeProvider",
    title: "stripe",
    inputs: ["catalog_enable", "maintenance", "vendor_activation", "product_auto_approve", "wallet_enable", "coupon_enable", "stock_product_hide"],
  },
  {
    key: "CcAvenueProvider",
    title: "ccavenue",
    inputs: ["catalog_enable", "maintenance", "vendor_activation", "product_auto_approve", "wallet_enable", "coupon_enable", "stock_product_hide"],
  },
  {
    key: "RazorpayProvider",
    title: "razorpay",
    inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"],
  },
  {
    key: "CashOnDeliveryProvider",
    title: "cod",
    inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"],
  },
  {
    key: "MollieProvider",
    title: "mollie",
    inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"],
  },
  {
    key: "InstaMojoProvider",
    title: "instamojo",
    inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"],
  },
  {
    key: "PhonepeProvider",
    title: "phonepe",
    inputs: ["mail_mailer", "mail_host", "mail_port", "mail_username", "mail_password", "mail_encryption", "mail_from_address", "mail_from_name", "mailgun_domain", "mailgun_secret"],
  },
  {
    key: "bkashProvider",
    title: "bkash",
    inputs: ["title", "status", "app_key", "password", "username", "app_secret", "sandbox_mode"],
  },
  {
    key: "paystackProvider",
    title: "paystack",
    inputs: ["title", "status", "public_key", "secret_key", "sandbox_mode"],
  },
  {
    key: "sslcommerzProvider",
    title: "sslcommerz",
    inputs: ["title", "status", "store_id", "sandbox_mode", "store_password"],
  },
  {
    key: "flutter_waveProvider",
    title: "flutter_wave",
    inputs: ["title", "status", "public_key", "secret_key", "sandbox_mod", "secret_hash"],
  },
  {
    key: "bank_transferProvider",
    title: "bank_transfer",
    inputs: ["title", "status"],
  },
];

export const SettingSMSTab = [
  {
    key: "Twilio",
    title: "Twilio",
    inputs: ["title", "status", "twilio_auth_token", "twilio_number", "twilio_sid"],
  },
];

export const settingAnalyticsTab = [
  { title: "facebook_pixel", icon: <RiFacebookCircleLine /> },
  { title: "google_analytics", icon: <RiGoogleLine /> },
];

export const HeaderOption = [
  {
    id: 1,
    title: "Header 1",
    value: "basic_header",
    dummyImg: "01.png",
    realImg: "1.png",
  },
  {
    id: 2,
    title: "Header 2",
    value: "classic_header",
    dummyImg: "02.png",
    realImg: "2.png",
  },
  {
    id: 3,
    title: "Header 3",
    value: "standard_header",
    dummyImg: "03.png",
    realImg: "3.png",
  },
  {
    id: 4,
    title: "Header 4",
    value: "minimal_header",
    dummyImg: "04.png",
    realImg: "4.png",
  },
];

export const FooterUseFulLink = [
  { id: 1, value: "home", name: "home" },
  { id: 2, value: "collections", name: "collections" },
  { id: 3, value: "about-us", name: "about_us" },
  { id: 4, value: "blogs", name: "blogs" },
  { id: 5, value: "offers", name: "offers" },
  { id: 6, value: "search", name: "search" },
];

export const helpCenter = [
  {
    id: 1,
    name: "My Account",
    value: "account/dashboard",
  },
  {
    id: 2,
    name: "My Orders",
    value: "account/order",
  },
  {
    id: 3,
    name: "Track Order",
    value: "order/tracking",
  },
  {
    id: 4,
    name: "Wishlist",
    value: "wishlist",
  },
  {
    id: 5,
    name: "Compare",
    value: "compare",
  },
  {
    id: 6,
    name: "FAQ's",
    value: "faq",
  },
  {
    id: 7,
    name: "Contact Us",
    value: "contact-us",
  },
];

export const CollectionLayoutOption = [
  {
    id: 1,
    value: "collection_category_slider",
    title: "collection_category_slider",
    img: themeOption1,
  },  
  {
    id: 2,
    value: "collection_category_sidebar",
    title: "collection_category_sidebar",
    img: themeOption2,
  },
  {
    id: 3,
    value: "collection_banner",
    title: "collection_banner",
    img: themeOption3,
  },
  {
    id: 4,
    value: "collection_left_sidebar",
    title: "collection_left_sidebar",
    img: themeOption4,
  },
  {
    id: 5,
    value: "collection_list",
    title: "collection_list",
    img: themeOption5,
  },
  {
    id: 6,
    value: "collection_right_sidebar",
    title: "collection_right_sidebar",
    img: themeOption6,
  },
  {
    id: 7,
    value: "collection_offcanvas_filter",
    title: "collection_offcanvas_filter",
    img: themeOption7,
  },
];

export const ProductLayoutOption = [
  { id: 1, value: "product_images", title: "product_images", img: product01 },
  { id: 2, value: "product_thumbnail", title: "product_thumbnail", img: product02 },
  { id: 3, value: "product_slider", title: "product_slider", img: product03 },
  { id: 4, value: "product_sticky", title: "product_sticky", img: product04 },
  { id: 5, value: "product_tabs", title: "product_tabs", img: product05 },
  { id: 6, value: "product_accordion", title: "product_accordion", img: product06 },
  { id: 7, value: "product_digital", title: "product_digital", img: product06 },
];

export const Product_box_variant = [
  { id: "basic", name: "basic" },
  { id: "premium", name: "premium " },
  { id: "classic", name: "classic" },
  { id: "standard", name: "standard" },
  { id: "digital", name: "digital" },
];
export const BlogStyleOption = [
  { value: "grid_view", title: "grid_view", img: blog01 },
  { value: "list_view", title: "list_view", img: blog02 },
];
export const BlogTypeOption = [
  { value: "left_sidebar", title: "left_sidebar", img: blogStore1 },
  { value: "right_sidebar", title: "right_sidebar", img: blogStore2 },
  { value: "no_sidebar", title: "no_sidebar", img: blogStore3 },
];

export const AccountTab = [
  { title: "profile_setting", icon: <RiAccountBoxLine /> },
  { title: "change_password", icon: <RiPhoneLockLine /> },
];

export const PaymentDetailTab = [
  { title: "bank", icon: <RiBankLine /> },
  { title: "paypal", icon: <RiPaypalLine /> },
];


export const AppSettingsPageTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_list", icon: <RiRecordCircleLine /> },
  { title: "offer_products", icon: <RiRecordCircleLine /> },
  { title: "section_1_products", icon: <RiRecordCircleLine /> },
  { title: "section_2_products", icon: <RiRecordCircleLine /> },
  { title: "coupons", icon: <RiRecordCircleLine /> },
  { title: "section_3_products", icon: <RiRecordCircleLine /> },
  { title: "navigate_button", icon: <RiRecordCircleLine /> },
];


export const ThemeOneHomeHorizontalTab = [{ title: "main_banner" }, { title: "SubBanner1" }, { title: "SubBanner2" }];

export const ThemeOneMainHorizontalTab = [{ title: "left_sidebar" }, { title: "right_content" }];
export const ThemeSevenHorizontalTab = [{ title: "slider" }, { title: "banner" }];
export const ThemeOneMainHorizontalTab2 = [{ title: "left_content" }, { title: "right_sidebar" }];

export const ThemeSixMainHorizontalTab = [{ title: "left_content" }, { title: "right_sidebar" }];

export const ThemeThreeHomeHorizontalTab = [{ title: "main_banner" }, { title: "SubBanner1" }];

export const MainRightSidebarBannerTab = [{ title: "Banner1" }, { title: "Banner2" }];

export const SliderProduct9Title = [{ title: "banner" }, { title: "slider" }];

export const ProductWithDealTab = [{ title: "product_list" }, { title: "deal_of_days" }];

export const SellerDashboardTitles = [{ title: "about" }, { title: "services" }, { title: "steps" }, { title: "selling" }];
export const AboutUsTabTitle = [{ title: "about" }, { title: "clients" }, { title: "team" }, { title: "testimonial" }, { title: "blog" }];
export const popUpTabTitle = [{ title: "newsletter" }, { title: "exit" }];

export const SellerAboutStore = [
  { value: "basic_store", title: "basic_store", img: basicSeller },
  { value: "classic_store", title: "classic_store", img: classicSeller },
];
export const SellerDetailsStore = [
  {
    value: "basic_store_details",
    title: "basic_store_details",
    img: basicSellerStore,
  },
  {
    value: "classic_store_details",
    title: "classic_store_details",
    img: classicSellerStore,
  },
];

export const redirectOptions = [
  { id: "product", name: "product" },
  { id: "collection", name: "collection" },
  { id: "external_url", name: "external_urol" },
];

export const topStoreOption = [
  {
    value: "today",
    name: "today",
  },
  {
    value: "last_week",
    name: "last_week",
  },
  {
    value: "last_month",
    name: "last_month",
  },
  {
    value: "this_year",
    name: "this_year",
  },
];

export const variantStyle = [
  { id: "rectangle", name: "Rectangle" },
  { id: "circle", name: "Circle" },
  { id: "radio", name: "Radio" },
  { id: "dropdown", name: "Dropdown" },
  { id: "image", name: "Image" },
  { id: "color", name: "Color" },
];

export const HomePage4SettingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_image_list", icon: <RiRecordCircleLine /> },
  { title: "value_banners", icon: <RiRecordCircleLine /> },
  { title: "categories_products", icon: <RiRecordCircleLine /> },
  { title: "seller", icon: <RiRecordCircleLine /> },
  { title: "two_column_banners", icon: <RiRecordCircleLine /> },
  { title: "slider_products", icon: <RiRecordCircleLine /> },
  { title: "full_width_banner", icon: <RiRecordCircleLine /> },
  { title: "product_list", icon: <RiRecordCircleLine /> },
  { title: "featured_blogs", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage5SettingTitle = [
  { id:"1", title: "home_banner", icon: <RiRecordCircleLine /> },
  { id:"2", title: "featured_banners", icon: <RiRecordCircleLine /> },
  { id:"3", title: "categories_image_list", icon: <RiRecordCircleLine /> },
  { id:"4", title: "ProductList1", icon: <RiRecordCircleLine /> },
  { id:"5", title: "bank_wallet_offers", icon: <RiRecordCircleLine /> },
  { id:"6", title: "ProductWithDeals", icon: <RiRecordCircleLine /> },
  { id:"7", title: "seller", icon: <RiRecordCircleLine /> },
  { id:"8", title: "full_width_banner", icon: <RiRecordCircleLine /> },
  { id:"9", title: "ProductList2", icon: <RiRecordCircleLine /> },
  { id:"10", title: "ProductList3", icon: <RiRecordCircleLine /> },
  { id:"11", title: "two_column_banners", icon: <RiRecordCircleLine /> },
  { id:"12", title: "ProductList4", icon: <RiRecordCircleLine /> },
  { id:"13", title: "ProductList5", icon: <RiRecordCircleLine /> },
  { id:"14", title: "delivery_banners", icon: <RiRecordCircleLine /> },
  { id:"15", title: "ProductList6", icon: <RiRecordCircleLine /> },
  { id:"16", title: "ProductList7", icon: <RiRecordCircleLine /> },
  { id:"17", title: "featured_blogs", icon: <RiRecordCircleLine /> },
  { id:"18", title: "brands", icon: <RiRecordCircleLine /> },
];

export const HomePage8SettingTitle = [{ title: "main_content", icon: <RiRecordCircleLine /> }];

export const HomePage6SettingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "services_banner", icon: <RiRecordCircleLine /> },
  { title: "main_content", icon: <RiRecordCircleLine /> },
  { title: "full_width_banner", icon: <RiRecordCircleLine /> },
  { title: "products_list", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage9SettingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "column_banner", icon: <RiRecordCircleLine /> },
  { title: "seller", icon: <RiRecordCircleLine /> },
  { title: "slider_products", icon: <RiRecordCircleLine /> },
  { title: "coupon_banner", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "ProductList3", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage2SettingTab = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list", icon: <RiRecordCircleLine /> },
  { title: "coupons", icon: <RiRecordCircleLine /> },
  { title: "FeaturedBanner", icon: <RiRecordCircleLine /> },
  { title: "main_content", icon: <RiRecordCircleLine /> },
  { title: "full_width_banner", icon: <RiRecordCircleLine /> },
  { title: "slider_products", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage3SetttingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list", icon: <RiRecordCircleLine /> },
  { title: "coupons", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "offer_banner", icon: <RiRecordCircleLine /> },
  { title: "seller", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "product_bundles", icon: <RiRecordCircleLine /> },
  { title: "slider_products", icon: <RiRecordCircleLine /> },
  { title: "featured_blogs", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage1SettingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "featured_banners", icon: <RiRecordCircleLine /> },
  { title: "main_content", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];

export const HomePage7SettingTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "coupons", icon: <RiRecordCircleLine /> },
  { title: "slider_products", icon: <RiRecordCircleLine /> },
  { title: "ProductList2", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];
export const cairoHomePageTitle = [
  { title: "home_banner", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list", icon: <RiRecordCircleLine /> },
  { title: "ProductList1", icon: <RiRecordCircleLine /> },
  { title: "categories_icon_list_2", icon: <RiRecordCircleLine /> },
  { title: "slider_product", icon: <RiRecordCircleLine /> },
  { title: "seller", icon: <RiRecordCircleLine /> },
  { title: "categories_products", icon: <RiRecordCircleLine /> },
  { title: "featured_blogs", icon: <RiRecordCircleLine /> },
  { title: "brands", icon: <RiRecordCircleLine /> },
  { title: "newsletter", icon: <RiRecordCircleLine /> },
];
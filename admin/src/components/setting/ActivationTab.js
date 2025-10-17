import CheckBoxField from "../inputFields/CheckBoxField";

const ActivationTab = () => {
  
  return (
    <>
      <CheckBoxField name="[values][activation][multivendor]" title="multivendor" helpertext="*Enable or disable external vendors access to our online store." />
      <CheckBoxField name="[values][activation][store_auto_approve]" title="store_auto_approve" helpertext="*Enable automatic acceptance of vendor products without manual review." />
      <CheckBoxField name="[values][activation][wallet_enable]" title="enable_wallet" helpertext="*Enable the use of wallet balance for payment during checkout." />
      <CheckBoxField name="[values][activation][point_enable]" title="enable_point" helpertext="*Enable the use of points for payment during checkout." />
      <CheckBoxField name="[values][activation][coupon_enable]" title="coupon_enable" helpertext="*Allow customers to use coupons for payment at checkout." />
      <CheckBoxField name="[values][activation][product_auto_approve]" title="product_auto_approve" helpertext="*Admin approval is necessary for new stores, similar to product approval." />
      <CheckBoxField name="[values][activation][stock_product_hide]" title="hide_stock_product" helpertext="*Decide whether to show product stock or not." />
      <CheckBoxField name="[values][activation][guest_checkout]" title="guest_checkout" helpertext="*Allow customers to checkout as guest."  />
      <CheckBoxField name="[values][activation][trek_order]" title="track_order" helpertext="*Allow customers to track their orders."  />
      <CheckBoxField name="[values][activation][login_number]" title="login_number" helpertext="*Enable the SMS login to the user can login with the mobile number in store."  />
      <CheckBoxField name="[values][activation][send_sms]" title="send_sms" helpertext="*Enable the Send SMS to true enables the system to send SMS notifications."  />
      <CheckBoxField name="[values][activation][zone_enable]" title="zone" helpertext="*Enable the Zone setting allows the creation of categories specific to zones and displays products based on their respective zones."  />
      <CheckBoxField name="[values][activation][demo_mode]" title="demo_mode" helpertext="*Enable the demo mode to display the login buttons of admin and vendor."  />
    </>
  );
};

export default ActivationTab;
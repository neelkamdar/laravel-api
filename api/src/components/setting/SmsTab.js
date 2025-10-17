import { useTranslation } from "react-i18next";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import { RiArrowDownSLine, RiArrowUpSLine, RiCopperDiamondLine } from "react-icons/ri";
import { SettingSMSTab } from "@/data/TabTitleList";
import { Fragment, useState } from "react";

const SmsTab = () => {
    const { t } = useTranslation('common');
    const [active, setActive] = useState();
  
    const toggleInputs = ["status", "sandbox_mode"];
    const paymentMethodsProvider = {
        Twilio: {
            twilio: ["title" ,"twilio_sid", "twilio_number", "twilio_auth_token", "status"]
        },
      }
    return (
        <>
            <div className="inside-horizontal-tabs payment-accordion-tab">
                {SettingSMSTab.map((paymentMethod, ind) => (
                    <div className="shipping-accordion-custom" key={ind} index={ind}>
                        <div className="p-3 rule-dropdown d-flex justify-content-between" onClick={() => setActive((prev) => prev !== ind && ind)}>
                            {t(paymentMethod.title)}{active === ind ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </div>
                        {active === ind && (
                            <>{Object?.keys(paymentMethodsProvider[paymentMethod.key]).map((key) => (
                                <div className="shipping-accordion-box" key={key}>
                                    {paymentMethodsProvider[paymentMethod.key][key].map((item) => (
                                        <Fragment key={item}>{toggleInputs.includes(item) ? <CheckBoxField name={`[values][sms_methods][${key}][${item}]`} title={item} /> : <SimpleInputField nameList={[{ name: `[values][sms_methods][${key}][${item}]`, title: item }]} />}</Fragment>
                                    ))}
                                </div>
                            ))
                            }</>
                        )}
                    </div>)
                )}
            </div>

            <div className="instruction-box">
                <div className="instruction-title mt-4">
                    <h4>Here's a breakdown of each SMS key and its purpose:</h4>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Cancel Order SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cancel Order SMS Notification</td>
                                <td>This SMS notification is sent when an order is canceled by either the admin or the consumer.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][cancel_order_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Refund Request SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Refund Request SMS Notification</td>
                                <td>This SMS notification is sent when a consumer requests a product return and refund.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][refund_request_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Withdraw Request SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Withdrawal Request SMS Notification</td>
                                <td>This SMS notification is sent when a vendor requests to withdraw funds from their wallet balance.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][withdraw_request_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Pending Order SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pending Order Reminder SMS Notification</td>
                                <td>This SMS notification is sent when an order has been pending for more than 24 hours.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][pending_order_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Place Order SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Order Placement SMS Notification</td>
                                <td>This SMS notification is sent when a consumer places a new order.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][place_order_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Signup Bonus SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Signup Bonus SMS Notification</td>
                                <td>This SMS notification is sent to notify users about bonus points or rewards received upon signing up.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][cancel_order_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Update Order Status SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Order Status Update SMS Notification</td>
                                <td>This SMS notification is sent to inform consumers about any changes in the status of their order.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][cancel_order_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Update Refund Request SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Refund Request Update SMS Notification</td>
                                <td>This SMS notification is sent to inform consumers about the status of their refund request (approved or rejected).</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][update_refund_request_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Update Withdraw Request SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Withdrawal Request Update SMS Notification</td>
                                <td>This SMS notification is sent to inform vendors about any updates to their withdrawal request (approval or rejection).</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][update_withdraw_request_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive email-table mb-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan={3}>Vendor Register SMS</th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vendor Registration SMS Notification</td>
                                <td>This SMS notification is sent to notify admin when a new vendor registers on the platform.</td>
                                <td> <CheckBoxField name="[values][sms_methods][config][vendor_register_sms]" notitle="true" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SmsTab;
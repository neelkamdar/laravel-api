import useCreate from "@/utils/hooks/useCreate";
import { useTranslation } from "react-i18next";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import CheckBoxField from "../inputFields/CheckBoxField";

  const EmailTab = ({ values ,setFieldValue  }) => { 
    
    const { mutate } = useCreate("notifications/test") 
    const handleNonSubmitButton = () => {
      setFieldValue("submitButtonClicked",true)
      const notificationsTest ={
        email:values?.email,
        mail_encryption:values?.mail_encryption,
        mail_mailer:values?.mail_mailer,
        mail_from_address:values?.values?.email?.mail_from_address,
        mail_from_name:values?.values?.email?.mail_encryption,
        mail_host:values?.values?.email?.mail_host,
        mail_password:values?.values?.email?.mail_password,
        mail_username:values?.values?.email?.mail_username,
        mail_port:values?.values?.email?.mail_port,
        mailgun_domain:values?.values?.email?.mailgun_domain,
        mailgun_secret:values?.values?.email?.mailgun_secret,
      }
      mutate(notificationsTest)
    };
    const { t } = useTranslation( 'common');
    return (
      <>
        <SearchableSelectInput
          nameList={[
            {title: "mailer",name: "mail_mailer",inputprops: {name: "mail_mailer",id: "mail_mailer",options: [{ id: "sendmail", name: "SendMail" },{ id: "smtp", name: "SMTP" },{ id: "mailgun", name: "MailGun" },],},},
          ]}
        />
        {
          values?.['mail_mailer'] == "mailgun" ?
            <SimpleInputField nameList={[{ name: "[values][email][mailgun_domain]", title: "mailgun_domain", placeholder: t("enter_mailgun_domain") },{ name: "[values][email][mailgun_secret]", title: "mailgun_Secret", placeholder: t("enter_mailgun_secret") },]}/>
            :
            <>
              <SimpleInputField nameList={[{ name: "[values][email][mail_host]", title: "host", placeholder: t("enter_host") },{ name: "[values][email][mail_port]", title: "port", placeholder: t("enter_port"), type: "number" }]}/>
              <SearchableSelectInput
                nameList={[
                  {title: "encryption",name: "mail_encryption",inputprops: {
                      name: "mail_encryption",
                      id: "mail_encryption",
                      options: [
                        { id: "ssl", name: "SSL" },
                        { id: "tls", name: "TLS" },
                      ],
                    },
                  },
                ]}
              />
              <SimpleInputField
                nameList={[
                  { name: "[values][email][mail_username]", title: "username", placeholder: t("enter_username") },
                  { name: "[values][email][mail_password]", title: "password", type: "password", placeholder: t("enter_password") },
                  { name: "[values][email][mail_from_name]", title: "email_from_name", placeholder: t("enter_email_from_name") },
                  { name: "[values][email][mail_from_address]", title: "email_from_address", placeholder: t("enter_email_from_address") },

                ]}
              />
            </>
        }
        <hr/>
        <h4 className="fw-semibold mb-3 txt-primary w-100">{t("test_email")}</h4>
        <SimpleInputField nameList={[{ name: "email", title: "to_mail",type:"email", placeholder: t("enter_email") },]}/>
        <button
         type="button"
         title={t("send_email")}
         className="btn btn-animation  ms-auto"
         onClick={handleNonSubmitButton}
        >{t("send_email")}</button>
      <div className="instruction-box">
  <div className="instruction-title">
    <h4>Instruction</h4>
    <p style={{color: 'red'}}>When setting up your email system (SMTP), make sure to do it carefully. If it's not done right, you'll encounter errors when placing orders, registering new users, or sending newsletters.</p>
  </div>
  <div className="list-box">
    <h5>If you're not using SSL:</h5>
    <ul>
      <li>Choose "sendmail" for the Mail Driver if you run into problems with SMTP.</li>
      <li>Use the Mail Host settings provided by your email service's manual.</li>
      <li>Set the Mail port to 587.</li>
      <li>If there are issues with TLS, set the Mail Encryption to SSL.</li>
    </ul>
  </div>
  <div className="list-box">
    <h5>If you're using SSL:</h5>
    <ul>
      <li>Again, choose "sendmail" if there are issues with SMTP.</li>
      <li>Use the Mail Host settings provided by your email service's manual.</li>
      <li>Set the Mail port to 465.</li>
      <li>Set the Mail Encryption to SSL.</li>
    </ul>
  </div>
  <div className="instruction-title mt-4">
    <h4>Here's a list of emails grouped by category and their respective uses:</h4>
  </div>
  <div className="table-responsive email-table mb-4">
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>User Account Management</th>
        </tr>
        <tr>
          <th>Template</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Send a One-Time Password (OTP) to users who request a password reset.</td>
          <td>Email the user a One-Time Password (OTP) when they request a password reset.</td>
          <td><CheckBoxField name="[values][email][password_reset_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Signup Welcome</td>
          <td>Send a welcome email with information about the signup bonus or other perks to new users.</td>
          <td><CheckBoxField name="[values][email][signup_welcome_mail]" title=" " /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-responsive email-table mb-4">
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>User Communication</th>
        </tr>
        <tr>
          <th>Template</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Visitor Inquiry</td>
          <td>Forward visitor messages to admin through email.</td>
          <td><CheckBoxField name="[values][email][visitor_inquiry_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>System Test</td>
          <td>Send a test email to confirm email configuration settings.</td>
          <td><CheckBoxField name="[values][email][system_test_mail]" title=" " /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-responsive email-table mb-4">
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Vendor Management</th>
        </tr>
        <tr>
          <th>Template</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>New Vendor Notification</td>
          <td>Notify admin when a new vendor registers on the platform.</td>
          <td><CheckBoxField name="[values][email][new_vendor_notification_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Withdrawal Request</td>
          <td>Withdrawal Request</td>
          <td><CheckBoxField name="[values][email][withdrawal_request_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Withdrawal Status Update</td>
          <td>Inform vendors when their withdrawal request has been processed and the status (approved or rejected).</td>
          <td><CheckBoxField name="[values][email][withdrawal_status_update_mail]" title=" " /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-responsive email-table mb-4">
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Order Management</th>
        </tr>
        <tr>
          <th>Template</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Order Confirmation</td>
          <td>Notify admin, vendor, and consumer when a new order is placed.</td>
          <td><CheckBoxField name="[values][email][order_confirmation_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Order Cancellation</td>
          <td>Inform admin, vendor, and consumer if an order is canceled.</td>
          <td><CheckBoxField name="[values][email][cancel_order_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Refund Request</td>
          <td>Notify admin and vendor when a consumer requests a product return and refund.</td>
          <td><CheckBoxField name="[values][email][refund_request_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Refund Decision</td>
          <td>Inform consumers about the outcome of their refund request (approved or denied).</td>
          <td><CheckBoxField name="[values][email][refund_status_update_mail]" title=" " /></td>
        </tr>
        <tr>
          <td>Order Status Update</td>
          <td>Notify consumers when the status of their order changes.</td>
          <td><CheckBoxField name="[values][email][order_status_update_mail]" title=" " /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-responsive email-table mb-4">
    <table className="table">
      <thead>
        <tr>
          <th colSpan={3}>Order Monitoring</th>
        </tr>
        <tr>
          <th>Template</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Pending Order Alert</td>
          <td>Notify admin and vendor if an order remains unprocessed for more than 24 hours.</td>
          <td><CheckBoxField name="[values][email][pending_order_alert_mail]" title=" " /></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>                              
      </>
    );
  };

export default EmailTab;

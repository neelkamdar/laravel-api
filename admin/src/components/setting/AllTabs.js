import { Col, TabContent, TabPane } from 'reactstrap'
import ActivationTab from './ActivationTab'
import DeliveyTab from './DeliveyTab'
import EmailTab from './EmailTab'
import GeneralTab from './GeneralTab'
import GoogleReCaptcha from './GoogleReCaptcha'
import MaintenanceTab from './MaintenanceTab'
import MediaConfiguration from './MediaConfiguration'
import PaymentMethodsTab from './PaymentMethodsTab'
import RefundTab from './Refund'
import VendorCommissionTab from './VendorCommissionTab'
import WalletPointTab from './WalletPointTab'
import AnalyticsTab from './AnalyticsTab'
import SmsTab from './SmsTab'

const AllTabs = ({ values, activeTab, setFieldValue, errors, touched }) => {
    return (
        <>
            <Col xl="7" lg="8">
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1"><GeneralTab values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
                    <TabPane tabId="2"><ActivationTab/></TabPane>
                    <TabPane tabId="3"><WalletPointTab /></TabPane>
                    <TabPane tabId="4"><EmailTab errors={errors} touched={touched} setFieldValue={setFieldValue}  values={values} /></TabPane>
                    <TabPane tabId="5"><SmsTab errors={errors} touched={touched} setFieldValue={setFieldValue}  values={values} /></TabPane>
                    <TabPane tabId="6"><MediaConfiguration values={values} /></TabPane>
                    <TabPane tabId="7"><VendorCommissionTab values={values} /></TabPane>
                    <TabPane tabId="8"><RefundTab values={values} /></TabPane>
                    <TabPane tabId="9"><GoogleReCaptcha /></TabPane>
                    <TabPane tabId="10"><DeliveyTab values={values} setFieldValue={setFieldValue} /></TabPane>
                    <TabPane tabId="11"><PaymentMethodsTab errors={errors} touched={touched} /></TabPane>
                    <TabPane tabId="12"><AnalyticsTab values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
                    <TabPane tabId="13"><MaintenanceTab values={values} setFieldValue={setFieldValue} errors={errors} /></TabPane>
                   
                </TabContent>
            </Col>
        </>
    )
}

export default AllTabs
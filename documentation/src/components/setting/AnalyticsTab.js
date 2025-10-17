import TabTitle from '@/components/widgets/TabTitle';
import { useState } from "react";
import { TabContent, TabPane } from "reactstrap";
import { settingAnalyticsTab } from "../../data/TabTitleList";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";

const AnalyticsTab = ({ errors, touched }) => {
  
  const [activeTab, setActiveTab] = useState("1");
  return (
    <>
      <div className="inside-horizontal-tabs">
        <TabTitle activeTab={activeTab} setActiveTab={setActiveTab} titleList={settingAnalyticsTab} errors={errors} touched={touched} />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <SimpleInputField nameList={[{ name: `[values][analytics][facebook_pixel][pixel_id]`, title: "pixel_id" }]} />
            <CheckBoxField name={`[values][analytics][facebook_pixel][status]`} title="status" />
          </TabPane>
          <TabPane tabId="2">
            <SimpleInputField nameList={[{ name: `[values][analytics][google_analytics][measurement_id]`, title: "measurement_id" }]} />
            <CheckBoxField name={`[values][analytics][google_analytics][status]`} title="status" />
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default AnalyticsTab;

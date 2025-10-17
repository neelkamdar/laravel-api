import React, { useContext, useEffect, useState } from "react";
import { RiTruckLine } from "react-icons/ri";
import { Col, Input, Label, Row } from "reactstrap";
import CheckoutCard from "./common/CheckoutCard";
import { useTranslation } from "react-i18next";
import SettingContext from "@/helper/settingContext";

const DeliveryOptions = ({ values, setFieldValue }) => {
  const { t } = useTranslation("common");
  const { settingData } = useContext(SettingContext);
  const [defaultDe, setDefaultDe] = useState(0);
  useEffect(() => {
    if (settingData?.delivery?.default?.title && settingData?.delivery?.default?.description) {
      setFieldValue("delivery_description", `${settingData?.delivery?.same_day?.title} | ${settingData?.delivery?.same_day?.description}`);
      setDefaultDe(1);
    }
  }, [settingData]);

  return (
    <CheckoutCard icon={<RiTruckLine />}>
      <div className="checkout-title">
        <h4>{t("delivery_options")}</h4>
      </div>
      <div className="checkout-detail">
        <Row className="g-4">
          <Col xxl={6}>
            <div className="delivery-option">
              <div className="delivery-category">
                <div className="shipment-detail w-100">
                  <div className="form-check custom-form-check hide-check-box">
                    <Input
                      className="form-check-input"
                      type="radio"
                      name="standard"
                      checked={defaultDe == 1}
                      id="standard1"
                      onChange={() => {
                        setFieldValue("delivery_description", `${settingData?.delivery?.default?.title} | ${settingData?.delivery?.default?.description}`);
                        setFieldValue("isTimeSlot", false);
                        setFieldValue("delivery_interval", null);
                        setDefaultDe(1);
                      }}
                    />
                    <Label className="form-check-label" htmlFor="standard1">
                      {settingData?.delivery?.default?.title} | {settingData?.delivery?.default?.description}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {settingData?.delivery?.same_day_delivery && (
            <>
              <Col xxl={6}>
                <div className="delivery-option">
                  <div className="delivery-category">
                    <div className="shipment-detail w-100">
                      <div className="form-check custom-form-check hide-check-box">
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="standard"
                          id="standard2"
                          checked={defaultDe == 2}
                          onChange={() => {
                            setFieldValue("delivery_description", `${settingData?.delivery?.same_day?.title} | ${settingData?.delivery?.same_day?.description}`);
                            setFieldValue("isTimeSlot", true);
                            setFieldValue("delivery_interval", null);
                            setDefaultDe(2);
                          }}
                        />
                        <Label className="form-check-label" htmlFor="standard2">
                          {settingData?.delivery?.same_day?.title} | {settingData?.delivery?.same_day?.description}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    </CheckoutCard>
  );
};

export default DeliveryOptions;

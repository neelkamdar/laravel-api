import React from "react";
import { Col } from "reactstrap";
import SimpleInputField from "../inputFields/SimpleInputField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import { AllCountryCode } from "../../data/AllCountryCode";
import { useTranslation } from "react-i18next";

const UserContact = () => {

const { t } = useTranslation( 'common');
  
  return (
    <Col sm="6">
      <div className="country-input form-floating">
        <SimpleInputField nameList={[{ name: "phone", type: "number", placeholder: t("enter_phone_number"), require: "true", nolabel: "true" , }]} />
        <SearchableSelectInput
          nameList={[
            {
              name: "country_code",
              notitle: "true",
              inputprops: {
                name: "country_code",
                id: "country_code",
                options: AllCountryCode,
              },
            },
          ]}
        />
      </div>
    </Col>
  );
};

export default UserContact;

import CheckBoxField from "@/components/inputFields/CheckBoxField";
import React from "react";

const SellerPage = ({values,setFieldValue}) => {
  return (
    <>
      <CheckBoxField name={`[content][main_content][seller][status]`} title="status"/>
    </>
  );
};

export default SellerPage;

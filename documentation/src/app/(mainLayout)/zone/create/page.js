'use client'
import ZoneForm from "@/components/zone/ZoneForm";
import { ZoneApi } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";
import React from "react";

const ZoneCreate = () => {
  const { mutate, isLoading } = useCreate(ZoneApi, false, "/zone");
  return (
    <FormWrapper title="add_zone">
      <ZoneForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};
export default ZoneCreate;

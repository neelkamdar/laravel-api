import { ZoneApi } from "@/utils/axiosUtils/API";
import { nameSchema, placePointsSchema, YupObject } from "@/utils/validation/ValidationSchemas";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import SimpleInputField from "../inputFields/SimpleInputField";
import CheckBoxField from "../inputFields/CheckBoxField";
import FormBtn from "@/elements/buttons/FormBtn";
import ZoneMap from "./ZoneMap";
import Loader from "../commonComponent/Loader";
import request from "@/utils/axiosUtils";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const ZoneForm = ({ mutate, updateId, loading, buttonName, language }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [coordinates, setCoordinates] = useState([]);

  const {
    data: oldData,
    isLoading,
    refetch,
  } = useQuery(
    { queryKey: ["zone/id", updateId],
    queryFn: () => request({ url: ZoneApi + "/" + updateId }, router),
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      enabled: !!updateId,
      select: (data) => data?.data,
    }
  );
  useEffect(() => {
    if (updateId && oldData) {
      setCoordinates(oldData.locations || []);
    } else if (!updateId) {
      setCoordinates([]);
    }
  }, [updateId, oldData]);

  if (updateId && isLoading) return <Loader />;

  const handleCoordinatesChange = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: updateId ? oldData?.name : "",
          status: updateId ? Boolean(Number(oldData?.status)) : true,
          place_points: coordinates,
        }}
        validationSchema={YupObject({
          name: nameSchema,
          place_points: placePointsSchema
        })}
        onSubmit={(values) => {
          const updatedValues = {
            ...values,
            status: Number(values.status),
            place_points: coordinates,
            ...(updateId && { _method: "put" }),
          };
          mutate(updatedValues);
        }}
      >
        {() => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              {updateId && <LanguageRedirection id={updateId} path={"/zone"} language={language} />}
              <SimpleInputField
                nameList={[
                  {
                    name: "name",
                    placeholder: t("enter_name"),
                    require: "true",
                  },
                ]}
              />
              <div className="map-top-box">
                <CheckBoxField name="status" />
              </div>
              <div>
                <ZoneMap
                  onCoordinatesChange={handleCoordinatesChange}
                  initialCoordinates={coordinates}
                  updateId={updateId}
                />
              </div>
              <FormBtn loading={loading} buttonName={buttonName} />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ZoneForm;

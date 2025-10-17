import { useQuery } from "@tanstack/react-query";
import request from "../../utils/axiosUtils";
import { country } from "../../utils/axiosUtils/API";
import SearchableSelectInput from "./SearchableSelectInput";
import SimpleInputField from "./SimpleInputField";
import Loader from "../commonComponent/Loader";


import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const AddressComponent = ({ values, noAddress }) => {
  const router = useRouter()
  const { t } = useTranslation( 'common');
  const { data, isLoading } = useQuery({ queryKey: [country], queryFn: () => request({ url: country }, router), refetchOnWindowFocus: false, select: (res) => res.data.map((country) => ({ id: country.id, name: country.name, state: country.state })) });
  if (isLoading) return <Loader />;
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: "country_id",
            require: "true",
            title: "country",
            inputprops: {
              name: "country_id",
              id: "country_id",
              options: data,
              defaultOption: "Select state",
              close: (values['country_id'] !== '') ? true : false
            },
          },
          {
            name: "state_id",
            require: "true",
            title: "State",
            inputprops: {
              name: "state_id",
              id: "state_id",
              options: values["country_id"] ? data.filter((country) => Number(country.id) === Number(values["country_id"]))?.[0]?.["state"] : [],
              defaultOption: "Select state",
              close: values['state_id'] !== '' ? true : false
            },
            disabled: values["country_id"] ? false : true,
          },
        ]}
      />
      <SimpleInputField nameList={[{ name: "city", placeholder: t("enter_city"), require: "true" }]} />
      {!noAddress && <SimpleInputField nameList={[{ name: "address", type: "textarea", placeholder: t("enter_address"), require: "true" }]} />}
      <SimpleInputField nameList={[{ name: "pincode",placeholder: t("enter_pincode"), require: "true" }]} />
    </>
  );
};

export default AddressComponent;

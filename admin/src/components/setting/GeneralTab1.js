import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import request from "../../utils/axiosUtils";
import { AllLanguageApi, currency } from "../../utils/axiosUtils/API";
import Loader from "../commonComponent/Loader";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const GeneralTab1 = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    data: CurrencyData,
    isLoading: isLoadingCurrency,
    refetch: refetchCurrency,
  } = useQuery({ queryKey: [currency], queryFn: () => request({ url: currency }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data?.data?.data?.map((elem) => {
        return { name: elem.code, id: elem.id };
      }),
  });
  const {
    data: LanguageData,
    isLoading: isLoadingLanguage,
    refetch: refetchLanguage,
  } = useQuery(
    { queryKey: 
    [AllLanguageApi],
    queryFn: () => request({ url: AllLanguageApi }, router),
      enabled: false,
      refetchOnWindowFocus: false,
      select: (data) =>
        data?.data?.data?.map((elem) => {
          return { name: elem.name, id: elem.id };
        }),
    }
  );
  useEffect(() => {
    refetchCurrency(), refetchLanguage();
  }, []);
  if (isLoadingCurrency || isLoadingLanguage) return <Loader />;
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][default_currency_id]",
            title: "Currency",
            inputprops: {
              name: "[values][general][default_currency_id]",
              id: "[values][general][default_currency_id]",
              options: CurrencyData,
            },
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][default_language_id]",
            title: "Language",
            inputprops: {
              name: "[values][general][default_language_id]",
              id: "[values][general][default_language_id]",
              options: LanguageData,
            },
          },
        ]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][admin_site_language_direction]",
            title: "Direction",
            inputprops: {
              name: "[values][general][admin_site_language_direction]",
              id: "[values][general][admin_site_language_direction]",
              options: [
                { name: "RTL", id: "rtl" },
                { name: "LTR", id: "ltr" },
              ],
            },
          },
        ]}
      />
      <SimpleInputField
        nameList={[
          { name: "[values][general][min_order_amount]", title: "min_order_amount", placeholder: t("enter_min_order_amount"), helpertext: "*Please enter the minimum amount required for an order to be processed." },
          { name: "[values][general][min_order_free_shipping]", type: 'number', title: "min_order_free_shipping", placeholder: t("enter_min_order_free_shipping"), helpertext: "*Please enter the minimum order amount for free shipping" },
          { name: "[values][general][product_sku_prefix]", title: "store_prefix", placeholder: t("enter_store_prefix") }]}
      />
      <SearchableSelectInput
        nameList={[
          {
            name: "[values][general][mode]",
            title: "mode",
            inputprops: {
              name: "[values][general][mode]",
              id: "[values][general][mode]",
              options: [
                { id: "light-only", name: "Light" },
                { id: "dark-only", name: "Dark" },
              ],
            },
          },
        ]}
      />
      <SimpleInputField
        nameList={[{ name: "[values][general][copyright]", title: "copyright_text", placeholder: t("enter_copyright_text") },
        ]}
      />
      <SimpleInputField
        nameList={[{ name: "[values][general][google_map_api_key]", type:"password", title: "google_map_key", placeholder: t("enter_google_map_key") },
        ]}
      />
    </>
  );
};

export default GeneralTab1;

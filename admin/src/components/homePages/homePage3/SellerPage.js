import CheckBoxField from "@/components/inputFields/CheckBoxField";
import SearchableSelectInput from "@/components/inputFields/SearchableSelectInput";
import SimpleInputField from "@/components/inputFields/SimpleInputField";

import { useTranslation } from "react-i18next";


const SellerPage = ({name,setStoreSearch,storeData}) => {
  
  
  const { t } = useTranslation("common");
  return (
    <>
      <CheckBoxField name={`[content][seller][status]`} title="status" />
      <SimpleInputField
        nameList={[
          {
            name: `[content][seller][title]`,
            placeholder: t("enter_title"),
            title: "title",
          },
          {
            name: `[content][seller][description]`,
            placeholder: t("enter_description"),
            title: "description",
            type: "textarea",
          },
        ]}
      />
      <SearchableSelectInput
                            nameList={[
                                {
                                    name: name? name :"sellerID",      
                                    title: "store",
                                    inputprops: {
                                        name: name? name :"sellerID",
                                        id: name? name :"sellerID",
                                        options: storeData || [],
                                        setsearch: setStoreSearch,
                                    },
                                },
                            ]}
                        />
      
    </>
  );
};

export default SellerPage;

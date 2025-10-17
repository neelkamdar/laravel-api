import { useTranslation } from "react-i18next";
import SimpleInputField from "../inputFields/SimpleInputField";

const SeoTab = () => {

  const { t } = useTranslation('common')

  return (
    <>
      <SimpleInputField
        nameList={[
          { name: "[values][seo][meta_title]", title: "meta_title", placeholder: t("enter_meta_title") },
          { name: "[values][seo][meta_description]", title: "meta_description", placeholder: t("enter_meta_description") },
          { name: "[values][seo][meta_tags]", title: "meta_tags", placeholder: t("enter_meta_tags") },
          { name: "[values][seo][og_title]", title: "og_title", placeholder: t("enter_og_title") },
          { name: "[values][seo][og_description]", title: "og_description", placeholder: t("enter_og_description") },
        ]}
      />
    </>
  );
};

export default SeoTab;

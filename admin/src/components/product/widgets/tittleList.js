import { ProductTabTitleListData } from "@/data/TabTitleList";

export const generateTitleList = (values) => {
  const filteredTabs = ProductTabTitleListData.filter((tab) => {
    if (values.product_type == "physical" && tab.title !== "digital_product" &&tab.title !== "variants") {
      return tab;
    } else if ( values.product_type == "digital" && tab.title !== "variants" && tab.title !== "shipping") {
      return tab;
    }
    if (values.product_type == "external" &&tab.title !== "variants" &&tab.title !== "shipping" &&tab.title !== "digital_product") {
      return tab;
    }
    if (values.type !== "simple" && tab.title == "variants") {
      return tab;
    }
  });

  return filteredTabs;
};

import ThemeOptionContext from "@/helper/themeOptionsContext";
import request from "@/utils/axiosUtils";
import { AttributesAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseFill } from "react-icons/ri";
import { AccordionHeader, AccordionItem, UncontrolledAccordion } from "reactstrap";
import AccordionLoader from "./AccordionLoader";
import CollectionAttributes from "./CollectionAttributes";
import CollectionBrand from "./CollectionBrand";
import CollectionCategory from "./CollectionCategory";
import CollectionFilter from "./CollectionFilter";
import CollectionPrice from "./CollectionPrice";
import CollectionRating from "./CollectionRating";

const CollectionSidebar = ({ filter, setFilter, hideCategory, isOffcanvas, basicStoreCard, rightSideClass, sellerClass, isAttributes = true }) => {
  const { collectionMobile, setCollectionMobile } = useContext(ThemeOptionContext);
  const router = useRouter();
  const { t } = useTranslation("common");
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { data: attributeAPIData, isLoading } = useQuery({queryKey: [AttributesAPI], queryFn: () => request({ url: AttributesAPI, params: { status: 1 } }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const defaultOpenList = Array.from({ length: attributeAPIData?.length + 3 }, (_, index) => (index + 1).toString());
  if (isLoading) {
    return <AccordionLoader />;
  }
  return (
    <>
      {collectionMobile && <div className="bg-overlay show" onClick={() => setCollectionMobile(false)} />}
      <div className={`${sellerClass ? sellerClass : `col-custome-${isOffcanvas ? "12" : "3"}`} `}>
        <div className={`left-box ${rightSideClass ? rightSideClass : ""} ${collectionMobile ? "show" : ""}`}>
          <div className="shop-left-sidebar">
            <div className="back-button" onClick={() => setCollectionMobile((prev) => !prev)}>
              <h3>
                <a className="text-title">
                  <RiCloseFill />
                  <span>{t("back")}</span>
                </a>
              </h3>
            </div>
            {basicStoreCard && basicStoreCard}
            {/* {!isOffcanvas && <CollectionFilter filter={filter} setFilter={setFilter} />} */}
            {attributeAPIData && (
              <UncontrolledAccordion className="accordion custome-accordion" open={open} toggle={toggle} stayOpen defaultOpen={defaultOpenList}>
                {!hideCategory && (
                  <AccordionItem>
                    <AccordionHeader targetId="1">
                      <span>{t("categories")}</span>
                    </AccordionHeader>
                    <CollectionCategory filter={filter} setFilter={setFilter} />
                  </AccordionItem>
                )}
                <AccordionItem>
                  <AccordionHeader targetId="2">
                    <span>{t("brand")}</span>
                  </AccordionHeader>
                  <CollectionBrand filter={filter} setFilter={setFilter} />
                </AccordionItem>
                {isAttributes ? <CollectionAttributes attributeAPIData={attributeAPIData} filter={filter} setFilter={setFilter} /> : null}

                <CollectionPrice filter={filter} setFilter={setFilter} attributeAPIData={attributeAPIData} />
                <CollectionRating filter={filter} setFilter={setFilter} attributeAPIData={attributeAPIData} />
              </UncontrolledAccordion>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionSidebar;

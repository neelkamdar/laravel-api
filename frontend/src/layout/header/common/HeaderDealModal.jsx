"use client";
import Avatar from "@/components/common/Avatar";
import CustomModal from "@/components/common/CustomModal";
import NoDataFound from "@/components/common/NoDataFound";
import Btn from "@/elements/buttons/Btn";
import SettingContext from "@/helper/settingContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalBody, ModalHeader } from "reactstrap";
import { placeHolderImage } from "../../../data/CommonPath";

const HeaderDealModal = ({ setModal, modal }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { themeOption } = useContext(ThemeOptionContext);
  const { convertCurrency } = useContext(SettingContext);
  const [getProductIds, setGetProductIds] = useState({});

  const { data: filteredProduct, refetch, isLoading } = useQuery({queryKey: [ProductAPI, "DealModal"], queryFn: () => request({ url: ProductAPI, params: { ...getProductIds, status: 1 } }, router), enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });
  useEffect(() => {
    if (themeOption?.header?.today_deals?.length > 0) {
      setGetProductIds((prev) => ({
        ...prev,
        ids: Array.from(new Set(themeOption?.header?.today_deals))?.join(",")
      }));
    }
    !isLoading && Object.keys(getProductIds).length > 0 && refetch();
  }, [themeOption?.header?.today_deals]);
  useEffect(() => {
    isLoading && getProductIds?.ids && refetch();
  }, [isLoading, getProductIds?.ids]);
  return (
    <CustomModal
      modal={modal}
      setModal={setModal}
      classes={{
        modalClass: "theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down",
        customChildren: true,
      }}
    >
      <ModalHeader>
        <div>
          <h5 className="modal-title w-100">{t("deal_today")}</h5>
          <p className="mt-1 text-content">{t("recommended_deals_for_you")}.</p>
        </div>
        <Btn type="button" className="btn-close" onClick={() => setModal(false)}></Btn>
      </ModalHeader>
      <ModalBody>
        {filteredProduct?.filter((elem) => themeOption?.header?.today_deals?.includes(elem?.id))?.length > 0 ? (
          <div className="deal-offer-box">
            <ul className="deal-offer-list">
              {filteredProduct
                ?.filter((elem) => themeOption?.header?.today_deals?.includes(elem?.id))
                .map((result, i) => (
                  <li className="list-1" key={i}>
                    <div className="deal-offer-contain">
                      <Link href={`/product/${result?.slug}`} className="deal-image">
                        <Avatar data={result?.product_thumbnail} placeHolder={placeHolderImage} name={result?.name} height={80} width={80} />
                      </Link>

                      <Link href={`/product/${result?.slug}`} className="deal-contain">
                        <h5>{result?.name}</h5>
                        <h6>
                          {convertCurrency(result?.sale_price)}
                          {result.discount || result?.price ? <del>{convertCurrency(result?.price)}</del> : null}
                          <span>{result?.unit}</span>
                        </h6>
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <NoDataFound
            data={{
              customClass: "bg-light no-data-added",
              title: "no_product_found",
            }}
          />
        )}
      </ModalBody>
    </CustomModal>
  );
};

export default HeaderDealModal;

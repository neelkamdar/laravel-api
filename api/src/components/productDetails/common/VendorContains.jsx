import Avatar from "@/components/common/Avatar";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiArrowRightLine, RiStarFill } from "react-icons/ri";

const VendorContains = ({ productState }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="vendor-contain">
        <Link href={`/seller/stores/${productState?.product?.store?.slug}`}>
          {productState?.product?.store?.store_logo ? (
            <div className="vendor-image">
              <Avatar data={productState?.product?.store?.store_logo} height={64} width={64} name={productState?.product?.store?.store_name} />
            </div>
          ) : (
            <h2 className="vendor-text">{productState?.product?.store?.store_name.charAt(0).toString().toUpperCase()}</h2>
          )}
        </Link>

        <div className="vendor-name">
          <Link href={`/seller/stores/${productState?.product?.store?.slug}`}>
            <h5 className="fw-500">
              {productState?.product?.store?.store_name}
              <span>
                <RiStarFill />({productState?.product?.store?.rating_count.toFixed(1) || 0})
              </span>
            </h5>
          </Link>
          <Link href={`/seller/stores/${productState?.product?.store?.slug}`}>
            <div className="store-btn">
              {t("go_to_store")} <RiArrowRightLine />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VendorContains;

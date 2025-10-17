import { useQuery } from "@tanstack/react-query";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import request from "../../../utils/axiosUtils";
import { product } from "../../../utils/axiosUtils/API";
import Loader from "../../commonComponent/Loader";
import CheckBoxField from "../../inputFields/CheckBoxField";
import MultiSelectField from "../../inputFields/MultiSelectField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

const ProductSlider2 = ({ values, setFieldValue }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data, isLoading } = useQuery({
    queryKey: [product],
    queryFn: () => request({ url: product, params: { status: 1 } }, router),
    select: (res) =>
      res?.data?.data.map((elem) => {
        return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage };
      }),
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <h4 className='fw-semibold mb-3 txt-primary w-100'>{t("product_slider")} 2</h4>
      <SimpleInputField nameList={[{ name: `[content][main_content][section2_slider_products][product_slider_2][title]`, placeholder: t("enter_title"), title: "title" }]} />
      <MultiSelectField values={values} setFieldValue={setFieldValue} name='mainContentProduct2ProductIds' title='products' data={data} />
      <CheckBoxField name={`[content][main_content][section2_slider_products][product_slider_2][status]`} title='status' />
    </>
  );
};

export default ProductSlider2;

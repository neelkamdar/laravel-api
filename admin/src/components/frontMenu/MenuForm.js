import MenuContext from "@/helper/menuContext";
import { getHelperText } from "@/utils/customFunctions/getHelperText";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect, useMemo } from "react";
import { Row } from "reactstrap";
import FormBtn from "../../elements/buttons/FormBtn";
import request from "../../utils/axiosUtils";
import {
  YupObject,
  linkTypeSchema,
  nameSchema,
} from "../../utils/validation/ValidationSchemas";
import CheckBoxField from "../inputFields/CheckBoxField";
import FileUploadField from "../inputFields/FileUploadField";
import MultiSelectField from "../inputFields/MultiSelectField";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import SimpleInputField from "../inputFields/SimpleInputField";
import BadgeColor from "./BadgeColor";
import ChildrenCategory from "./ChildrenCategory";
import FrontMenuRadio from "./FrontMenuRadio";
import { PagesAPI } from "@/utils/axiosUtils/API";
import MenuPath from "./MenuPath";
import { useRouter } from "next/navigation";
import LanguageRedirection from "../commonComponent/LanguageRedirection";

const MenuForm = ({ mutate, updateId, loading, language }) => {
  const { t } = useTranslation("common");
  const { menuState } = useContext(MenuContext);
  const router = useRouter()   
  const { data: oldData, isLoading, refetch } = useQuery({ queryKey: ["menu/" + updateId], queryFn: () => request({ url: `menu/${updateId}` }), enabled: false });
  const { data , refetch: pageRefetch, isLoading: pageLoading } = useQuery({ queryKey: [PagesAPI], queryFn: () => request({ url: PagesAPI },router), enabled:false, refetchOnWindowFocus: false,select: (res) =>res?.data?.data?.map((elem) => {return { id: elem?.slug, name: elem?.title,slug:elem.slug };}),});
  useEffect(() => {
    refetch();
  }, [updateId]);
  useEffect(() => {
    pageRefetch();
  }, [pageLoading]);
  const updatedData = useMemo(() => {
    return menuState;
  }, [menuState]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: updateId ? oldData?.data?.title : "",
        path: updateId ? oldData?.data?.path : "",
        link_type: updateId ? oldData?.data?.link_type : "sub",
        parent_id: updateId ? oldData?.data?.parent_id : null,
        mega_menu: updateId ? Boolean(Number(oldData?.data?.mega_menu)) : true,
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        is_target_blank: updateId? Boolean(Number(oldData?.data?.is_target_blank)): false,
        mega_menu_type: updateId ? oldData?.data?.mega_menu_type : "simple",
        set_page_link: updateId ? oldData?.data?.set_page_link : "",
        badge_text: updateId ? oldData?.data?.badge_text : "",
        badge_color: updateId ? oldData?.data?.badge_color : "bg-danger",
        banner_image_id: updateId ? oldData?.data?.banner_image_id : null,
        item_image_id: updateId ? oldData?.data?.item_image_id : null,
        product_ids: updateId ? oldData?.data?.product_ids : [],
        blog_ids: updateId ? oldData?.data?.blog_ids : [],
        banner_image: updateId? { original_url: oldData?.banner_image?.image_url }: "",

      }}
      validationSchema={YupObject({
        title: nameSchema,
        path: linkTypeSchema,
      })}
      onSubmit={(values, helpers) => {
        if (values["banner_image"]) {
          if (typeof values["banner_image"] === "object") {
            values["banner_image"]["image_url"] =
              values["banner_image"].original_url || "";
          } else {
            values["banner_image"] = { image_url: "" };
          }
        } else {
          values["banner_image"] = { image_url: "" };
        }

        values["mega_menu"] = Number(values["mega_menu"]);
        values["is_target_blank"] = Number(values["is_target_blank"]);
        if (values["banner_image_id"]) {
          delete values["banner_image"];
        }
        if (values["item_image_id"]) {
          delete values["item_image"];
        }
        mutate(values);
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="theme-form theme-form-2 mega-form">
          {updateId && <LanguageRedirection id={updateId} path={'/menu'} language={language} />}
          <Row>
            <SimpleInputField nameList={[{ name: "title", title: "title", placeholder: t("enter_menu_title"), require: "true",},]}/>
            <SearchableSelectInput nameList={[{ name: "link_type",title: "link_type",inputprops: {name: "link_type", id: "link_type",options: [{ id: "sub", name: "sub" },{ id: "link", name: "Link" },],defaultOption: "sub",},},]}/>
            {values["link_type"] == "link" && ( <CheckBoxField name="is_target_blank" />)}
            {values["link_type"] == "link" && ( <SearchableSelectInput nameList={[{name: "set_page_link",inputprops: { name: "set_page_link", id: "set_page_link", options: data, close: true}}]}/>)}
            <MenuPath setFieldValue={setFieldValue} values={values}  />

            <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="parent_id" title="select_parent" data={updatedData} />

            {!values["parent_id"] && <CheckBoxField name="mega_menu" />}
            {!values["parent_id"] && values["mega_menu"] && (<FrontMenuRadio values={values} setFieldValue={setFieldValue} />)}
            {!values["parent_id"] &&
              values["mega_menu"] &&
              (values["mega_menu_type"] === "side_banner" || values["mega_menu_type"] === "bottom_banner" || values["mega_menu_type"] === "product_box" || values["mega_menu_type"] === "blog_box") && ( <ChildrenCategory values={values} setFieldValue={setFieldValue}/>)}

            {updatedData?.find((data) => data.id == values["parent_id"])
              ?.mega_menu_type == "link_with_image" &&
              values["parent_id"] && (
                <FileUploadField name="item_image_id" title="link_image" id="item_image_id" showImage={values["item_image_id"]} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText("1859x550px")} />
              )}
            <SimpleInputField
              nameList={[
                { name: "badge_text", title: "badge_text", placeholder: t("enter_badge_text"),},
              ]}
            />
            <BadgeColor values={values} setFieldValue={setFieldValue} />

            <CheckBoxField name="status" />

            <FormBtn loading={loading} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default MenuForm;

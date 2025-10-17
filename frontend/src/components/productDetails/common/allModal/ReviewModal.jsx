import { useContext } from "react";
import { Form, Formik } from "formik";
import Avatar from "@/components/common/Avatar";
import CustomModal from "@/components/common/CustomModal";
import SimpleInputField from "@/components/common/inputFields/SimpleInputField";
import Btn from "@/elements/buttons/Btn";
import { YupObject, nameSchema } from "@/utils/validation/ValidationSchemas";
import { useTranslation } from "react-i18next";
import useCreate from "@/utils/hooks/useCreate";
import { ReviewAPI } from "@/utils/axiosUtils/API";
import { placeHolderImage } from "../../../../data/CommonPath";
import { ModalFooter } from "reactstrap";
import ProductRating from "@/components/common/productBox/widgets/ProductRating";

const ReviewModal = ({ modal, setModal, productState, refetch }) => {
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useCreate(productState?.product?.user_review ? `${ReviewAPI}/${productState?.product.user_review.id}` : ReviewAPI, false, false, false, (resDta) => {
    if (resDta.status == 200 || resDta.status == 201) {
      refetch();
      setModal(false);
    }
  });
  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: "theme-modal", title: productState?.product?.user_review ? "edit_review" : "write_a_review" }}>
      <Formik
        initialValues={{ rating: productState?.product?.user_review?.rating, description: productState?.product?.user_review?.description, product_id: productState?.product?.id, review_image_id: "" }}
        validationSchema={YupObject({
          rating: nameSchema,
        })}
        onSubmit={(values) => {
          if (productState?.product?.user_review) {
            values["_method"] = "PUT";
          }
          mutate(values);
        }}
      >
        {({ values, setFieldValue, errors }) => (
          <Form className="product-review-form">
            <div className="product-wrapper">
              <div className="product-image">
                <Avatar data={productState?.product?.product_thumbnail ? productState?.product?.product_thumbnail : placeHolderImage} customImageClass="img-fluid" name={productState?.product?.name} />
              </div>
              <div className="product-content">
                <h5 className="name">{productState?.product?.name}</h5>
                <div className="product-review-rating">
                  <label>{"Rating"}</label>
                  <div className="product-rating">
                    <ProductRating totalRating={productState?.product?.rating_count || 0} />
                    <h6 className="rating-number">{productState?.product?.rating_count?.toFixed(2) || 0}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="review-box">
              <div className="product-review-rating">
                <label>{"Rating"}</label>
                <div className="product-rating">
                  <ProductRating totalRating={productState?.product?.user_review?.rating || 0} clickAble={true} setFieldValue={setFieldValue} name={"rating"} />
                </div>
              </div>
            </div>
            <div className="review-box">
              <SimpleInputField nameList={[{ name: "description", placeholder: t("enter_description"), type: "textarea", toplabel: "ReviewContent", rows: 3 }]} />
            </div>
            <ModalFooter className="pt-0">
              <Btn className="btn-md btn-theme-outline fw-bold" title="cancel" type="button" onClick={() => setModal("")} />
              <Btn className="btn-md fw-bold text-light theme-bg-color" title="submit" type="submit" loading={Number(isLoading)} />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default ReviewModal;

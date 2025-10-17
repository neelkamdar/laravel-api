import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Row } from "reactstrap";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import request from "../../utils/axiosUtils";
import { country, shipping } from "../../utils/axiosUtils/API";
import SuccessHandle from "../../utils/customFunctions/SuccessHandle";
import { ToastNotification } from "../../utils/customFunctions/ToastNotification";
import { YupObject, nameSchema } from "../../utils/validation/ValidationSchemas";
import SearchableSelectInput from "../inputFields/SearchableSelectInput";
import { useRouter } from "next/navigation";

const FormShipping = ({ open, setActive, shippingData, refetch }) => {
  
  const { t } = useTranslation( 'common');
  const router = useRouter();
  const { data } = useQuery({ queryKey: [country], queryFn: () => request({ url: country }, router), refetchOnWindowFocus: false, select: (res) => res.data.map((country) => ({ id: country.id, name: country.name })) });
  const { mutate, isLoading } = useMutation({mutationFn: (data) => request({ url: shipping, data, method: "post" }, router),
    onSuccess: (resDta) => {
      SuccessHandle(resDta, false, false, t("shipping_created_successfully"));
      setActive(false);
      refetch();
    },
    onError: () => ToastNotification("error"),
  });
  const countryData = data?.filter(country => !shippingData?.map(el => el.country.id).includes(country.id))
  return (
    <ShowModal title="Create Shipping" open={open} close={false}>
      <Formik
        enableReinitialize
        initialValues={{
          country_id: [],
          status: true,
        }}
        validationSchema={YupObject({
          status: nameSchema,
        })}
        onSubmit={(values) => {
          mutate({ ...values, status: Number(values.status) });
        }}>
        {() => (
          <Form>
            <Row>
              <SearchableSelectInput
                nameList={
                  [
                    {
                      name: 'country_id',
                      title: "country",
                      inputprops: {
                        name: 'country_id',
                        id: 'country_id',
                        options: countryData,
                      },
                    },
                  ]} />
            
            </Row>
            <div className="ms-auto save-back-button">
              <div className="button-box">
                <Btn className="btn-outline" form="permission-form" title="cancel" onClick={() => setActive(false)} />
                <Btn className="btn-primary" type="submit" title="save" loading={Number(isLoading)} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ShowModal>
  );
};

export default FormShipping;

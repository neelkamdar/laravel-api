import SimpleInputField from "@/components/inputFields/SimpleInputField";
import Btn from "@/elements/buttons/Btn";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody } from "reactstrap";

const ShippingNote = ({setOpenReceiptModal,openReceiptModal,values,mutate,setFieldValue ,refetch}) => {  

  const { t } = useTranslation("common");
 const originalDateTime = values?.date;
 const parsedDateTime = originalDateTime ? new Date(originalDateTime) : null;
 const formattedDateTime = parsedDateTime && !isNaN(parsedDateTime.getTime()) ? parsedDateTime.toISOString() : null;

  const handleSubmit = () => {
    const sendValue = {
      _method: "put",
      order_status_id: values?.order_status_id?.id,
      note: values?.note,
      changed_at:formattedDateTime
    };
    mutate(sendValue);
    refetch()
    setOpenReceiptModal(false);
    setFieldValue("note","")
    setFieldValue("date","")
  };
  return (
    <Modal modalClassName="shipping-modal" centered isOpen={openReceiptModal}>
      <ModalBody>
        <h5 className="modal-title text-center">{t("shipping_note")}</h5>
        <div className="mb-4 mt-2">
          <SimpleInputField
            nameList={[
              {
                name: "note",
                title: "store_description",
                notitle: "true",
                type: "textarea",
                placeholder: t("EnterDescription(optional)"),
              },
            ]}
          />
          <div className="mt-2">
          <SimpleInputField
            nameList={[
              {
                type:"datetime-local",
                name: "date",
                notitle: "true",
              },
            ]}
          />
          </div>
        </div>
        <div className="button-box">
          <Btn
            className="btn btn-md btn-secondary fw-bold"
            onClick={() => {
              setOpenReceiptModal(false);
            }}
          >
            {t("cancel")}
          </Btn>
          <Btn
            className="btn btn-md btn-secondary btn-theme fw-bold"
            onClick={handleSubmit}
          >
            {t("submit")}
          </Btn>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShippingNote;

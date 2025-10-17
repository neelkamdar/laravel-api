import Btn from "@/elements/buttons/Btn";
import { RiDeleteBinLine } from "react-icons/ri";
import CustomModal from "./CustomModal";
import { useTranslation } from "react-i18next";

const ConfirmDeleteModal = ({ modal, setModal, loading, confirmFunction, setDeleteId }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: "theme-modal delete-modal", modalHeaderClass: "p-0" }}>
        <RiDeleteBinLine className="icon-box" />
        <h5 className="modal-title">{t("delete_item")}?</h5>
        <p>{t("delete_text")} </p>
        <div className="button-box">
          <Btn
            title="no"
            className="btn btn-md btn-theme-outline fw-bold"
            onClick={() => {
              setDeleteId && setDeleteId();
              setModal("");
            }}
          />
          <Btn title="yes" className="theme-bg-color btn-md fw-bold text-light" loading={Number(loading)} onClick={confirmFunction} />
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmDeleteModal;

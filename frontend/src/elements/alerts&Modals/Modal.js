
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ShowModal = ({ open = false, buttons, title, close = true, modalAttr, setModal, ...props }) => {
  const [isOpen, setIsOpen] = useState(open);
  
  const { t } = useTranslation( 'common');
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <Modal id="staticBackdrop" isOpen={isOpen} centered className={`theme-modal theme-form ${modalAttr?.className}`} toggle={() => {
      setIsOpen(false); setModal && setModal(false);
    }}>
      {close && (
        <ModalHeader
          toggle={() => {
            setIsOpen(false); setModal && setModal(false);
          }}>
          {title && (title === "success" ? t("success") : title === "fail" ? t("oops!") : t(title))}
        </ModalHeader>
      )}
      {!close && title && <ModalHeader>{title === "success" ? "success" : title === "fail" ? "Oops!" : t(title)}</ModalHeader>}
      <ModalBody>{props.children}</ModalBody>
      {(buttons) && (
        <ModalFooter>
          <div className="button-box">{buttons}</div>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ShowModal;

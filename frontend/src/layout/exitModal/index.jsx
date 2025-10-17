import CustomModal from "@/components/common/CustomModal";
import LiveImagePath from "@/utils/constants";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModalHeader } from "reactstrap";

const ExitModal = ({headerLogo,dataApi}) => {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const handleMouseOut = (event) => {
      if (event.clientY <= 0) {
        openModal();
        window.removeEventListener("mouseout", handleMouseOut);
      }
    };

    const modalShown = Cookies.get("exit");

    if (!modalShown) {
      window.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const openModal = () => {
    setShowModal(true);
    Cookies.set("exit", "true");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <CustomModal modal={showModal} setModal={setShowModal} classes={{ customChildren: true, modalClass: "modal-lg newsletter-modal theme-modal" }}>
      <ModalHeader className="p-0" toggle={closeModal} />
      <div className="modal-box">
        <div className="modal-image">
         {dataApi?.image_url && <Image src={`${LiveImagePath}${dataApi?.image_url}`} className="img-fluid" alt="NewsLetter Image" width={400} height={361} />}
        </div>
        <div className="modal-content">
          <div>
          { headerLogo && <Image src={headerLogo} className="modal-logo" alt="newsletter" height={17} width={100} />}
            <h2 className="text-title">
            {dataApi?.title}
              <span className="theme-color">!</span>
            </h2>
            <h5>{dataApi?.sub_title}</h5>
            <p>{dataApi?.description}</p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ExitModal;
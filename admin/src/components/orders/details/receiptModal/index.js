import ShowModal from "@/elements/alerts&Modals/Modal";
import SettingContext from "@/helper/settingContext";
import { dateFormate } from "@/utils/customFunctions/DateFormate";
import React, { useContext } from "react";
import ReceiptModalTable from "./ReceiptModalTable";
import Btn from "@/elements/buttons/Btn";
import { useTranslation } from "react-i18next";

const ReceiptModal = ({ open, setOpen, data }) => {
    
    const { t } = useTranslation( 'common');
    const { settingObj } = useContext(SettingContext);
    return (
        <ShowModal
            open={open}
            setModal={setOpen}
            modalAttr={{ className: "theme-modal modal-sm invoice-modal" }}
            buttons={
                <div className="modal-btn-group d-flex align-items-center gap-2 justify-content-center">
                    <Btn className="btn-sm btn-animation theme-bg-color" onClick={() => { window.print() }}>{t("print")}</Btn>
                    <Btn className="btn-sm btn-outline" onClick={() => { setOpen(false) }}>{t("cancel")}</Btn>
                </div>
            }
            close={false}
        >
            <div className="ticket">
                <div className="title-text text-center">
                    <h4>{settingObj?.general?.site_name || 'Logo here'}</h4>
                </div>
                <ul className="centered">
                    <li>{t("order_number")}: {data.order_number}</li>
                    <li>{t("date")}: {dateFormate(data.created_at)}</li>
                    {!data.is_digital_only &&
                        <li>{t("address")}:
                            {data?.shipping_address?.street}
                            {data?.shipping_address?.city} {data?.shipping_address?.state?.name}
                            {data?.shipping_address?.country?.name}
                            {data?.shipping_address?.pincode}
                        </li>
                    }

                    <li>{t("email")}: {data?.consumer?.email}</li>
                    <li>{t("phone")}: {data?.shipping_address?.phone}</li>
                    <li>{t("customer")}: {data?.consumer?.name}</li>
                </ul>
            </div>
            <ReceiptModalTable data={data} />
            <p className="text-point">{t("thank_you_for_shopping")}.</p>
        </ShowModal>
    )
}

export default ReceiptModal;
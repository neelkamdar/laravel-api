import ShowModal from "@/elements/alerts&Modals/Modal";
import SettingContext from "@/helper/settingContext";
import React, { useContext, useState, useEffect } from "react";
import Btn from "@/elements/buttons/Btn";
import { useTranslation } from "react-i18next";

import SimpleInputField from "@/components/inputFields/SimpleInputField";
const ShippingNoteModal = ({ open, setOpen, data, note, setFieldValue, orderStatusUpdate, values, moduleName, orderStatusData, setOrderStatus, orderStatus, mutate, edit }) => {


    const { t } = useTranslation('common');
    const { settingObj } = useContext(SettingContext);


    const [openReceiptModal, setOpenReceiptModal] = useState(false);
    const submit = () => {
        setOpenReceiptModal(true)
        setFieldValue('order_status_id', data)
        mutate({
            _method: "put",
            order_status_id: 1,
            note: ""
        })
    }
    useEffect(() => {
        if (orderStatusUpdate?.status == 200 || orderStatusUpdate?.status == 201) {
            setOrderStatus(values['order_status_id'])
        }
    }, [orderStatusUpdate])
    return (
        <ShowModal
            open={open}
            setModal={setOpen}
            isClose={true}
            modalAttr={{ className: "theme-modal  invoice-modal" }}
            buttons={
                <div className="modal-btn-group d-flex align-items-center gap-2 justify-content-center">
                    <Btn className="btn-sm btn-animation theme-bg-color" onClick={() => { setOpen(false) }}>{t("cancel")}</Btn>
                    <Btn className="btn-sm btn-outline" onClick={() => { submit() }}>{t("submit")}</Btn>
                </div>
            }
        >
            <h5 className="modal-title text-center">{t('shipping_note')}</h5>
            <div className="mb-4 mt-2">
                <SimpleInputField nameList={[{ name: "note", title: "store_description", notitle: "true", type: "textarea", placeholder: t("EnterDescription(optional)"), require: "true" }]} />
            </div>
        </ShowModal>
    )
}

export default ShippingNoteModal;
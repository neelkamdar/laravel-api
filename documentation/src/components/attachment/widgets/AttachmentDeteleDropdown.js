import { useEffect, useState } from "react";
import { RiDeleteBin2Line, RiDeleteBinLine, RiMoreFill } from "react-icons/ri";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import ShowModal from "../../../elements/alerts&Modals/Modal";
import Btn from "../../../elements/buttons/Btn";
import { attachment } from "../../../utils/axiosUtils/API";
import useDelete from "../../../utils/hooks/useDelete";
import usePermissionCheck from "../../../utils/hooks/usePermissionCheck";
import { useTranslation } from "react-i18next";

const AttachmentDeleteDropdown = ({ state, dispatch, id, refetch }) => {
    
    const { t } = useTranslation( 'common');
    const [modal, setModal] = useState(false);
    const [destroy] = usePermissionCheck(["destroy"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);
    const { data, mutate, isLoading } = useDelete(attachment, '/attachment');
    let temp = [...state.deleteImage];
    useEffect(() => {
        if (data) {
            setModal(false)
            refetch()
        }
    }, [isLoading])

    const openModal = (e) => {
        e.preventDefault()
        setModal(true)
    }

    const deleteImage = (id) => {
        temp.splice(temp.indexOf(id), 1);
        mutate(id);
        dispatch({ type: "DeleteSelectedImage", payload: temp });
    }
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} >
            <DropdownToggle><RiMoreFill /></DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                {destroy ? <li>
                    <DropdownItem className="dropdown-item d-flex align-items-center" onClick={openModal}>
                        <RiDeleteBin2Line className="me-2" />{t("delete")}
                    </DropdownItem>
                    <ShowModal open={modal} close={false}
                        buttons={
                            <>
                                <Btn title="no" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
                                <Btn title="yes" className="btn-theme btn-md fw-bold" loading={Number(isLoading)} onClick={() => {
                                    deleteImage(id)
                                }} />
                            </>
                        }>
                        <div className="remove-box">
                            <RiDeleteBinLine className="ri-delete-bin-line icon-box" />
                            <h2>{t("delete_item")}?</h2>
                            <p>{t("deleted_message")} </p>
                        </div>
                    </ShowModal>
                </li> : ""}
            </DropdownMenu>
        </Dropdown>
    );
};
export default AttachmentDeleteDropdown;
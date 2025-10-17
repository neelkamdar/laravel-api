
import { useTranslation } from "react-i18next";
import { RiQuestionLine } from 'react-icons/ri';
import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';

const ConfirmationModal = ({ modal, setModal, setCreditOrDebit, creditOrDebit, handleSubmit, setIsValue, creditLoader, debitLoader }) => {
    
    const { t } = useTranslation( 'common');
    const onSubmit = (values) => {
        setIsValue(values);
        handleSubmit()
        setCreditOrDebit("")
        setModal(false)
    }
    return (
        <ShowModal
            open={modal}
            close={false}
            buttons={
                <>
                    <Btn
                        title="no"
                        onClick={() => {
                            setModal(false);
                        }}
                        className="btn--no btn-md fw-bold"
                    />
                    <Btn
                        title="yes"
                        onClick={() => onSubmit(creditOrDebit)}
                        loading={Number(creditLoader || debitLoader)}
                        className="btn-theme btn-md fw-bold"
                    />
                </>
            }>
            <div className="remove-box">
                <RiQuestionLine className="icon-box wo-bg" />
                <h5 className="modal-title">{t("confirmation")}</h5>
                <p>{t("confirmation_massage")} </p>
            </div>
        </ShowModal>
    )
}

export default ConfirmationModal
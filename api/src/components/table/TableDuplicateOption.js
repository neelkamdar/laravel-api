import { useEffect, useState } from 'react';
import { RiFileCopyLine, RiQuestionLine } from 'react-icons/ri';
import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';
import useCreate from '../../utils/hooks/useCreate';
import { useTranslation } from "react-i18next";

const TableDuplicateOption = ({ isReplicate, url, isCheck, refetch, setIsCheck }) => {
    
    const { t } = useTranslation( 'common');
    const [modal, setModal] = useState(false);
    const { data, mutate, isLoading } = useCreate(`${url}/${isReplicate?.replicateAPI}`)
    const onSubmit = (productIds) => {
        mutate({ ids: productIds })
    }
    useEffect(() => {
        if (data) {
            data?.status == 200 && refetch(); setModal(false); setIsCheck([])
        }
    }, [isLoading])
    return (
        <>
            <a className="align-items-center btn btn-outline btn-sm d-flex" onClick={() => setModal(true)}><RiFileCopyLine /> {t("duplicate")}
            </a>
            <ShowModal open={modal} close={false}
                buttons={
                    <>
                        <Btn title="no" onClick={() => setModal(false)} className="btn--no btn-md fw-bold" />
                        <Btn title="yes" onClick={() => onSubmit(isCheck)} loading={Number(isLoading)} className="btn-theme btn-md fw-bold" />
                    </>
                }>
                <div className="remove-box">
                    <RiQuestionLine className="icon-box wo-bg" />
                    <h5 className="modal-title">{t("confirmation")}</h5>
                    <p>{t("confirmation_massage")} </p>
                </div>
            </ShowModal>
        </>
    )
}

export default TableDuplicateOption
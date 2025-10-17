import { Formik } from 'formik';
import { DropdownItem } from "reactstrap";
import { useState } from 'react';
import { RiDownload2Line, RiUpload2Line, RiUploadCloud2Line } from 'react-icons/ri';
import { TabContent, TabPane } from 'reactstrap';
import ShowModal from '../../elements/alerts&Modals/Modal';
import Btn from '../../elements/buttons/Btn';
import useCreate from '../../utils/hooks/useCreate';
import { YupObject, requiredSchema } from '../../utils/validation/ValidationSchemas';
import FileUploadBrowser from '../inputFields/FileUploadBrowser';
import { useTranslation } from "react-i18next";

const ImportExport = ({ importExport, refetch, moduleName, exportButton, Dropdown }) => {
    const { t } = useTranslation("common");
    const [modal, setModal] = useState(false)

    const { mutate: exportMutate, isLoading: exportLoader } = useCreate(importExport.exportUrl, false, false, false, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            const blob = new Blob([resDta?.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${moduleName.toLowerCase()}.csv`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    }, false, 'blob')
    const { mutate, isLoading } = useCreate(importExport?.importUrl, false, false, `${moduleName} added successfully`, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            refetch();
            setModal(false);
        }
    })

  function useFileDownloader(csvUrl, savePath) {
    const downloadCsv = async () => {
        const response = await fetch(`${csvUrl}`);
        const textContent = await response.text();
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', savePath);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      };
      return downloadCsv;
    }

    const csvUrl = `/assets/csv/${importExport?.sampleFile}`;
    const savePath = importExport?.sampleFile;

    const downloadCsv = useFileDownloader(csvUrl, savePath);

    return (
        <>
            {
                Dropdown ?
                    <>
                        <li>
                            <button onClick={() => setModal(true)} className="dropdown-item">{t("import")}</button>
                        </li>
                        <li>
                            <DropdownItem onClick={() => exportMutate()}>{t("export")}</DropdownItem>
                        </li>
                    </>
                    :
                    <>
                        <a className="btn-outline btn btn-secondary" onClick={() => setModal(true)}><RiUpload2Line />{t("import")}</a>
                        {exportButton == true && <a className="btn-outline btn btn-secondary" onClick={() => exportMutate({ ...importExport?.paramsProps })}><RiDownload2Line />{t("export")}</a>}
                    </>
            }

            <ShowModal open={modal} setModal={setModal} modalAttr={{ className: "import-export-modal media-modal inset-media-modal modal-dialog modal-dialog-centered modal-xl" }} close={true} title={"InsertMedia"} noClass={true}>
                <TabContent>
                    <Formik
                        initialValues={{ [moduleName?.toLowerCase()]: "" }}
                        validationSchema={YupObject({ [moduleName?.toLowerCase()]: requiredSchema })}
                        onSubmit={(values, { resetForm }) => {
                            let formData = new FormData();
                            Object.values(values[moduleName.toLowerCase()]).forEach((el, i) => {
                                formData.append(`${moduleName?.toLowerCase()}`, el);
                            });
                            mutate(formData);
                        }}
                    >
                        {({ values, setFieldValue, errors, handleSubmit }) => (
                            <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit}>
                                <TabPane className={"fade active show"} id="select">
                                    <div className="content-section drop-files-sec mb-2">
                                        <div>
                                            <RiUploadCloud2Line />
                                            <div>
                                                <div className="dflex-wgap justify-content-center ms-auto save-back-button">
                                                    <h2>{t("drop_files_here")}
                                                        <span>{t("or")}</span>
                                                        <FileUploadBrowser errors={errors} id={moduleName.toLowerCase()} name={moduleName.toLowerCase()} type="file" multiple={true} values={values} setFieldValue={setFieldValue} accept=".csv" />
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <p>{t("please_download_csv")}
                                        <a className='ms-2' href={`/assets/csv/${importExport?.sampleFile}`} download={importExport?.sampleFile}
                                        >{t(importExport?.sampleFile?.includes("csv") ? "Here" : "ReadTheInstructions")}</a>
                                        {importExport?.instructionsAndSampleFile &&
                                            <>
                                                {t("and_please_ensure_you")}
                                                <a href={`/assets/csv/${importExport?.instructions}`} download={importExport?.instructions} > {t("read_the_instructions")} </a>
                                            </>
                                        }
                                    </p>
                                </TabPane>
                                <div className="modal-footer">
                                    {values[moduleName.toLowerCase()] && values[moduleName.toLowerCase()]?.length > 0 &&
                                        <a href="#javascript" onClick={() => setFieldValue(`${moduleName}`, "")}>{t("clear")}</a>
                                    }
                                    <Btn type="submit" className="btn-theme ms-auto" title="Insert Media" loading={Number(isLoading)} />
                                </div>
                            </form>
                        )}
                    </Formik>
                </TabContent>
            </ShowModal>
        </>
    )
}

export default ImportExport
import { ErrorMessage } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { Input } from "reactstrap";
import InputWrapper from "../../utils/hoc/InputWrapper";
import { handleModifier } from "../../utils/validation/ModifiedErrorMessage";
import AttachmentModal from "../attachment/widgets/attachmentModal";
import WordImages from "../../../public/assets/images/word.png";
import ZipImages from "../../../public/assets/images/zip.png";
import XlsImages from "../../../public/assets/images/xls.png";
import TxtImages from "../../../public/assets/images/txt.png";
import SoundImages from "../../../public/assets/images/sound.png";
import PDFImages from "../../../public/assets/images/pdf.png";
import FolderImages from "../../../public/assets/images/folder.png";
import VideoImages from "../../../public/assets/images/video.png";
import { LiveImagePath } from "@/utils/constants";

const FileUploadField = ({
  values,
  updateId,
  setFieldValue,
  errors,
  multiple,
  loading,
  showImage,
  paramsProps,
  ...props
}) => {
  const storeImageObject = props.name.split("_id")[0];
  const { t } = useTranslation("common");
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  useEffect(() => {
    if (values) {
      multiple
        ? setSelectedImage(values[storeImageObject])
        : values[storeImageObject]
        ? setSelectedImage(loading ? null : [values[storeImageObject]])
        : values[props.name]
        ? setSelectedImage([values[props.name]])
        : setSelectedImage([]);
    }
  }, [values[storeImageObject], loading]);
  useEffect(() => {
    if (props?.uniquename) {
      if (Array.isArray(props?.uniquename)) {
        const onlyIds = props?.uniquename?.map((data) => data.id);
        setSelectedImage(loading ? null : props?.uniquename);
        setFieldValue(props?.name, onlyIds);
      } else {
        setSelectedImage(loading ? null : [props?.uniquename]);
        setFieldValue(props?.name, props?.uniquename?.id);
      }
    }
  }, [props?.uniquename, loading, showImage]);

  const removeImage = (result) => {
    if (props.name) {
      if (multiple) {
        let updatedImage = selectedImage.filter(
          (elem) => elem.id !== result.id
        );
        setSelectedImage(updatedImage);
       setFieldValue(storeImageObject, updatedImage); // updates product_galleries (image objects)
       setFieldValue(props.name, updatedImage.map((img) => img.id)); // updates product_galleries_id
      } else {
        setFieldValue(
          props?.name,
          Array.isArray(values[props.name])
            ? values[props.name].filter((el) => el !== result.id)
            : null
        );
        setSelectedImage(selectedImage.filter((elem) => elem.id !== result.id));
        setFieldValue(storeImageObject, "");
      }
    }
  };

  let mimeImageMapping = [
    { mimeType: "application/pdf", imagePath: PDFImages },
    { mimeType: "application/msword", imagePath: WordImages },
    {
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      imagePath: WordImages,
    },
    { mimeType: "application/vnd.ms-excel", imagePath: XlsImages },
    {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      imagePath: XlsImages,
    },
    { mimeType: "application/vnd.ms-powerpoint", imagePath: FolderImages },
    {
      mimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      imagePath: FolderImages,
    },
    { mimeType: "text/plain", imagePath: TxtImages },
    { mimeType: "audio/mpeg", imagePath: SoundImages },
    { mimeType: "audio/wav", imagePath: SoundImages },
    { mimeType: "audio/ogg", imagePath: SoundImages },
    { mimeType: "video/mp4", imagePath: VideoImages },
    { mimeType: "video/webm", imagePath: VideoImages },
    { mimeType: "video/ogg", imagePath: VideoImages },
    { mimeType: "application/zip", imagePath: ZipImages },
    { mimeType: "application/x-tar", imagePath: ZipImages },
    { mimeType: "application/gzip", imagePath: ZipImages },
  ];

  let videoType = ['mp4', 'webm', 'ogg'];

    const getMimeTypeImage = (result) => {
    return  mimeImageMapping.find(mime => mime?.mimeType === result)?.imagePath


}

  const ImageShow = () => {
    return (
      <>
        {selectedImage?.length > 0 &&
          selectedImage?.map((result, i) => {
            return(
            <li key={i}>
              <div className="media-img-box">
                {
                  result.hasOwnProperty('mime_type') ? (
                    <>
                      {result.mime_type && result.mime_type.startsWith('image') ? (
                            <Image src={result.original_url} className="img-fluid" alt="ratio image" height={130} width={130} />
                        ) : (
                            <Image src={getMimeTypeImage(result.mime_type)} alt="ratio image" className="img-fluid" height={130} width={130} />
                      )}
                    </>
                  ) : (
                    <>
                      {videoType.includes(result?.original_url?.substring(result.original_url?.lastIndexOf('.') + 1)) ? 
                        <Image src={VideoImages} alt="ratio image" className="img-fluid" height={130} width={130} />
                      : 
                      (
                        <Image src={process.env.storageURL+result.original_url} alt="ratio image" className="img-fluid" height={130} width={130} />
                      )} 
                    </>
                  )}

                <p className="remove-icon">
                  <RiCloseLine onClick={() => removeImage(result)} />
                </p>
              </div>
              <h6>{result?.file_name}</h6>
            </li>
          )})}
      </>
    );
  };
  return (
    <>
      <ul className={`image-select-list`}>
        <li className="choosefile-input">
          <Input
            {...props}
            onClick={(event) => {
              event.preventDefault();
              setModal(props.id);
            }}
          />
          <label htmlFor={props.id}>
            <RiAddLine />
          </label>
        </li>

        <ImageShow />

        <AttachmentModal
          paramsProps={paramsProps}
          modal={modal == props.id}
          name={props.name}
          multiple={multiple}
          values={values}
          setModal={setModal}
          setFieldValue={setFieldValue}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          showImage={showImage}
          redirectToTabs={true}
        />
      </ul>
      <p className="help-text">{props?.helpertext}</p>
      {errors?.[props?.name] ? (
        <ErrorMessage
          name={props.name}
          render={(msg) => (
            <div className="invalid-feedback d-block">
              {t(handleModifier(storeImageObject).split(" ").join(""))}{" "}
              {t("is_required")}
            </div>
          )}
        />
      ) : null}
    </>
  );
};

export default InputWrapper(FileUploadField);

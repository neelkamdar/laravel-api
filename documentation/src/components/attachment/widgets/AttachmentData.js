import React from "react";
import { Input, Label } from "reactstrap";
import NoDataFound from "../../commonComponent/NoDataFound";
import Image from "next/image";
import WordImages from "../../../../public/assets/images/word.png"
import ZipImages from "../../../../public/assets/images/zip.png"
import XlsImages from "../../../../public/assets/images/xls.png"
import TxtImages from "../../../../public/assets/images/txt.png"
import SoundImages from "../../../../public/assets/images/sound.png"
import PDFImages from "../../../../public/assets/images/pdf.png"
import FolderImages from "../../../../public/assets/images/folder.png"
import VideoImages from "../../../../public/assets/images/video.png"
import AttachmentDeleteDropdown from "./AttachmentDeteleDropdown";



const AttachmentData = ({ state, dispatch, attachmentsData, refetch }) => {
    let mimeImageMapping = [
        { mimeType: 'application/pdf', imagePath: PDFImages },
        { mimeType: 'application/msword', imagePath:WordImages },
        { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', imagePath: WordImages },
        { mimeType: 'application/vnd.ms-excel', imagePath: XlsImages},
        { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', imagePath: XlsImages },
        { mimeType: 'application/vnd.ms-powerpoint', imagePath: FolderImages },
        { mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', imagePath: FolderImages },
        { mimeType: 'text/plain', imagePath: TxtImages},
        { mimeType: 'audio/mpeg', imagePath: SoundImages },
        { mimeType: 'audio/wav', imagePath: SoundImages },
        { mimeType: 'audio/ogg', imagePath: SoundImages },
        { mimeType: 'video/mp4', imagePath: VideoImages },
        { mimeType: 'video/webm', imagePath: VideoImages },
        { mimeType: 'video/ogg', imagePath: VideoImages },
        { mimeType: 'application/zip', imagePath: ZipImages },
        { mimeType: 'application/x-tar', imagePath: ZipImages },
        { mimeType: 'application/gzip', imagePath: ZipImages },
      ];
    
    // Deleting the selected images from media module
    const ChoseImages = (e, item) => {
        let temp = [...state.deleteImage];
        if (temp?.includes(item.id) && !e.target.checked) {
            temp.splice(temp.indexOf(item.id), 1);
            dispatch({ type: "DeleteSelectedImage", payload: temp });
        }
        if (e.target.checked) {
            dispatch({ type: "DeleteSelectedImage", payload: [...state.deleteImage, item.id] });
        }
    };

    const getMimeTypeImage = (mimeType) => {
        return mimeImageMapping?.find((value) => value.mimeType === mimeType)?.imagePath;
    }
    return (
        <>
            {attachmentsData?.length > 0 ? attachmentsData?.map((elem, i) => (
                <div key={i}>
                    <div className="library-box">
                        <Input type="checkbox" id={elem.id} checked={state.deleteImage?.includes(elem.id)} onChange={(e) => ChoseImages(e, elem)} />
                        <Label htmlFor={elem.id}>
                            <div className="ratio ratio-1x1">
                                {elem.mime_type && elem.mime_type.startsWith('image') ? (
                                    <Image src={elem.original_url} className="img-fluid" alt="ratio image" height={130} width={130} />
                                ) : (
                                    <Image src={getMimeTypeImage(elem.mime_type)} alt="attachment" className="img-fluid" height={130} width={130} />
                                )}
                            </div>
                            <AttachmentDeleteDropdown state={state} dispatch={dispatch} id={elem?.id} refetch={refetch} />
                        </Label>
                    </div>
                </div>
            ))
                : <NoDataFound noImage={false} title={"NoMediaFound"} />}
        </>
    );
};

export default AttachmentData;
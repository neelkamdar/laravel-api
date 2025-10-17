import WordImages from "../../public/assets/images/word.png"
import ZipImages from "../../public/assets/images/zip.png"
import XlsImages from "../../public/assets/images/xls.png"
import TxtImages from "../../public/assets/images/txt.png"
import SoundImages from "../../public/assets/images/sound.png"
import PDFImages from "../../public/assets/images/pdf.png"
import FolderImages from "../../public/assets/images/folder.png"
import VideoImages from "../../public/assets/images/video.png"


export const mimeImageMapping = {
  "application/pdf": PDFImages,
  "application/msword": WordImages,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    WordImages,
  "application/vnd.ms-excel": XlsImages,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    XlsImages,
  "application/vnd.ms-powerpoint": FolderImages,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    FolderImages,
  "text/plain": TxtImages,
  "audio/mpeg": SoundImages,
  "audio/wav": SoundImages,
  "audio/ogg": SoundImages,
  "video/mp4": VideoImages,
  "video/webm": VideoImages,
  "video/ogg": VideoImages,
  "application/zip": ZipImages,
  "application/x-tar": ZipImages,
  "application/gzip": ZipImages,
};

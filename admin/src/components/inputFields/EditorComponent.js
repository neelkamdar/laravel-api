import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function CkEditorComponent({onChange, editorLoaded, value = "", onBlur }) {
  const { t } = useTranslation("common");
  const editor = useRef(null);
  const [content, setContent] = useState(value);
  return (
    <div>
      {editorLoaded && editor ? (
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            height: 250,
            readonly: false,
          }}
          tabIndex={1}
          onBlur={(newContent) => { onBlur && onBlur(newContent) }}
          onChange={(newContent) => {
            const plainText = newContent.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
            onChange && onChange(plainText === "" ? "" : newContent);
          }}
        />
      ) : (
        <div>{t("Editorloading")}</div>
      )}
    </div>
  );
}

export default CkEditorComponent;

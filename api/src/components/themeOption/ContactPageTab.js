import { getHelperText } from "../../utils/customFunctions/getHelperText"
import FileUploadField from "../inputFields/FileUploadField"
import ContactWrapper from "./ContactWrapper"

const ContactPageTab = ({ values, setFieldValue }) => {
    return (
        <>
            <FileUploadField name="contactUsImage" title='image' id="contactUsImage" showImage={values['contactUsImage']} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText('460x388px')} />
            <ContactWrapper contactDetails={{ value: "detail_1", title: "1" }} />
            <ContactWrapper contactDetails={{ value: "detail_2", title: "2" }} />
            <ContactWrapper contactDetails={{ value: "detail_3", title: "3" }} />
            <ContactWrapper contactDetails={{ value: "detail_4", title: "4" }} />
        </>
    )
}
export default ContactPageTab
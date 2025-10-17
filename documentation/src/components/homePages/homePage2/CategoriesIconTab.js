import CheckBoxField from '../../inputFields/CheckBoxField'
import FileUploadField from '../../inputFields/FileUploadField'

const CategoriesIconTab = ({ values, setFieldValue }) => {
    return (
        <>
            <FileUploadField name="categoriesIconImage" title='image' id="categoriesIconImage" showImage={values['categoriesIconImage']} type="file" values={values} setFieldValue={setFieldValue} />
            <CheckBoxField name={`[content][categories_icon_list][status]`} title="status" />

        </>
    )
}

export default CategoriesIconTab
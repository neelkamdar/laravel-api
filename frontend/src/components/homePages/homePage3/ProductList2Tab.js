
import { useTranslation } from "react-i18next";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";

const ProductList2Tab = ({ productData, setSearch }) => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][products_list_2][title]`, placeholder: t("enter_title"), title: "title" }, { name: `[content][products_list_2][description]`, placeholder: t("enter_description"), title: "description", type: "textarea" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productList2Product',
                        title: "products",
                        inputprops: {
                            name: 'productList2Product',
                            id: 'productList2Product',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][products_list_2][status]`} title="status" />
        </>
    )
}
export default ProductList2Tab
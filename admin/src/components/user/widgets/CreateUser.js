
import { AllCountryCode } from "../../../data/AllCountryCode";
import SearchableSelectInput from "../../inputFields/SearchableSelectInput";
import CheckBoxField from '../../inputFields/CheckBoxField'
import SimpleInputField from "../../inputFields/SimpleInputField";

import { useTranslation } from "react-i18next";

const CreateUser = ({ updateId, fixedRole, rolesData }) => {
    
    const { t } = useTranslation("common");
    return (
        <>
            <SimpleInputField
                nameList={[
                    { name: "name", placeholder: t("enter_full_name"), require: "true" },
                    {
                        type: "email",
                        name: "email",
                        placeholder: t("enter_email_address"),
                        require: "true",
                    },
                ]}
            />
            <div className="country-input mb-4">
                <SimpleInputField
                    nameList={[
                        {
                            name: "phone",
                            type: "number",
                            placeholder: t("enter_phone_number"),
                            require: "true",
                        },
                    ]}
                />
                <SearchableSelectInput
                    nameList={[
                        {
                            name: "country_code",
                            notitle: "true",
                            inputprops: {
                                name: "country_code",
                                id: "country_code",
                                options: AllCountryCode,
                            },
                        },
                    ]}
                />

            </div>
            <div>
                {!updateId && (
                    <>
                        <SimpleInputField
                            nameList={[
                                { name: "password", type: "password", placeholder: t("enter_password"), require: 'true' },
                                { name: "password_confirmation", title: "confirm_password", type: "password", placeholder: t("enter_confirm_password"), require: 'true' },
                            ]}
                        />
                    </>
                )}
            </div>

            {!fixedRole && (
                <>
                    <SearchableSelectInput
                        nameList={[
                            {
                                name: "role_id",
                                require: "true",
                                title: "role",
                                inputprops: {
                                    name: "role_id",
                                    id: "role_id",
                                    options: rolesData || [],
                                    defaultOption: "Select state",
                                },
                            },
                        ]}
                    />
                    <CheckBoxField name="status" />
                </>
            )}
        </>
    );
};

export default CreateUser;

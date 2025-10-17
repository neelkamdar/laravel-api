
import StepWrapper from "./StepWrapper";
import SimpleInputField from "../../inputFields/SimpleInputField";
import CheckBoxField from "../../inputFields/CheckBoxField";

import { useTranslation } from "react-i18next";

const StepTab = () => {
    
    const { t } = useTranslation( 'common');
    return (
        <>
            <CheckBoxField name="[options][seller][steps][status]" title="status" />
            <SimpleInputField nameList={[{ name: '[options][seller][steps][title]', title: 'title', placeholder: t('enter_title') }]} />
            <StepWrapper stepDetails={{ value: "step_1", title: "step_1" }} />
            <StepWrapper stepDetails={{ value: "step_2", title: "step_2" }} />
            <StepWrapper stepDetails={{ value: "step_3", title: "step_3" }} />
        </>
    )
}

export default StepTab
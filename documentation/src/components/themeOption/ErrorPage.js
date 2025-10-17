import { Col, Row } from 'reactstrap';
import CheckBoxField from '../inputFields/CheckBoxField';
import SimpleInputField from '../inputFields/SimpleInputField';

import { useTranslation } from "react-i18next";

const ErrorPage = ({ values }) => {

  const { t } = useTranslation('common');
  return (
    <>
      <Row>
        <Col sm="12">
          <SimpleInputField
            nameList={[
              { name: '[options][error_page][error_page_content]', type: "textarea", title: "error_page_content", placeholder: t("enter_error_page_content") }
            ]} />
          <CheckBoxField name="[options][error_page][back_button_enable]" title="back_button" />
          {values['options']?.['error_page']?.['back_button_enable'] &&
            <SimpleInputField
              nameList={[
                { name: '[options][error_page][back_button_text]', title: "back_button_text", placeholder: t("enter_back_button_text") }
              ]} />
          }
        </Col>
      </Row>
    </>
  )
}

export default ErrorPage
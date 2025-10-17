import { Col } from 'reactstrap';
import Btn from '@/elements/buttons/Btn';
import { useTranslation } from "react-i18next";

const FormBtn = ({ title, classes = {}, loading }) => {
  const { t } = useTranslation( 'common');
  return (
    <Col xs={12}>
      <Btn className={classes.btnClass ? classes.btnClass : ''} type='submit' loading={Number(loading)}>
        {t(title)}
      </Btn>
    </Col>
  );
};

export default FormBtn;

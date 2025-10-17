import { useTranslation } from "react-i18next";
import { Button, Spinner } from "reactstrap";

const Btn = (props) => {
  
  const { t } = useTranslation( 'common');
  const { loading, title, children, ...rest } = props;
  
  return (
    <Button {...rest}>
      {loading ?
        <div className={`d-flex position-relative${loading ? " spinning" : ""}`}>
          {loading}
          {children}
          {t(title)}
        </div> :
        <>
          {children}
          {t(title)}
        </>
      }
    </Button>
  );
};
export default Btn;

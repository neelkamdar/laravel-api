import { useContext } from "react";
import { Button } from "reactstrap";

import { useTranslation } from "react-i18next";

const Btn = (props) => {
  
  const { t } = useTranslation( 'common');
  const { loading, title, children, ...rest } = props;
  return (
    <Button {...rest}>
      {loading ?
        <div className={`d-flex position-relative${loading ? " spinning" : ""}`}>
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

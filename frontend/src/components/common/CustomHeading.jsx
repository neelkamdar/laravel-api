import { useContext } from 'react';
import { useTranslation } from "react-i18next";

const CustomHeading = (props) => {
  const { t } = useTranslation('common');
  const { title, subTitle, svgUrl, customClass, customTitleClass, svgClass = '' } = props;

  return (
    <div className={`${customTitleClass ? customTitleClass : customClass ? customClass + ' ' : 'title'}`}>
      <h2>{t(title)}</h2>
      {svgUrl && <span className='title-leaf'>{svgUrl}</span>}
      {subTitle && <p>{t(subTitle)}</p>}
      {props.children && props.children}
    </div>
  );
};

export default CustomHeading;

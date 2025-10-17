import { useContext } from 'react';
import Link from 'next/link';

import { useTranslation } from "react-i18next";
import CompareContext from '@/helper/compareContext';

const StickyCompare = () => {
  
  const { compareState } = useContext(CompareContext);
  const { t } = useTranslation( 'common');
  if (compareState?.length == 0) {
    return null;
  } else
    return (
      <div className='compare-fix'>
        <Link href={`/compare`}>
          <h5>
            {t("compare")} <span>{`(${compareState?.length})`}</span>
          </h5>
        </Link>
      </div>
    );
};

export default StickyCompare;

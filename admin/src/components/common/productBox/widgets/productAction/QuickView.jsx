import { useState } from 'react';
import { RiEyeLine } from 'react-icons/ri';
import VariationModal from '../variationModal'


const QuickView = ({ productObj ,hideAction}) => {
  const [variationModal, setVariationModal] = useState('');
  return (
    <>
      {!hideAction?.includes('view') &&
        <li title='View' onClick={() => setVariationModal(productObj?.id)}>
          <a>
            <RiEyeLine />
          </a>
        </li>
      }
      <VariationModal setVariationModal={setVariationModal} variationModal={variationModal} productObj={productObj} />
    </>
  );
};

export default QuickView;

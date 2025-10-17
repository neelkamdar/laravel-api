import QuickView from './QuickView';
import AddToWishlist from './AddToWishlist';
import AddToCompare from './AddToCompare';

const ProductBoxAction = ({ productObj,listClass, actionsToHide}) => {
  return (
    <ul className={listClass}>
      <QuickView productObj={productObj} />
      <AddToCompare productObj={productObj} />
      <AddToWishlist productObj={productObj} hideAction={actionsToHide}/>
    </ul>
  );
};

export default ProductBoxAction;

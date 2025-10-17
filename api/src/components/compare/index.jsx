'use client';
import Breadcrumb from '../common/Breadcrumb';
import WrapperComponent from '../common/WrapperComponent';
import CompareData from './CompareData';

const CompareList = () => {
  return (
    <>
      <Breadcrumb title={'compare'} subNavigation={[{ name: 'compare' }]} />
      <WrapperComponent classes={{ sectionClass: 'compare-section section-b-space', row: 'g-0 compare-row' }} customCol={true}>
        <CompareData />
      </WrapperComponent>
    </>
  );
};

export default CompareList;

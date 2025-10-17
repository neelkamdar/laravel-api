import { useContext } from 'react';
import Link from 'next/link';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import CategoryContext from '@/helper/categoryContext';
import NoDataFound from '@/components/common/NoDataFound';

const FooterCategory = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory('product');
  return (
        <ul>
          {themeOption?.footer?.footer_categories?.length > 0 ? (
            categoryData
              ?.filter((elem) => themeOption?.footer?.footer_categories.includes(elem.id))
              .map((result, i) => (
                <li key={i}>
                  <Link href={`/collections?category=${result?.slug}`} className='text-content'>
                    {result?.name}
                  </Link>
                </li>
              ))
          ) : (
            <NoDataFound
              data={{
                customClass: 'no-data-footer',
                title: 'no_category_found',
              }}
            />
          )}
        </ul>
  );
};

export default FooterCategory;

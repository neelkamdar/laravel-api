import { useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import HeaderLogo from './common/HeaderLogo';
import ResponsiveSearch from './common/ResponsiveSearch';
import { useHeaderScroll } from '@/utils/HeaderScroll';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import StandardRightSide from './rightSideHeader/StandardRightSide';
import HeaderTopBar from './common/HeaderTopBar';
import StandardCategory from './standardHeader/StandardCategory';
import HeaderSearchBar from './common/HeaderSearchBar';

const StandardHeader = ({headerClass}) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [ searchBarOpen ,setSearchBarOpen] =useState(false)

  const UpScroll = useHeaderScroll(false);
  return (
    <header className={`header-2 ${themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''}  ${themeOption?.header?.sticky_header_enable && !UpScroll ? headerClass : ''}`}>
      {themeOption?.header?.page_top_bar_enable && <HeaderTopBar />}
      <div className='top-nav top-header sticky-header sticky-header-3'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs={12}>
              <div className='navbar-top'>
                <HeaderLogo />
                <HeaderSearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} ResponsiveSearch />
                <HeaderSearchBar style={"standard"} />
                <StandardRightSide setSearchBarOpen={setSearchBarOpen} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12}>
            <StandardCategory />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default StandardHeader;

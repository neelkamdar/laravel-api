import { Col, Row } from 'reactstrap';
import HeaderLogo from './common/HeaderLogo';
import ResponsiveSearch from './common/ResponsiveSearch';
import MinimalNavMenu from './minimalHeaderComponent/MinimalNavMenu';
import SearchBox from './minimalHeaderComponent/SearchBox';
import SupportBox from './minimalHeaderComponent/SupportBox';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useContext, useState } from 'react';
import { useHeaderScroll } from '@/utils/HeaderScroll';
import HeaderSearchBar from './common/HeaderSearchBar';

const MinimalHeader = ({headerClass}) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const [ searchBarOpen ,setSearchBarOpen] =useState(false)
  const UpScroll = useHeaderScroll(false);
  return (
    <header className={`header-3 ${themeOption?.header?.sticky_header_enable && UpScroll ? 'active' : ''} ${themeOption?.header?.sticky_header_enable && !UpScroll ? headerClass : ''}`}>
      <div className='top-nav sticky-header sticky-header-2'>
        <div className='container-fluid-lg'>
          <Row>
            <Col xs={12}>
              <div className='navbar-top'>
                <HeaderLogo extraClass="nav-logo" />
                <HeaderSearchBar searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen} ResponsiveSearch />
                <HeaderSearchBar style={"minimal"} />
                <SupportBox />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className='container-fluid-lg'>
        <Row>
          <Col xs={12} className='position-relative'>
            <MinimalNavMenu setSearchBarOpen={setSearchBarOpen} />
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default MinimalHeader;

import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { Input, InputGroup, InputGroupText } from 'reactstrap';

const ResponsiveSearch = ({first,setfirst}) => {
  return (
    <div className={`search-full ${first ? "open":""} `}>
      <InputGroup>
        <InputGroupText>
          <RiSearchLine className='font-light' />
        </InputGroupText>
        <Input type='text' className='form-control search-type' placeholder='Search here..' />
        <InputGroupText className='close-search'>
          <RiCloseLine className='font-light' onClick={()=>setfirst(prev =>!prev)} />
        </InputGroupText>
      </InputGroup>
    </div>
  );
};

export default ResponsiveSearch;

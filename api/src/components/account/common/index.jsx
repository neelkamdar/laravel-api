import Avatar from '@/components/common/Avatar';
import AccountContext from '@/helper/accountContext';
import useCreate from '@/utils/hooks/useCreate';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import { RiCloseFill, RiImageEditFill, RiPencilFill } from 'react-icons/ri';
import { Input } from 'reactstrap';
import coverImage from '../../../../public/assets/images/inner-page/cover-img.jpg';

const SidebarProfile = () => {
  const { accountData ,refetch } = useContext(AccountContext);
  const fileInputRef = useRef(null);
  const handleImageLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const { mutate } = useCreate(`/updateProfile`, false, false, 'profile updated successfully',()=>refetch());
 const  handleOnChange = (event) =>{
   const formData = new FormData();
   formData.append('profile_image_id', "");
   formData.append('profile_image', event.target.files[0]);
   formData.append('_method', 'PUT');
   mutate(formData)
 }

 const handleRemove = () =>{
  const formData = new FormData();
   formData.append('profile_image_id', "");
   formData.append('_method', 'PUT');
   mutate(formData)
 }
  return (
    <>
      <div className='profile-box'>
        <div className='cover-image' >
          {coverImage && <Image src={coverImage} className='img-fluid' alt='cover-image' height={150} width={378} />}
        </div>
        <div className='profile-contain'>
          <div className='profile-image'>
            <div className='position-relative'>
              <div className='user-round'>
                <Avatar data={accountData?.profile_image} name={accountData?.name} customImageClass={'update_img'} alt='profile-image' height={108} width={108}>
                </Avatar>
              </div>
              <div className="user-icon" onClick={handleImageLabelClick}>
                <RiImageEditFill className='d-lg-block d-none' />
                <Input onChange={handleOnChange}  innerRef={fileInputRef} className="d-none" type="file" accept="image/*" name="imageUpload" />
                <RiPencilFill className='d-lg-none d-block' />
              </div>
              {accountData?.profile_image &&  accountData?.profile_image?.original_url && <div className="user-icon-2" onClick={handleRemove}>
                <RiCloseFill />
              </div> }
            </div>
          </div>

          <div className='profile-name'>
            <h3>{accountData?.name}</h3>
            <h6 className='text-content'>{accountData?.email}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarProfile;

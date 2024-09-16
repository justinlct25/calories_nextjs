import React from 'react';
import { LockIcon, UnlockIcon} from 'lucide-react';
import ToggleBtn from '../util/ToggleBtn';

interface ActivityPublicToggleButtonProps {
  isPublic: boolean;
  activityId: number | undefined;
}

const handleOn =  () => {
    console.log('handleOn');
}
const handleOff =  () => {
    console.log('handleOff');
}

const ActivityPublicToggleButton: React.FC<ActivityPublicToggleButtonProps> = ({ isPublic, activityId }) => {
    
    // const handleOn = async () => {
    //     try {
    //       console.log('handleOn');
    //       const res = await fetch(`/api/activities/${activityId}/public/on`);
    //       const data = await res.json();
    //       console.log(data);
    //     } catch (error) {
    //       console.error('Error making public:', error);
    //     }
    //   };
      
    //   const handleOff = async () => {
    //     try {
    //       console.log('handleOff');
    //       const res = await fetch(`/api/activities/${activityId}/public/off`);
    //       const data = await res.json();
    //       console.log(data);
    //     } catch (error) {
    //       console.error('Error making private:', error);
    //     }
    //   };
    

  return (
    <ToggleBtn 
      isToggleOn={isPublic} 
      handleOn={handleOn} 
      handleOff={handleOff}
      label={
        <div className="ml-3 mr-1 text-gray-700 font-medium text-white">
          {isPublic ? <UnlockIcon/> : <LockIcon/>}
        </div>
      } 
    />
  );
};

export default ActivityPublicToggleButton;
import React from 'react';
import { LockIcon, UnlockIcon} from 'lucide-react';
import ToggleBtn from '../util/ToggleBtn';
import ActivityPublicConfirm from './ActivityPublicConfirm';
import { set } from 'zod';

interface ActivityPublicToggleButtonProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number | undefined;
}



const ActivityPublicToggleButton: React.FC<ActivityPublicToggleButtonProps> = ({ isPublic, setIsPublic, activityId }) => {
    const [isActivityPublicConfirmOpen, setIsActivityPublicConfirmOpen] = React.useState<boolean>(false);
    
    const handleOn = async () => {
        setIsActivityPublicConfirmOpen(true);
      };

      const setActivityPublic = async (activityId: number) => {
        try {
            const res = await fetch(`/api/activities/${activityId}/public/on`, {
              method: 'POST',
            });
            const data = await res.json();
              setIsPublic(data.isPublic);
              setIsActivityPublicConfirmOpen(false);
          } catch (error) {
            console.error('Error making public:', error);
          }
      }
      
      const handleOff = async () => {
        try {
          const res = await fetch(`/api/activities/${activityId}/public/off`, {
            method: 'POST',
          });
          const data = await res.json();
            setIsPublic(data.isPublic);
        } catch (error) {
          console.error('Error making private:', error);
        }
      };
    

  return (
    <>
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
        {activityId && <ActivityPublicConfirm open={isActivityPublicConfirmOpen} onClose={() => setIsActivityPublicConfirmOpen(false)} activityId={activityId} confirmSetPublic={setActivityPublic} />}
    </>
  );
};

export default ActivityPublicToggleButton;
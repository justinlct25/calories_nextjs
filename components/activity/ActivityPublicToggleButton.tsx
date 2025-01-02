import React from 'react';
import { LockIcon, UnlockIcon} from 'lucide-react';
import ToggleBtn from '../util/ToggleBtn';
import ActivityPublicConfirm from './ActivityPublicConfirm';
import { Loading } from '../ui/loading';
import { useToast } from '../ui/use-toast';

interface ActivityPublicToggleButtonProps {
  isPublic: boolean;
  setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number | undefined;
}



const ActivityPublicToggleButton: React.FC<ActivityPublicToggleButtonProps> = ({ isPublic, setIsPublic, activityId }) => {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isActivityPublicConfirmOpen, setIsActivityPublicConfirmOpen] = React.useState<boolean>(false);
    
    const handleOn = async () => {
        setIsActivityPublicConfirmOpen(true);
      };

      const setActivityPublic = async (activityId: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${activityId}/public/on`, {
              method: 'POST',
            });
            const data = await res.json();
            if (res.status == 200) {
              toast({
                title: "Success",
                description: data.message,
              })
              setIsActivityPublicConfirmOpen(false);
              setIsPublic(data.isPublic);
            } else {
              toast({
                title: "Error",
                description: data.message,
                variant: 'destructive'
              })
            }
          } catch (error) {
            console.error('Error making public:', error);
          } finally {
            setLoading(false);
          }
      }
      
      const handleOff = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/activities/${activityId}/public/off`, {
            method: 'POST',
          });
          const data = await res.json();
          if (res.status == 200) {
            toast({
              title: "Success",
              description: data.message,
            })
            setIsPublic(data.isPublic);
          } else {
            toast({
              title: "Error",
              description: data.message,
              variant: 'destructive'
            })
          }
        } catch (error) {
          console.error('Error making private:', error);
        } finally {
          setLoading(false);
        }
      };
    

  return (
    <div className="flex items-center w-24">
      {loading ? <Loading hasText={false} hasHeight={false} /> : (
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
      )}
        {activityId && <ActivityPublicConfirm open={isActivityPublicConfirmOpen} onClose={() => setIsActivityPublicConfirmOpen(false)} activityId={activityId} confirmSetPublic={setActivityPublic} />}
    </div>
  );
};

export default ActivityPublicToggleButton;
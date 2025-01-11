import React from 'react';
import { LockIcon, UnlockIcon } from 'lucide-react';
import ToggleBtn from '../util/ToggleBtn';
import ActivityOpenedConfirm from './ActivityOpenedConfirm';
import { Loading } from '../ui/loading';
import { useToast } from '../ui/use-toast';

interface ActivityOpenedToggleButtonProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number | undefined;
}

const ActivityOpenedToggleButton: React.FC<ActivityOpenedToggleButtonProps> = ({ isOpened, setIsOpened, activityId }) => {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [isActivityOpenedConfirmOpen, setIsActivityOpenedConfirmOpen] = React.useState<boolean>(false);

    const handleOn = async () => {
        setIsActivityOpenedConfirmOpen(true);
    };

    const setActivityOpened = async (activityId: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${activityId}/closed/off`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                setIsActivityOpenedConfirmOpen(false);
                setIsOpened(true);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error opening activity:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOff = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${activityId}/closed/on`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                setIsOpened(false);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error closing activity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center w-24">
            {loading ? <Loading hasText={false} hasHeight={false} /> : (
                <ToggleBtn 
                    isToggleOn={isOpened} 
                    handleOn={handleOn} 
                    handleOff={handleOff}
                    onIcon={<UnlockIcon />}
                    offIcon={<LockIcon />}
                />
            )}
            {activityId && <ActivityOpenedConfirm open={isActivityOpenedConfirmOpen} onClose={() => setIsActivityOpenedConfirmOpen(false)} activityId={activityId} confirmSetOpened={setActivityOpened} />}
        </div>
    );
};

export default ActivityOpenedToggleButton;
import React from 'react';
import { LockIcon, UnlockIcon } from 'lucide-react';
import ToggleBtn from '../util/ToggleBtn';
import { Loading } from '../ui/loading';
import { useToast } from '../ui/use-toast';

interface ActivityLockToggleButtonProps {
  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
  activityId: number | undefined;
}

const ActivityLockToggleButton: React.FC<ActivityLockToggleButtonProps> = ({ isLocked, setIsLocked, activityId }) => {
    const { toast } = useToast();
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleOn = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${activityId}/lock/on`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                setIsLocked(true);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error locking activity:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOff = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/activities/${activityId}/lock/off`, {
                method: 'POST',
            });
            const data = await res.json();
            if (res.status === 200) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                setIsLocked(false);
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error unlocking activity:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center w-24">
            {loading ? <Loading hasText={false} hasHeight={false} /> : (
                <ToggleBtn 
                    isToggleOn={isLocked} 
                    handleOn={handleOn} 
                    handleOff={handleOff}
                    onIcon={<LockIcon />}
                    offIcon={<UnlockIcon />}
                />
            )}
        </div>
    );
};

export default ActivityLockToggleButton;
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, IconButton } from '@mui/material';
import { AttendanceStatus } from '@/drizzle/queries/attendance-status.query';
import { Check, Edit, Pencil, X } from 'lucide-react';
import { useToast } from "../ui/use-toast";
import { Loading } from '../ui/loading';

interface ActivityStatusSelectionProps {
  isAdmin: boolean
  options: AttendanceStatus[];
  value: string;
  valueKey: string;
  updateFunc: (id?: number) => any;
}

const ActivityStatusSelection: React.FC<ActivityStatusSelectionProps> = ({ isAdmin, options, value, valueKey, updateFunc }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<AttendanceStatus | undefined>(undefined);

  useEffect(() => {
    setSelectedOption(options.find(option => option.name === value));
  }, [options, value]);

  const handleChange = (event: any) => {
    setSelectedOption(options.find(option => option.name === event.target.value));
  };

  const handleConfirm = async () => {
    if (selectedOption && selectedOption.name !== currentValue) {
      setLoading(true);
      const res = await updateFunc(selectedOption.id);
      const data = await res.json();
      if (res.status == 200) {
        toast({
          title: "Success",
          description: data.message,
        })
        setCurrentValue(selectedOption.name);
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: 'destructive'
        })
      }
      setLoading(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="text-white h-25 flex items-center">
      {loading ? <div className="pl-6"><Loading hasText={false} hasHeight={false} justifyCenter={false} /></div> : (
        !isEditing ? (
          <div className="flex items-center">
            <div>{capitalizeFirstLetter(currentValue)}</div>
            {isAdmin && 
              <IconButton onClick={() => setIsEditing(true)} className="text-white">
                <Edit size={15} className="text-white" />
              </IconButton>
            }
          </div>
        ) : (
          <div className="flex items-center">
            <Select value={selectedOption ? selectedOption.name : ''} onChange={handleChange}>
              {options.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  <span className={selectedOption ? (selectedOption.name === option.name ? 'text-white' : '') : ''}>
                    {capitalizeFirstLetter(option.name)}
                  </span>
                </MenuItem>
              ))}
            </Select>
            <div>
              <IconButton onClick={handleConfirm} className="text-white">
                <Check className="text-white" />
              </IconButton>
              <IconButton onClick={handleCancel} className="text-white">
                <X className="text-white" />
              </IconButton>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ActivityStatusSelection;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
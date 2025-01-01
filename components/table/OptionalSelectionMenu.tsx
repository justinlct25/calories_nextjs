import React, { useState } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, IconButton } from '@mui/material';
import { AttendanceStatus } from '@/drizzle/queries/attendance-status.query';
import { Check, Edit, X } from 'lucide-react';
import { useToast } from "../ui/use-toast";
import { Loading } from '../ui/loading';


interface OptionalSelectionMenuProps {
  options: AttendanceStatus[];
  value: string;
  valueKey: string;
  updateFunc: (updateObj: any) => any;
}

const OptionalSelectionMenu: React.FC<OptionalSelectionMenuProps> = ({ options, value, valueKey, updateFunc }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.name === value));

  const handleChange = (event: any) => {
    setSelectedOption(options.find(option => option.name === event.target.value));
  };

  const handleConfirm = async () => {
    if (selectedOption && selectedOption.name !== currentValue) {
      setLoading(true);
      const updateObj = { [valueKey]: selectedOption.id };
      const res = await updateFunc(updateObj);
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
  
    return (
      <div className="text-white">
        { loading ? <Loading hasText={false} hasHeight={false} /> : (
          !isEditing ? (
            <div className="flex items-center">
              <div>{capitalizeFirstLetter(currentValue)}</div>
              <IconButton onClick={() => setIsEditing(true)} className="text-white">
                <Edit className="text-white" />
              </IconButton>
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
                <IconButton onClick={() => setIsEditing(false)} className="text-white">
                  <X className="text-white" />
                </IconButton>
              </div>
            </div>
          )
        )}
      </div>
    );
  };
  
  export default OptionalSelectionMenu;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
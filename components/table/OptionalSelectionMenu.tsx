import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, IconButton, TextField } from '@mui/material';
import { AttendanceStatus } from '@/drizzle/queries/attendance-status.query';
import { Check, Cross, CrossIcon, Edit, X } from 'lucide-react';

interface OptionalSelectionMenuProps {
  options: AttendanceStatus[];
  value: string;
  updateFunc: (updateObj: any) => any;
}

const OptionalSelectionMenu: React.FC<OptionalSelectionMenuProps> = ({ options, value, updateFunc }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.name === value));

  const handleChange = (event: any) => {
    setSelectedOption(options.find(option => option.name === event.target.value));
  };

  const handleConfirm = async () => {
    if (selectedOption && selectedOption.name !== currentValue) {
      const updateObj = { statusId: selectedOption.id };
      const res = await updateFunc(updateObj);
      if (res.status == 200) {
        setCurrentValue(selectedOption.name);
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };
  
    return (
      <div className="text-white">
        {!isEditing ? (
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
        )}
      </div>
    );
  };
  
  export default OptionalSelectionMenu;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import { MenuItem, IconButton, TextField } from '@mui/material';
import { AttendanceStatus } from '@/drizzle/queries/attendance-status.query';
import { Check, Cross, CrossIcon, Edit, X } from 'lucide-react';

interface SelectionMenuProps {
  options: AttendanceStatus[];
  value: string;
  onChange: (value: string) => void;
}

const SelectionMenu: React.FC<SelectionMenuProps> = ({ options, value, onChange }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const handleChange = (event: any) => {
      setSelectedValue(event.target.value);
    };
  
    const handleConfirm = async () => {
      setIsEditing(false);
      // Call your fetch function here. For example:
      // const result = await fetchAndUpdateStatus(selectedValue);
      // if (result.success) {
        // onChange(selectedValue);
        setCurrentValue(selectedValue);
      // }
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
            <Select value={selectedValue} onChange={handleChange}>
              {options.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                    <span className={selectedValue === option.name ? 'text-white' : ''}>
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
  
  export default SelectionMenu;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
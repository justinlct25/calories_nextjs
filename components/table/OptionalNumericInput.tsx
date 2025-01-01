import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Check, Edit, X } from 'lucide-react';
import { useToast } from "../ui/use-toast";
import { Loading } from '../ui/loading';

interface NumericInputMenuProps {
  value: number;
  valueKey: string;
  updateFunc: (updateObj: any) => any;
}

const NumericInputMenu: React.FC<NumericInputMenuProps> = ({ value, valueKey, updateFunc }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value ? value.toString() : ""); // Input value as string for better control

  const handleConfirm = async () => {
    const numericValue = Number(inputValue);
    if (!isNaN(numericValue) && numericValue !== currentValue) {
      setLoading(true);
      const updateObj = { [valueKey]: numericValue };
      const res = await updateFunc(updateObj);
      const data = await res.json();
      if (res.status === 200) {
        toast({
          title: "Success",
          description: data.message,
        });
        setCurrentValue(numericValue);
        setIsEditing(false);
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: 'destructive'
        });
      }
      setLoading(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and an optional negative sign
    if (/^-?\d*$/.test(value)) {
      setInputValue(value); // Update inputValue if it matches the pattern
    }
  };

  return (
    <div className="text-white">
      {loading ? <Loading hasText={false} hasHeight={false} /> : (
        !isEditing ? (
          <div className="flex items-center">
            <div>{(currentValue && currentValue !== 0) ? currentValue : "-"}</div>
            <IconButton onClick={() => setIsEditing(true)} className="text-white">
              <Edit className="text-white" />
            </IconButton>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="text" // Using type="text" for better control over allowed input
              value={inputValue}
              onChange={handleChange}
              className="bg-transparent border border-white text-white p-1 rounded w-20"
              placeholder="Enter a number"
              inputMode="numeric" // Hints the keyboard to show numbers on mobile
            />
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

export default NumericInputMenu;
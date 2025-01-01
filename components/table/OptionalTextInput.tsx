import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Check, Edit, X } from 'lucide-react';
import { useToast } from "../ui/use-toast";
import { Loading } from '../ui/loading';

interface OptionalTextInputProps {
  value: string;
  valueKey: string;
  updateFunc: (updateObj: any) => any;
}

const OptionalTextInput: React.FC<OptionalTextInputProps> = ({ value, valueKey, updateFunc }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value || ""); // Input value as string for better control

  const handleConfirm = async () => {
    if (inputValue !== currentValue) {
      setLoading(true);
      const updateObj = { [valueKey]: inputValue };
      const res = await updateFunc(updateObj);
      const data = await res.json();
      if (res.status === 200) {
        toast({
          title: "Success",
          description: data.message,
        });
        setCurrentValue(inputValue);
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
    setInputValue(e.target.value);
  };

  return (
    <div className="text-white">
      {loading ? <Loading hasText={false} hasHeight={false} /> : (
        !isEditing ? (
          <div className="flex items-center">
            <div>{currentValue || "-"}</div>
            <IconButton onClick={() => setIsEditing(true)} className="text-white">
              <Edit className="text-white" />
            </IconButton>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              className="bg-transparent border border-white text-white p-1 rounded w-20"
              placeholder="Enter text"
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

export default OptionalTextInput;
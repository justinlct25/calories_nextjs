import { LockIcon, UnlockIcon } from 'lucide-react';
import { useState, useEffect, use } from 'react';

interface ToggleBtnProps {
  isToggleOn: boolean;
  handleOn: () => void;
  handleOff: () => void;
  onIcon?: JSX.Element;
  offIcon?: JSX.Element;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ isToggleOn, handleOn, handleOff, onIcon, offIcon}) => {

  const handleToggle = async () => {
    if (!isToggleOn) {
      await handleOn();
    } else {
      await handleOff();
    }

  };

  return (
    <label className="flex items-center cursor-pointer z-100">
      <div className="ml-3 mr-1 text-gray-700 font-medium text-white">
        {isToggleOn ? onIcon : offIcon}
      </div>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isToggleOn} onChange={handleToggle} />
        <div className={`block w-14 h-8 rounded-full ${isToggleOn ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isToggleOn ? 'transform translate-x-full' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleBtn;
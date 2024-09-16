import { LockIcon, UnlockIcon } from 'lucide-react';
import { useState, useEffect, use } from 'react';

interface ToggleBtnProps {
  isToggleOn: boolean;
  handleOn: () => void;
  handleOff: () => void;
  label?: JSX.Element;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ isToggleOn, handleOn, handleOff, label}) => {
  const [isOn, setIsOn] = useState(isToggleOn);
  
  // useEffect(() => {
  //   const updatePublicity = async () => {
  //     // if (isOn) {
  //     //   // if (typeof handleOn === 'function') {
  //     //     handleOn();
  //     //   // }
  //     // } else {
  //     //   // if (typeof handleOff === 'function') {
  //     //     handleOff();
  //     //   // }
  //     // }
  //   };
  //   updatePublicity();
  // }, [isOn, handleOn, handleOff]); 

  const handleToggle = async () => {
    setIsOn(!isOn);
    if (isOn) {
        handleOn();
    } else {
        handleOff();
    }

  };

  return (
    <label className="flex items-center cursor-pointer z-100">
      <div className="ml-3 mr-1 text-gray-700 font-medium text-white">
        {isOn ? <UnlockIcon/> : <LockIcon/>}
      </div>
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isOn} onChange={handleToggle} />
        <div className={`block w-14 h-8 rounded-full ${isOn ? 'bg-yellow-500' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isOn ? 'transform translate-x-full' : ''}`}></div>
      </div>
    </label>
  );
};

export default ToggleBtn;
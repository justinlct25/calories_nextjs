import React from 'react';

interface ModalDialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ children, open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
      <div className="bg-[#252628] p-10 rounded-lg relative max-w-lg">
        <button onClick={onClose} className="absolute top-0 right-0 m-2 text-black text-2xl">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalDialog;
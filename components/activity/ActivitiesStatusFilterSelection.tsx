import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { ACTIVITY_FILTER_STATUS_MAPPING } from '@/utils/constants';

interface ActivitiesStatusFilterSelectionProps {
  value: keyof typeof ACTIVITY_FILTER_STATUS_MAPPING;
  setValueState: React.Dispatch<React.SetStateAction<keyof typeof ACTIVITY_FILTER_STATUS_MAPPING>>;
}

const ActivitiesStatusFilterSelection: React.FC<ActivitiesStatusFilterSelectionProps> = ({ value, setValueState }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: keyof typeof ACTIVITY_FILTER_STATUS_MAPPING) => {
    setValueState(newValue);
  };

  return (
    <div className="w-full flex justify-center">
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          style: {
            backgroundColor: '#FFD700', // Yellow color for the indicator
          },
        }}
        className="text-white"
      >
        <Tab
          label="All"
          value="ALL"
          sx={{
            color: 'white',
            '&.Mui-selected': {
              color: '#FFD700',
            },
            '&:hover': {
              color: '#FFD700',
            },
          }}
        />
        <Tab
          label="Upcoming"
          value="UPCOMING"
          sx={{
            color: 'white',
            '&.Mui-selected': {
              color: '#FFD700',
            },
            '&:hover': {
              color: '#FFD700',
            },
          }}
        />
        <Tab
          label="Ended"
          value="ENDED"
          sx={{
            color: 'white',
            '&.Mui-selected': {
              color: '#FFD700',
            },
            '&:hover': {
              color: '#FFD700',
            },
          }}
        />
      </Tabs>
    </div>
  );
};

export default ActivitiesStatusFilterSelection;
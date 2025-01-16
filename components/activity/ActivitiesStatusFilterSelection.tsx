import React from 'react';
import { Tabs, Tab } from '@mui/material';


interface ActivitiesStatusFilterSelectionProps {

    value: keyof typeof statusFilterMapping;
  
    setValueState: React.Dispatch<React.SetStateAction<keyof typeof statusFilterMapping>>;
  
  }
  

const ActivitiesStatusFilterSelection: React.FC<ActivitiesStatusFilterSelectionProps> = ({ value, setValueState }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: keyof typeof statusFilterMapping) => {
    setValueState(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="All" value="all" />
      <Tab label="Upcoming" value="upcoming" />
      <Tab label="Completed" value="completed" />
    </Tabs>
  );
};

export default ActivitiesStatusFilterSelection;

export const statusFilterMapping = {
  all: ['all'],
  upcoming: ['pending', 'upcoming', 'ongoing', 'rescheduled'],
  ended: ['completed', 'cancelled'],
};
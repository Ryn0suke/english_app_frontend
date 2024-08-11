import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ModalProps {
  value: number;
  setValue: (qNum: number) => void;
}

const NumberInput: React.FC<ModalProps> = ({ value, setValue }) => {
  const handleIncrement = () => {
    setValue(Math.min(value + 1, 100));
  };

  const handleDecrement = () => {
    setValue(Math.max(value - 1, 0));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setValue(newValue);
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: { min: 0, max: 100 }
      }}
      variant="outlined"
    />
  );
};

export default NumberInput;

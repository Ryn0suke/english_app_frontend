import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { green, yellow, red, grey } from '@mui/material/colors';

interface RecieveProps {
    state1: boolean;
    state2: boolean;
    state3: boolean;
    isLock: boolean;
}

export const GreenCheckBox = ({ state, toggleState, isLock }: { state: boolean, toggleState?: () => void, isLock: boolean }) => (
    <Checkbox
        checked={state}
        onChange={toggleState}
        icon={<CheckBoxOutlineBlankIcon sx={{ color: green[500] }} />}
        checkedIcon={<CheckBoxIcon sx={{ color: green[500] }} />}
        disabled={isLock}
    />
);

export const YellowCheckBox = ({ state, toggleState, isLock }: { state: boolean, toggleState?: () => void, isLock: boolean }) => (
    <Checkbox
        checked={state}
        onChange={toggleState}
        icon={<CheckBoxOutlineBlankIcon sx={{ color: yellow[700] }} />}
        checkedIcon={<CheckBoxIcon sx={{ color: yellow[700] }} />}
        disabled={isLock}
    />
);

export const RedCheckBox = ({ state, toggleState, isLock }: { state: boolean, toggleState?: () => void, isLock: boolean }) => (
    <Checkbox
        checked={state}
        onChange={toggleState}
        icon={<CheckBoxOutlineBlankIcon sx={{ color: red[500] }} />}
        checkedIcon={<CheckBoxIcon sx={{ color: red[500] }} />}
        disabled={isLock}
    />
);

export const GreyCheckBox = ({ state, toggleState, isLock }: { state: boolean, toggleState?: () => void, isLock: boolean }) => (
    <Checkbox
        checked={state}
        onChange={toggleState}
        icon={<CheckBoxOutlineBlankIcon sx={{ color: grey[500] }} />}
        checkedIcon={<CheckBoxIcon sx={{ color: grey[500] }} />}
        disabled={isLock}
    />
);

const CheckState: React.FC<RecieveProps> = ({ state1, state2, state3, isLock }) => {
    return (
        <>
            <GreenCheckBox state={state1} isLock={isLock} />
            <YellowCheckBox state={state2} isLock={isLock} />
            <RedCheckBox state={state3} isLock={isLock} />
        </>
    );
};

export default CheckState;

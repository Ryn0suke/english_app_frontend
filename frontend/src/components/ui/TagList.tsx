import React from 'react';
import { MenuItem, Select, Checkbox, ListItemText, OutlinedInput, SelectChangeEvent } from '@mui/material';
import { Tag } from 'interfaces';

interface SelectProps {
    selectedTags: Tag[];
    registeredTag: Tag[];
    handleTagChange: (event: SelectChangeEvent<string[]>) => void;
}

const TagList: React.FC<SelectProps> = ({ selectedTags, registeredTag, handleTagChange }) => {
    return (
        <Select
            label="登録されているタグ"
            multiple
            value={selectedTags.map(tag => tag.name)}
            onChange={handleTagChange}
            input={<OutlinedInput label="登録されているタグ" />}
            renderValue={(selected) => (selected as string[]).join(', ')}
        >
            {registeredTag.map((tag) => (
                <MenuItem key={tag.id} value={tag.name}>
                    <Checkbox checked={selectedTags.some(selectedTag => selectedTag.name === tag.name)} />
                    <ListItemText primary={tag.name} />
                </MenuItem>
            ))}
        </Select>
    );
};

export default TagList;

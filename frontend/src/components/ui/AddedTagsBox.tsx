import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tag } from 'interfaces';
import { styled } from '@mui/material/styles';

interface AddedTagsProps {
    tags: Tag[]
    setTags: (tags: Tag[]) => void
}

const TagBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    margin: theme.spacing(2),
}));

const TagItem = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.shape.borderRadius,
}));

const AddedTagsBox: React.FC<AddedTagsProps> = ({ tags, setTags }) => {

    const handleDeleteTag = (index: number) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
    };

    return(
        <TagBox>
            {tags.map((tag, index) => (
                <TagItem key={index}>
                    {tag.name}
                    <IconButton
                        size='small'
                        onClick={() => handleDeleteTag(index)}
                        sx={{ marginLeft: 1 }}
                    >
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </TagItem>
            ))}
        </TagBox>
    );
};

export default AddedTagsBox;

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from 'App';
import { Phrase, SearchOptions } from 'interfaces';
import { createNewPhrases } from 'lib/api/cradPhrases';
import AlertMessage from 'components/utils/AlertMessage';
import { Tag } from 'interfaces';
import CommonButton from 'components/ui/Button';
import AddedTagsBox from 'components/ui/AddedTagsBox';
import TagList from 'components/ui/TagList';
import JapaneseAndEnglishTextField from 'components/ui/JapaneseAndEnglishTextField';
import { TextField, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { addTag, tagChange } from 'components/utils/TagRelatedFunc';
import { recieveAllTags } from 'components/utils/TagRelatedFunc';
import validate from 'components/utils/Validation';

interface recieveProps {
    recieveAllPhrases: (page: number, options: SearchOptions) => Promise<void>
    currentPage: number
    searchOptions: SearchOptions
};

const Register: React.FC<recieveProps> = ({ recieveAllPhrases, currentPage, searchOptions }) => {
    const { currentUser } = useContext(AuthContext);
    const [japanese, setJapanese] = useState<string>('');
    const [english, setEnglish] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTag, setNewTag] = useState<string>('');
    const [registeredTag, setRegisteredTag] = useState<Tag[]>([]);
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');

    const handleAddTag = () => {
        const newTags = addTag(newTag, tags, selectedTags)

        setTags([...tags, ...newTags]);
        setNewTag('');
        setSelectedTags([]);
    };

    const handleTagChange = (event: SelectChangeEvent<string[]>) => {
        const selectedTags = tagChange(event, registeredTag);
        setSelectedTags(selectedTags);
    };

    const handleCreateNewPhrase = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(validate(japanese) || validate(english)) {
            window.alert('文字数は50文字までです');
            return;
        }

        if (currentUser?.id === undefined) {
            console.log('User ID is undefined');
            return;
        }

        const newPhrase: Phrase = {
            id: currentUser.id,
            japanese: japanese,
            english: english,
            state1: false,
            state2: false,
            state3: false,
            tags: tags
        };

        try {
            const res = await createNewPhrases(newPhrase);
            console.log(res);
            await recieveAllPhrases(currentPage, searchOptions);
            setJapanese('');
            setEnglish('');
            setTags([]);
            setSelectedTags([]);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
                setAlertMessageOpen(true);
            }
        }
    };

    useEffect(() => {
        recieveAllTags(currentUser, setRegisteredTag);
    }, [currentUser]);

    return (
        <>
            <form noValidate autoComplete='off'>
                <h1>登録</h1>
                <JapaneseAndEnglishTextField 
                    japanese={japanese}
                    english={english}
                    setJapanese={setJapanese}
                    setEnglish={setEnglish}
                />

                <FormControl fullWidth margin='dense' variant='outlined'>
                    <InputLabel>登録されているタグ</InputLabel>

                    <TagList 
                        selectedTags={selectedTags}
                        registeredTag={registeredTag}
                        handleTagChange={handleTagChange}
                    />

                </FormControl>
                <TextField
                    variant='outlined'
                    fullWidth
                    label='新しいタグ'
                    value={newTag}
                    margin='dense'
                    onChange={(e) => {setNewTag(e.target.value)}}
                />

                <CommonButton onClick={handleAddTag} children='タグを追加'/>

                <AddedTagsBox 
                    tags={tags}
                    setTags={setTags}
                />

                <CommonButton
                    onClick={handleCreateNewPhrase} 
                    children='登録' 
                    type='submit'
                    fullWidth
                    disabled={!japanese || !english || tags.length === 0}
                />
                <AlertMessage
                    open={alertMessageOpen}
                    setOpen={setAlertMessageOpen}
                    severity='error'
                    message={alertMessage}
                />
            </form>
        </>
    );
};

export default Register;
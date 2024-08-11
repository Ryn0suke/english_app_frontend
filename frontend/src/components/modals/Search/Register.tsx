import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Box, IconButton, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from 'App';
import { Tag, Phrase } from 'interfaces';
import { viewAllTags } from 'lib/api/cradTags';
import { createNewPhrases } from 'lib/api/cradPhrases';
import AlertMessage from 'components/utils/AlertMessage';
import validate from 'components/utils/Validation';
import TagList from 'components/ui/TagList';
import CommonButton from 'components/ui/Button';
import JapaneseAndEnglishTextField from 'components/ui/JapaneseAndEnglishTextField';
import AddedTagsBox from 'components/ui/AddedTagsBox';
import { addTag, tagChange } from 'components/utils/TagRelatedFunc';
import { recieveAllTags } from 'components/utils/TagRelatedFunc';

interface RegisterModalProps {
    setModalIsOpen: (isOpen: boolean) => void;
    modalIsOpen: boolean;
    phrase: { japanese: string, english: string, explanation: string };
}

const RegisterModal: React.FC<RegisterModalProps> = ({ setModalIsOpen, modalIsOpen, phrase }) => {
    const { currentUser } = useContext(AuthContext);
    const [japanese, setJapanese] = useState<string>(phrase.japanese);
    const [english, setEnglish] = useState<string>(phrase.english);
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

        if (validate(japanese) || validate(english)) {
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
            setJapanese('');
            setEnglish('');
            setTags([]);
            setSelectedTags([]);
            setModalIsOpen(false); // モーダルを閉じる
        } catch (err: unknown) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
                setAlertMessageOpen(true);
            }
        }
    };

    useEffect(() => {
        setJapanese(phrase.japanese);
        setEnglish(phrase.english);
    }, [phrase.japanese, phrase.english]);

    useEffect(() => {
        recieveAllTags(currentUser, setRegisteredTag);
    }, [currentUser]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel='登録モーダル'
        >
            <CommonButton onClick={() => setModalIsOpen(false)} children={<CloseIcon />} color='secondary' />
            <h1>{phrase.english}</h1>
            <p>{phrase.explanation}</p>
            <form noValidate autoComplete='off'>
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
        </Modal>
    );
};

export default RegisterModal;
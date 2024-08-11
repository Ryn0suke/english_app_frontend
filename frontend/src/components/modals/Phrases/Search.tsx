import React, { useState, useContext, useEffect } from 'react';
import { viewAllTags } from 'lib/api/cradTags';
import { AuthContext } from 'App';
import { Tag, SearchOptions } from 'interfaces';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  SelectChangeEvent
} from '@mui/material';
import AlertMessage from 'components/utils/AlertMessage';
import CommonButton from 'components/ui/Button';
import TagList from 'components/ui/TagList';
import { GreenCheckBox, YellowCheckBox, RedCheckBox, GreyCheckBox } from './CheckState';
import JapaneseAndEnglishTextField from 'components/ui/JapaneseAndEnglishTextField';
import { recieveAllTags } from 'components/utils/TagRelatedFunc';

interface recieveProps {
    recieveAllPhrases: (page: number, options: SearchOptions) => Promise<void>
    setRegisterModalIsOpen: (isOpen: boolean) => void
    searchOptions: SearchOptions
    setSearchOptions: (options: SearchOptions) => void
  };
  

const Search: React.FC<recieveProps> = ({ recieveAllPhrases, setRegisterModalIsOpen, searchOptions, setSearchOptions }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([{ name: '' }]);
  const [tags, setTags] = useState<Tag[]>([{ name: '' }]);
  const { currentUser } = useContext(AuthContext);
  const [japanese, setJapanese] = useState<string>('');
  const [english, setEnglish] = useState<string>('');
  const [isPartialMatch, setIsPartialMatch] = useState<string>('part');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [changeState1, setChangeState1] = useState<boolean>(false);
  const [changeState2, setChangeState2] = useState<boolean>(false);
  const [changeState3, setChangeState3] = useState<boolean>(false);
  const [changeState4, setChangeState4] = useState<boolean>(false);

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const selectedTagNames = typeof value === 'string' ? value.split(',') : (value as string[]);
    const newSelectedTags = tags.filter(tag => selectedTagNames.includes(tag.name));
    setSelectedTags(newSelectedTags);
  };

  const handleChangeState1 = () => {
    if (!changeState4) {
      setChangeState1(prev => !prev)
    } else {
      return;
    }
  };

  const handleChangeState2 = () => {
    if (!changeState4) {
      setChangeState2(prev => !prev)
    } else {
      return;
    }
  };

  const handleChangeState3 = () => {
    if (!changeState4) {
      setChangeState3(prev => !prev)
    } else {
      return;
    }
  };

  const removeCheckState = () => {
    setChangeState4(prev => !prev);
    setChangeState1(false);
    setChangeState2(false);
    setChangeState3(false);
  };

  useEffect(() => {
    recieveAllTags(currentUser, setTags);
  }, [currentUser]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const updatedSearchOptions: SearchOptions = {
        ...searchOptions,
        japanese: japanese,
        english: english,
        tags: selectedTags,
        isPartialMatch: isPartialMatch === 'part',
        state1: changeState1,
        state2: changeState2,
        state3: changeState3,
        state4: changeState4,
      };
      console.log(updatedSearchOptions);
      setSearchOptions(updatedSearchOptions);
      await recieveAllPhrases(1, updatedSearchOptions);
      setJapanese('');
      setEnglish('');
      setSelectedTags([{ name: '' }]);
      setRegisterModalIsOpen(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAlertMessage(err.message);
        setAlertMessageOpen(true);
      }
    }
  };

  return (
    <>
      <h1>検索オプション</h1>
      <form>
        <FormControl fullWidth sx={{ margin: 2, minWidth: 120 }}>
          <InputLabel id="selectbox-label">Tags</InputLabel>

          <TagList 
              selectedTags={selectedTags}
              registeredTag={tags}
              handleTagChange={handleTagChange}
          />

          <JapaneseAndEnglishTextField 
            japanese={japanese}
            english={english}
            setJapanese={setJapanese}
            setEnglish={setEnglish}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <GreenCheckBox state={changeState1} isLock={false} toggleState={() => handleChangeState1()} />
            <YellowCheckBox state={changeState2} isLock={false} toggleState={() => handleChangeState2()} />
            <RedCheckBox state={changeState3} isLock={false} toggleState={() => handleChangeState3()} />
            <GreyCheckBox state={changeState4} isLock={false} toggleState={() => removeCheckState()} />
          </Box>

          <RadioGroup value={isPartialMatch} onChange={(e) => setIsPartialMatch(e.target.value)} sx={{ flexDirection: 'row' }}>
            <FormControlLabel value="part" control={<Radio />} label="部分一致" />
            <FormControlLabel value="exact" control={<Radio />} label="完全一致" />
          </RadioGroup>

          <CommonButton onClick={(e) => {handleSubmit(e)}} type='submit' children='検索' />
        </FormControl>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity='error'
        message={alertMessage}
      />
    </>
  );
};

export default Search;

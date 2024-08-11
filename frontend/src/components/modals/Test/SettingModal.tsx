import { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import CommonButton from 'components/ui/Button';
import TagList from 'components/ui/TagList';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, SelectChangeEvent } from '@mui/material';
import { GreenCheckBox, YellowCheckBox, RedCheckBox } from '../Phrases/CheckState';
import { AuthContext } from 'App';
import { Tag } from 'interfaces';
import NumberInput from 'components/ui/NumberInput';
import { recieveAllTags } from 'components/utils/TagRelatedFunc';


interface ModalProps {
  modalIsOpen: boolean
  setModalIsOpen: (isOpen: boolean) => void
  numOfQuestions: number
  setNumOfQuestions: (qNum: number) => void
  isJapaneseToEnglish: string
  setIsJapaneseToEnglish: (japaneseToEnglish: string) => void
  selectedTags: Tag[]
  setSelectedTags: (tags: Tag[]) => void
  changeState1: boolean
  setChangeState1: React.Dispatch<React.SetStateAction<boolean>>
  changeState2: boolean
  setChangeState2: React.Dispatch<React.SetStateAction<boolean>>
  changeState3: boolean
  setChangeState3: React.Dispatch<React.SetStateAction<boolean>>
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>, isSettingModal: boolean) => void;
};

const SettingModal: React.FC<ModalProps> = ({ modalIsOpen, setModalIsOpen, 
                                              numOfQuestions, setNumOfQuestions, 
                                              isJapaneseToEnglish, setIsJapaneseToEnglish, 
                                              selectedTags, setSelectedTags,
                                              changeState1, setChangeState1, changeState2, setChangeState2, changeState3, setChangeState3,
                                              tags, setTags,
                                              handleSubmit
                                             }) => {

      const { currentUser } = useContext(AuthContext);

      const handleTagChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value },
        } = event;
        const selectedTagNames = typeof value === 'string' ? value.split(',') : (value as string[]);
        const newSelectedTags = tags.filter(tag => selectedTagNames.includes(tag.name));
        setSelectedTags(newSelectedTags);
      };


      useEffect(() => {
        recieveAllTags(currentUser, setTags);
      }, [currentUser]);

    return(
        <Modal isOpen={modalIsOpen}>
            <CommonButton onClick={() => {setModalIsOpen(false)}} children={<CloseIcon />} color='secondary'/>

            <h1>出題オプション</h1>
            
            <form>
                <FormControl fullWidth>
                <InputLabel id='selectbox-label'>Tags</InputLabel>

                <TagList 
                  selectedTags={selectedTags}
                  registeredTag={tags}
                  handleTagChange={handleTagChange}
                />

                <div style={ {display: 'flex'} }>
                    <h3>チェック状態</h3>
                        <GreenCheckBox state={changeState1} isLock={false} toggleState={() => setChangeState1(prev => !prev)} />
                        <YellowCheckBox state={changeState2} isLock={false} toggleState={() => setChangeState2(prev => !prev)} />
                        <RedCheckBox state={changeState3} isLock={false} toggleState={() => setChangeState3(prev => !prev)} />
                </div>

                <h3>問題数</h3>

                <div>
                  <NumberInput value={numOfQuestions} setValue={setNumOfQuestions}/>
                </div>

                <RadioGroup value={isJapaneseToEnglish} onChange={(e) => setIsJapaneseToEnglish(e.target.value)}>
                  <FormControlLabel value='japaneseToEnglish' control={<Radio />} label='日本語→英語' />
                  <FormControlLabel value='englishToJapanese' control={<Radio />} label='英語→日本語' />
                </RadioGroup>
                
                <CommonButton
                  onClick={(e) => handleSubmit(e, true)}
                  children='出題開始'
                  type='submit'
                />
                </FormControl>
            </form>
        </Modal>
    )
}

export default SettingModal;
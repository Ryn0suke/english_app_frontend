import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'App';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CommonButton from 'components/ui/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import { Phrase, Tag, QuestionOptions } from 'interfaces';
import SettingModal from 'components/modals/Test/SettingModal';
import { GreenCheckBox, YellowCheckBox, RedCheckBox } from 'components/modals/Phrases/CheckState';
import { updatePhrases, searchQuestion } from 'lib/api/cradPhrases';
import Question from 'components/modals/Test/Question';

const Hambarger: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);
  const [changeState1, setChangeState1] = useState<boolean>(false);
  const [changeState2, setChangeState2] = useState<boolean>(false);
  const [changeState3, setChangeState3] = useState<boolean>(false);
  const [isJapaneseToEnglish, setIsJapaneseToEnglish] = useState<string>('japaneseToEnglish');
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  // for settingModal.tsx
  const [selectedTags, setSelectedTags] = useState<Tag[]>([{ name: '' }]);
  const [changeTestState1, setChangeTestState1] = useState<boolean>(false);
  const [changeTestState2, setChangeTestState2] = useState<boolean>(false);
  const [changeTestState3, setChangeTestState3] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([{ name: '' }]);
  const [questionOptions, setQuestionOptions] = useState<QuestionOptions>({ tags: [{ name: '' }], numOfQuestions: 0, page: 1, isJapaneseToEnglish: true });
  // for settingModal.tsx

  const handleNextQuestion = async () => {
    try {
      const updatedPhrase: Phrase = {
        ...phrases[currentQuestion],
        state1: changeState1,
        state2: changeState2,
        state3: changeState3,
      };

      const hasChanged =
        phrases[currentQuestion].state1 !== changeState1 ||
        phrases[currentQuestion].state2 !== changeState2 ||
        phrases[currentQuestion].state3 !== changeState3;

      if (hasChanged) {
        const res = await updatePhrases(updatedPhrase.id, updatedPhrase);
        console.log(res);
      }

      setCurrentQuestion((prev: number) => prev + 1);
      setIsAnswer(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>, isSettingModal: boolean) => {
    if (event !== undefined) {
      event.preventDefault();
    }

    try {
      if (!isSettingModal) {
        setCurrentPage(currentPage + 1);
      }
      const newQuestionOptions: QuestionOptions = {
        tags: selectedTags,
        state1: changeTestState1,
        state2: changeTestState2,
        state3: changeTestState3,
        numOfQuestions: numOfQuestions,
        page: isSettingModal ? currentPage : currentPage + 1,
        isJapaneseToEnglish: isJapaneseToEnglish === 'japaneseToEnglish',
      };

      console.log(newQuestionOptions);

      if (currentUser?.id === undefined) {
        console.log('User ID is undefined');
        return;
      }

      const res = await searchQuestion(currentUser.id, newQuestionOptions);
      console.log(res);
      setPhrases(res.data.phrases);
      setCurrentQuestion(0);
      setModalIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const finishQuestion = () => {
    setCurrentQuestion(0);
    setCurrentPage(0);
    setNumOfQuestions(0);
    setPhrases([]);
    setSelectedTags([{ name: '' }]);
    setIsAnswer(false);
    setChangeState1(false);
    setChangeState2(false);
    setChangeState3(false);
    setChangeTestState1(false);
    setChangeTestState2(false);
    setChangeTestState3(false);
  };

  useEffect(() => {
    if (phrases[currentQuestion]) {
      setChangeState1(phrases[currentQuestion].state1);
      setChangeState2(phrases[currentQuestion].state2);
      setChangeState3(phrases[currentQuestion].state3);
    }
  }, [currentQuestion, phrases]);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 975, minHeight: 500 }}>
      <CommonButton onClick={() => { setModalIsOpen(true) }} children={<SettingsIcon />} />
      <SettingModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        numOfQuestions={numOfQuestions}
        setNumOfQuestions={setNumOfQuestions}
        isJapaneseToEnglish={isJapaneseToEnglish}
        setIsJapaneseToEnglish={setIsJapaneseToEnglish}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        changeState1={changeTestState1}
        setChangeState1={setChangeTestState1}
        changeState2={changeTestState2}
        setChangeState2={setChangeTestState2}
        changeState3={changeTestState3}
        setChangeState3={setChangeTestState3}
        tags={tags}
        setTags={setTags}
        handleSubmit={handleSubmit}
      />

      <CardContent>
        <form>
          <Card sx={{ minWidth: 500, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent>
              <Typography variant='h5' component='h2'>
                <Box sx={{ minWidth: 500, minHeight: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Question
                    Phrases={phrases}
                    currentQuestion={currentQuestion}
                    isJapaneseToEnglish={isJapaneseToEnglish === 'japaneseToEnglish'}
                    isAnswer={isAnswer}
                  />
                </Box>
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 16px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <GreenCheckBox
                  state={changeState1}
                  isLock={false}
                  toggleState={() => { setChangeState1(prev => !prev) }}
                />
                <YellowCheckBox
                  state={changeState2}
                  isLock={false}
                  toggleState={() => { setChangeState2(prev => !prev) }}
                />
                <RedCheckBox
                  state={changeState3}
                  isLock={false}
                  toggleState={() => { setChangeState3(prev => !prev) }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 3 }}>
                <CommonButton
                  onClick={() => { setIsAnswer((prev) => (!prev)) }}
                  children={isAnswer ? '問題に戻る' : '答えを見る'}
                  disabled={currentQuestion < 0 || currentQuestion >= numOfQuestions}
                />
              </Box>
            </Box>
          </Card>

          <CommonButton
            onClick={finishQuestion}
            children='終了'
            disabled={currentQuestion < 0 || currentQuestion >= numOfQuestions}
          />
          {currentQuestion === (numOfQuestions - 1) ?
            <>
              <CommonButton
                onClick={(e) => handleSubmit(e, false)}
                children={`次の${numOfQuestions}問`}
              />
            </>
            :
            <CommonButton
              onClick={handleNextQuestion}
              children='次の問題'
              disabled={currentQuestion < 0 || currentQuestion >= numOfQuestions}
            />
          }
        </form>
      </CardContent>
    </Card>
  );
};

export default Hambarger;

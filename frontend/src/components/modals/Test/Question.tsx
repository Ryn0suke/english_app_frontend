import { Phrase } from 'interfaces';

interface Props {
    Phrases: Phrase[]
    currentQuestion: number
    isJapaneseToEnglish: boolean
    isAnswer: boolean
};

const Question: React.FC<Props> = ({ Phrases, currentQuestion, isJapaneseToEnglish, isAnswer }) => {


    if (Phrases.length === 0) {
        return <h3>出題設定を行ってください</h3>;
    }

    // currentQuestion が Phrases 配列の範囲内かをチェック
    if (currentQuestion < 0 || currentQuestion >= Phrases.length) {
        return <h3>次の問題がありません</h3>;
    }

    if(isJapaneseToEnglish) {
        return(
            <>
                {isAnswer ? <h3>{Phrases[currentQuestion].english}</h3> : <h3>{Phrases[currentQuestion].japanese}</h3>}
            </>
        )
    } else {
        return(
            <>
                {isAnswer ? <h3>{Phrases[currentQuestion].japanese}</h3> : <h3>{Phrases[currentQuestion].english}</h3>}
            </>
        )
    }
};

export default Question;
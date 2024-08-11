import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, CircularProgress, Box } from '@mui/material';
import CommonButton from 'components/ui/Button';
import { searchEnglishPhrases } from 'lib/api/cradPhrases';
import AlertMessage from 'components/utils/AlertMessage';
import RegisterModal from 'components/modals/Search/Register';

const SearchPhrases: React.FC = () => {
    const [japanese, setJapanese] = useState<string>('');
    const [searchResult, setSearchResult] = useState<string[][][][]>([[[[]]]]);
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedPhrase, setSelectedPhrase] = useState<{ japanese: string, english: string, explanation: string }>({ japanese: '', english: '', explanation: '' });

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await searchEnglishPhrases(japanese);
            console.log(res);
            setSearchResult(res.data);
            setCurrentPage(0);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
                setAlertMessageOpen(true);
            }
        } finally {
            setLoading(false);
        }
    };

    const modalOpen = (japanese: string, english: string, explanation: string) => {
        setSelectedPhrase({ japanese, english, explanation });
        setModalIsOpen(true);
    };

    const showResults = () => {
        if (searchResult.length > 0 && searchResult[currentPage] && searchResult[currentPage][0]) {
            const lengths = searchResult[currentPage].length;
            const resultComponents = [];
            for (let i = 0; i < lengths; i++) {
                resultComponents.push(
                    <Box key={i} sx={{ border: 'solid #3f51b5', marginTop: 2 }}>
                        <Box sx={{ fontSize: 30, margin: 6 }}>
                            {searchResult[currentPage][i][0].map(
                                (element, index) => (
                                    <li key={index}>
                                        {element}
                                        <CommonButton 
                                            onClick={() => { modalOpen(japanese, element, searchResult[currentPage][i][1][0]) }}
                                            children='登録'
                                        />
                                    </li>
                                )
                            )}
                        </Box>
                        <Box sx={{ margin: 6, fontSize: 20 }}>
                            {searchResult[currentPage][i][1]}
                        </Box>
                    </Box>
                );
            }
            return resultComponents;
        } else {
            return <></>
        }
    };

    const handleChangePage = (page: number) => {
        const nextPage = currentPage + page;
        if (nextPage < 0 || nextPage >= searchResult.length) {
            return;
        } else {
            setCurrentPage(nextPage);
        }
    };

    console.log(currentPage);

    return (
        <>
            <TextField
                id='standard-basic'
                label='検索したいフレーズ（日本語）'
                value={japanese}
                onChange={(e) => { setJapanese(e.target.value) }}
                sx={{ width: '300px' }}
            />
            <CommonButton onClick={handleSubmit} children={<SearchIcon />} />

            {loading ? <CircularProgress /> : (showResults())}

            <Box>
                <CommonButton onClick={() => handleChangePage(-1)} children='前のページ' />
                <CommonButton onClick={() => handleChangePage(1)} children='次のページ' />
            </Box>

            <RegisterModal setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} phrase={selectedPhrase}/>
        </>
    );
};

export default SearchPhrases;

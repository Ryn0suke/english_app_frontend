import Modal from 'react-modal';
import React, { useState } from 'react';
import Register from './Register';
import Search from './Search';
import { SearchOptions } from 'interfaces';
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from 'components/ui/Button';

interface ModalProps {
    registerModalIsOpen: boolean
    setRegisterModalIsOpen: (isOpen: boolean) => void
    recieveAllPhrases: (page: number, options: SearchOptions) => Promise<void>
    currentPage: number
    searchOptions: SearchOptions
    setSearchOptions: (options: SearchOptions) => void
};

const RegisterAndSearchModal: React.FC<ModalProps> = ({ registerModalIsOpen, setRegisterModalIsOpen, recieveAllPhrases, currentPage, searchOptions, setSearchOptions }) => {
    const [isRegisterMode, setIsResigterMode] = useState<boolean>(true);

    return (
        <Modal isOpen={registerModalIsOpen} onRequestClose={() => setRegisterModalIsOpen(false)} ariaHideApp={false}>
            <div>
                <CommonButton onClick={() => setRegisterModalIsOpen(false)} children={<CloseIcon />} color='secondary'/>
                <CommonButton onClick={() => setIsResigterMode(true)} children='登録' />
                <CommonButton onClick={() => setIsResigterMode(false)} children='検索' />
            
                {isRegisterMode ? (
                    <Register recieveAllPhrases={recieveAllPhrases} currentPage={currentPage} searchOptions={searchOptions} />
                ) : (
                    <Search recieveAllPhrases={recieveAllPhrases} setRegisterModalIsOpen={setRegisterModalIsOpen} searchOptions={searchOptions} setSearchOptions={setSearchOptions} />
                )}
            </div>
        </Modal>
    );
};

export default RegisterAndSearchModal;

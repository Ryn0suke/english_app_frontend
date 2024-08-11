import client from 'lib/api/client';
import Cookies from 'js-cookie';
import { Phrase, SearchOptions, QuestionOptions } from 'interfaces';

export const viewAllPhrases = (id: number, page: number, searchOptions: SearchOptions = { japanese: '', english: '', tags: [], isPartialMatch: true }) => {
    return client.get(`phrases/${id}`, {
        params: {
            page: page,
            search: searchOptions
        },
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};


export const createNewPhrases = (phrase:Phrase) => {
    return client.post(`phrases`, phrase, {
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};

export const updatePhrases = (id:number, phrase:Phrase) => {
    return client.patch(`phrases/${id}`, phrase, {
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};

export const destoyPhrases = (id:number) => {
    return client.delete(`phrases/${id}`, {
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};

export const searchQuestion = (id: number, questionOptions: QuestionOptions) => {
    return client.get(`questions/${id}`, {
        params: {
            option: questionOptions
        },
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};

export const searchEnglishPhrases = (japanese:string) => {
    return client.get(`searches/${japanese}`, {
        params: {
            japanese: japanese
        },
        headers: {
            'access-token': Cookies.get('_access_token'),
            'client': Cookies.get('_client'),
            'uid': Cookies.get('_uid')
        }
    });
};
export interface SignUpParams {
    name: string
    email: string
    password: string
    passwordConfirmation: string
};

export interface SignInParams {
    email: string
    password: string
};

export interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?:string
    image?:string
    allowPasswordChange: boolean
    created_at: Date
    updated_at: Date
};

export interface Tag {
    id?: number
    name: string
};

export interface Phrase {
    id: number
    japanese: string
    english: string
    state1: boolean
    state2: boolean
    state3: boolean
    tags: Tag[]
};

export interface SearchOptions {
    japanese: string
    english: string
    tags: Tag[]
    isPartialMatch: boolean
    state1?: boolean
    state2?: boolean
    state3?: boolean
    state4?: boolean
};

export interface QuestionOptions {
    tags: Tag[]
    state1?: boolean
    state2?: boolean
    state3?: boolean
    numOfQuestions: number
    page: number
    isJapaneseToEnglish: boolean
};
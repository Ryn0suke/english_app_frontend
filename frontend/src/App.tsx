import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import CommonLayout from 'components/layouts/CommonLayout';
import Home from 'components/pages/Home';
import SignUp from 'components/pages/SignUp';
import SignIn from 'components/pages/SignIn';
import Test from 'components/pages/Test';
import Phrases from 'components/pages/Phrases';

import { getCurrentUser } from 'lib/api/auth';
import { User } from 'interfaces/index';
import SearchPhrases from 'components/pages/SearchPhrases';


//全てのコンポーネントで使う変数
//ローディング中か？サインインしているか？現在のユーザー情報
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
});

const App: React.FC = () => {

  //AuthContextで必要な情報をuseStateで管理
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  //ユーザーが認証されているかを確かめる関数
  const handleGetCurrentUser = async() => {
    try {
      const res = await getCurrentUser();
      //認証済みであれば, 認証済みであることとユーザー情報を更新
      if(res?.data.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log('認証できていない');
      }
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  };

  //
  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser]);

  //認証済みでないユーザーはsigninページに飛ばす
  const Private = ({ children }: { children: React.ReactElement }) => {
    if(!loading) {
      if(isSignedIn) {
        return children;
      } else {
        return <Navigate to='/signin' />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/test' element={<Private><Test /></Private>} />
            <Route path='/phrases' element={<Private><Phrases /></Private>}/>
            <Route path='/search' element={<Private><SearchPhrases /></Private>}/>
            {/* <Private>
              <Home />
            </Private> */}
          </Routes>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App


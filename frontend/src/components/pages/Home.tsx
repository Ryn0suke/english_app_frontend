import React, { useContext } from 'react';
import { AuthContext } from 'App';
import CommonButton from 'components/ui/Button';

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <CommonButton onClick={() => {console.log("hello")}} children="test" />
            <h1>サインインに成功しました</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
            <h2>ID: {currentUser?.id}</h2>
          </>
        ) : (
          <h1>サインインしていません</h1>
        )
      }
    </>
  )
}

export default Home;
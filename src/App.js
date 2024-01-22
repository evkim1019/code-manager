import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import logo from "./logo.svg";
import "./App.css";

import LoginLandingScreen from "./screens/LoginLandingScreen";
import SignupScreen from "./screens/SignupScreen";
import CodeGeneratorScreen from "./screens/CodeGeneratorScreen";
import Header from "./components/Header";
import CodeListScreen from "./screens/CodeListScreen";
import CodeDetailScreen from "./screens/CodeDetailScreen";

import users from "./sampleDB/users.json";

function App() {
  const [userList, setUserList] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [codeDetailInfo, setCodeDetailInfo] = useState({});

  useEffect(() => {
    setUserList(users);
  }, []);

  return (
    <div className="App">
      <Header currentUserInfo={currentUserInfo} />
      <hr />
      {currentUserInfo.userFullName ? (
        <div>
          <CodeListScreen
            currentUserInfo={currentUserInfo}
            setCodeDetailInfo={setCodeDetailInfo}
          />
          <hr />
          <CodeDetailScreen
            currentUserInfo={currentUserInfo}
            codeDetailInfo={codeDetailInfo}
          />
        </div>
      ) : (
        <LoginLandingScreen
          userList={userList}
          setCurrentUserInfo={setCurrentUserInfo}
        />
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

import logo from "./logo.svg";
import "./App.css";

import LoginLandingScreen from "./screens/LoginLandingScreen";
import SignupScreen from "./screens/SignupScreen";
import CodeGeneratorScreen from "./screens/CodeGeneratorScreen";
import Header from "./components/Header";
import CodeListScreen from "./screens/CodeListScreen";
import CodeDetailScreen from "./screens/CodeDetailScreen";

import users from "./sampleDB/users.json";
import RegisterScreen from "./screens/RegisterScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [usersDB, setUsersDB] = useState({});
  const [codesDB, setCodesDB] = useState({});
  const [codeGroupsDB, setCodeGroupsDB] = useState({});
  const [businessesDB, setBusinessesDB] = useState({});
  const [userList, setUserList] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [codeDetailInfo, setCodeDetailInfo] = useState({});

  const fetchDB = async () => {
    // Fetch Codes Data
    const codesQuerySnapshot = await getDocs(collection(db, "codes"));
    const fetchedCodesArray = codesQuerySnapshot.docs.map((doc) => ({
      [doc.id]: { ...doc.data() },
    }));
    const fetchedCodesObject = fetchedCodesArray.reduce((acc, obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = value;
      return acc;
    });
    setCodesDB(fetchedCodesObject);

    // Fetch Business Data
    const businessesQuerySnapshot = await getDocs(collection(db, "businesses"));

    const fetchedBusinessesArray = businessesQuerySnapshot.docs.map((doc) => ({
      [doc.id]: { ...doc.data() },
    }));
    const fetchedBusinessesObject = fetchedBusinessesArray.reduce(
      (acc, obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        acc[key] = value;
        return acc;
      }
    );
    setBusinessesDB(fetchedBusinessesObject);

    // Fetch Code Groups Data
    const codeGroupsQuerySnapshot = await getDocs(collection(db, "codeGroups"));

    const fetchedCodeGroupsArray = codeGroupsQuerySnapshot.docs.map((doc) => ({
      [doc.id]: { ...doc.data() },
    }));
    const fetchedCodeGroupsObject = fetchedCodeGroupsArray.reduce(
      (acc, obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        acc[key] = value;
        return acc;
      }
    );
    setCodeGroupsDB(fetchedCodeGroupsObject);

    // Fetch users Data
    const usersQuerySnapshot = await getDocs(collection(db, "users"));

    const fetchedUsersArray = usersQuerySnapshot.docs.map((doc) => ({
      [doc.id]: { ...doc.data() },
    }));
    const fetchedUsersObject = fetchedUsersArray.reduce((acc, obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      acc[key] = value;
      return acc;
    });
    setUsersDB(fetchedUsersObject);

    // If auth already exist in local storage
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setIsAuthenticated(true);
        for (let i = 0; i < Object.values(fetchedUsersObject).length; i++) {
          if (Object.values(fetchedUsersObject)[i].userEmail === data.email) {
            setCurrentUserInfo(Object.values(fetchedUsersObject)[i]);
          }
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUserInfo(null);
      }
    });
    setIsLoading(false);
  };

  const auth = getAuth();

  useEffect(() => {
    fetchDB();
  }, []);

  return (
    <Router>
      <Header
        currentUserInfo={currentUserInfo}
        setCurrentUserInfo={setCurrentUserInfo}
        setIsAuthenticated={setIsAuthenticated}
      />
      {/* {currentUserInfo.userFullName ? ( */}
      {isAuthenticated ? (
        <Routes>
          <Route
            exact
            path="/"
            element={
              <CodeListScreen
                usersDB={usersDB}
                codesDB={codesDB}
                businessesDB={businessesDB}
                codeGroupsDB={codeGroupsDB}
                currentUserInfo={currentUserInfo}
                setCodeDetailInfo={setCodeDetailInfo}
              />
            }
          />
          <Route
            path="/:codeId"
            element={
              <CodeDetailScreen
                isLoading={isLoading}
                codesDB={codesDB}
                businessesDB={businessesDB}
                codeGroupsDB={codeGroupsDB}
                isAuthenticated={isAuthenticated}
                currentUserInfo={currentUserInfo}
                codeDetailInfo={codeDetailInfo ? codeDetailInfo : null}
              />
            }
          />
          <Route
            path="/generator"
            element={
              <CodeGeneratorScreen
                isAuthenticated={isAuthenticated}
                currentUserInfo={currentUserInfo}
                businessesDB={businessesDB}
                codeGroupsDB={codeGroupsDB}
                codesDB={codesDB}
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LoginLandingScreen
                usersDB={usersDB}
                setCurrentUserInfo={setCurrentUserInfo}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={
              <RegisterScreen
                setIsAuthenticated={setIsAuthenticated}
                setCurrentUserInfo={setCurrentUserInfo}
              />
            }
          />
        </Routes>
      )}
    </Router>
    // <div className="App">
    //   <Header currentUserInfo={currentUserInfo} />
    //   <hr />
    //   {currentUserInfo.userFullName ? (

    //     <div>
    //       <CodeListScreen
    //         usersDB={usersDB}
    //         codesDB={codesDB}
    //         businessesDB={businessesDB}
    //         codeGroupsDB={codeGroupsDB}
    //         currentUserInfo={currentUserInfo}
    //         setCodeDetailInfo={setCodeDetailInfo}
    //       />
    //       <hr />
    //       <CodeDetailScreen
    //         currentUserInfo={currentUserInfo}
    //         codeDetailInfo={codeDetailInfo}
    //       />
    //     </div>
    //   ) : (
    //     <LoginLandingScreen
    //       usersDB={usersDB}
    //       setCurrentUserInfo={setCurrentUserInfo}
    //     />
    //   )}
    // </div>
  );
}

export default App;

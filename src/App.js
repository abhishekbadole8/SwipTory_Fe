import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from "./App.module.css";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";

export const UserContext = createContext();

function App() {
  const BASE_USER_URL = `http://localhost:5000/api/user`;
  const BASE_STORY_URL = `http://localhost:5000/api/story`;

  const [token, setToken] = useState(null);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const [inputValue, setInputValue] = useState({ username: "", password: "" });

  return (
    <div className={style.App}>
      <UserContext.Provider
        value={{
          inputValue,
          setInputValue,
          token,
          setToken,
          BASE_USER_URL,
          BASE_STORY_URL,
          loginModal,
          setLoginModal,
          registerModal,
          setRegisterModal,
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact index path="/homepage" element={<Homepage />} />
          </Routes>
          {loginModal && <ModalWrapper />}
          {registerModal && <ModalWrapper />}
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

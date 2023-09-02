import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import style from "./App.module.css";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Bookmark from "./pages/Bookmark/Bookmark";
import ViewStory from "./components/ViewStory/ViewStory";
import axios from "axios";
import jwt_decode from "jwt-decode";
import UserStory from "./components/UserStory/UserStory";

export const UserContext = createContext();

function App() {
  const BASE_USER_URL = `https://swipstory.onrender.com/api/user`;
  const BASE_STORY_URL = `https://swipstory.onrender.com/api/story`;
  // const BASE_USER_URL = `http://localhost:5000/api/user`;
  // const BASE_STORY_URL = `http://localhost:5000/api/story`;

  const [token, setToken] = useState("");
  const [decode, setDecode] = useState({});

  const headers = { headers: { Authorization: token } };

  const [allUserStories, setAllUserStories] = useState([]); // all stories here
  const [filteredUserStories, setfilteredUserStories] = useState([]); // filter click story save here

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [addStoryModal, setAddStoryModal] = useState(false);
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false); // Edit button

  const [selectedStoryCatArray, setSelectedStoryCatArray] = useState(); // selected story with category all stories in array of object's
  const [selectedStoryCatIndex, setSelectedStoryCatIndex] = useState(0); // selected story ( index ) with category all stories in array of object's

  const [inputValue, setInputValue] = useState({ username: "", password: "" });

  const [addStoryInputValue, setAddStoryInputValue] = useState({
    heading: "",
    description: "",
    category: "",
    images: [],
  });

  // function for updating values - on edit btn click
  const updateEditStoryInputValue = (newValues) => {
    setAddStoryInputValue((prevValues) => ({ ...prevValues, ...newValues }));
    setIsEdit(!isEdit);
  };

  // fetch story
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(BASE_STORY_URL);
        if (response) {
          const data = response.data;
          setAllUserStories(data);
        }
      } catch (error) {
        console.log(`Error in Fetching story:${error}`);
      }
    };
    fetchStory();
  }, [viewStoryModal, addStoryModal, BASE_STORY_URL]);

  // If localstorage has already token
  useEffect(() => {
    const storedToken = localStorage.getItem("user_token_swiptory");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // seting decoded user
  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setDecode(decodedToken);
    }
  }, [token]);

  return (
    <div className={style.App}>
      <UserContext.Provider
        value={{
          BASE_USER_URL,
          BASE_STORY_URL,
          headers,
          inputValue,
          setInputValue,
          token,
          setToken,
          decode,
          setDecode,
          allUserStories,
          setAllUserStories,
          loginModal,
          setLoginModal,
          registerModal,
          setRegisterModal,
          addStoryModal,
          setAddStoryModal,
          isLoading,
          setIsLoading,
          viewStoryModal,
          setViewStoryModal,
          selectedStoryCatArray,
          setSelectedStoryCatArray,
          selectedStoryCatIndex,
          setSelectedStoryCatIndex,
          addStoryInputValue,
          setAddStoryInputValue,
          filteredUserStories,
          setfilteredUserStories,
          updateEditStoryInputValue,
          isEdit,
          setIsEdit,
        }}
      >
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact index path="/homepage" element={<Homepage />} />
            <Route
              exact
              path="/bookmark"
              element={token ? <Bookmark /> : <Navigate to={"/homepage"} />}
            />
            <Route exact path="/userstory" element={<UserStory />} />
          </Routes>
          {loginModal && <ModalWrapper />}
          {registerModal && <ModalWrapper />}
          {addStoryModal && <ModalWrapper />}
          {viewStoryModal && <ViewStory />}
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

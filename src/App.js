import React, { useState, createContext } from "react";
import "./assets/Styles/global.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Header from "./components/Header/Header";
import ModalWrapper from "./components/ModalWrapper/ModalWrapper";
import Bookmark from "./pages/Bookmark/Bookmark";
import ViewStory from "./components/ViewStory/ViewStory";
import useAuthStore from "./services/authStore";

export const UserContext = createContext();

function App() {
  const { authToken } = useAuthStore();

  const [allUserStories, setAllUserStories] = useState([]); // all stories here
  const [filteredUserStories, setfilteredUserStories] = useState([]); // filter click story save here

  const [isAuthModal, setIsAuthModal] = useState(false);
  const [isAuthModalValue, setIsAuthModalValue] = useState("");

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

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          allUserStories,
          setAllUserStories,
          isAuthModal,
          setIsAuthModal,
          isAuthModalValue,
          setIsAuthModalValue,
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
              element={authToken ? <Bookmark /> : <Navigate to={"/homepage"} />}
            />
          </Routes>
          {isAuthModal && <ModalWrapper />}
          {addStoryModal && <ModalWrapper />}
          {viewStoryModal && <ViewStory />}
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;

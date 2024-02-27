import React, { useState,useEffect, createContext } from "react";
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
import useAuthStore from "./store/authStore";
import useStoryStore from "./store/storyStore";

export const UserContext = createContext();

function App() {
  const { authToken } = useAuthStore();
  const { getStories } = useStoryStore()

  const [isAuthModal, setIsAuthModal] = useState(false);
  const [isAuthModalValue, setIsAuthModalValue] = useState("");

  const [addStoryModal, setAddStoryModal] = useState(false);
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false); // Edit button

  const [selectedStoryCategoryArray, setSelectedStoryCategoryArray] = useState([]); // selected story with category all stories in array of object's
  const [selectedStoryCategoryIndex, setSelectedStoryCategoryIndex] = useState(0); // selected story ( index ) with category all stories in array of object's

  useEffect(() => {
    getStories()
  }, [])

  return (
    <div className="App">
      <UserContext.Provider
        value={{
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
          selectedStoryCategoryArray,
          setSelectedStoryCategoryArray,
          selectedStoryCategoryIndex,
          setSelectedStoryCategoryIndex,
          isUpdate,
          setIsUpdate,
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

import { create, useStore } from "zustand";
import api from "../services/api";
import useAuthStore from "./authStore";

const useStoryStore = create((set) => ({
  stories: [],
  story: null,
  categories: [],
  updateStoryInputValue: {
    action: "updateStoryDetails",
    _id: "",
    heading: "",
    description: "",
    category: "",
    images: [],
  },
  user: useAuthStore.getState().user,

  // get stories - public
  getStories: async () => {
    try {
      const response = await api.get("/api/story/");
      if (response) {
        const stories = response.data;
        const categories = stories.map((story) => story.category);
        const uniqueCategories = [...new Set(categories)];
        set({ stories, categories: uniqueCategories });
      }
    } catch (error) {
      console.log(error.response);
      throw new Error(error.response.data.error || "Failed to get stories");
    }
  },

  // get story - private
  getStory: async (storyId) => {
    try {
      const response = await api.get(`/api/story/${storyId}`);
      if (response) {
        const data = response.data;
        set({ story: data });
      }
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to get story");
    }
  },

  // create new story - private
  createStory: async (formData) => {
    try {
      const response = await api.post("/api/story/add", {
        ...formData,
      });
      const data = await response.data;
      set((state) => ({
        stories: [...state.stories, data],
      }));
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to create story");
    }
  },

  // update story - private
  updateStory: async (formData) => {
    try {
      const userId = useAuthStore.getState().user._id;
      const storyId = useStoryStore.getState().updateStoryInputValue._id;
      const response = await api.patch(
        `/api/story/update/${userId}/${storyId}`,
        {
          ...formData,
        }
      );
      return true;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to update story");
    }
  },

  updateBookmarkOrLike: async (action, storyId) => {
    try {
      const userId = useAuthStore.getState().user._id;
      const response = await api.patch(
        `/api/story/update/${userId}/${storyId}`,
        {
          action,
        }
      );
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error.response.data.error || "Failed to update story");
    }
  },

  // get story by category - return category wise story
  getStoryByCategory: (category) => {
    return useStoryStore
      .getState()
      .stories.filter((story) => story.category === category);
  },

  // return only user stories
  getUserStories: () => {
    const _id = useAuthStore.getState().user?._id;
    return useStoryStore
      .getState()
      .stories.filter((story) => story.userId === _id);
  },

  // return user bokmarked stories
  getUserBookmarkedStories: () => {
    const userId = useAuthStore.getState().user?._id;
    return useStoryStore
      .getState()
      .stories.filter((story) => story.bookmarks.includes(userId));
  },

  // updatestoryinput values when edit button is clicked
  setUpdateStoryInputValue: (story) => {
    set((state) => ({
      ...state,
      updateStoryInputValue: {
        _id: story._id,
        heading: story.heading,
        description: story.description,
        category: story.category,
        images: story.images,
      },
    }));
  },
}));

export default useStoryStore;

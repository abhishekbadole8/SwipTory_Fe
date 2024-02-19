const { create } = require("zustand");
const { default: api } = require("./api");

const useStoryStore = create((set) => ({
  stories: [],
  story: null,
  categories: [],

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

  // get story by category - return category wise story
  getStoryByCategory: (category) => {
    return useStoryStore
      .getState()
      .stories.filter((story) => story.category === category);
  },

  // return only user stories
  getUserStories: (id) => {
    return useStoryStore
      .getState()
      .stories.filter((story) => story.userId === id);
  },
}));

export default useStoryStore;

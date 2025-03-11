import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useGroupStore = create((set, get) => ({
  groups: [],
  selectedGroup: null,
  isGroupsLoading: false,
  groupMessages: [],
  isGroupMessagesLoading: false,
  groupUsers: [],

  createGroups: async (name) => {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      toast.error('Group name is required');
      return;
    }

    set({ isGroupsLoading: true });
    try {
      const response = await axiosInstance.post('/group/create-group', { name });
      set((state) => ({
        groups: [...state.groups, response.data.group], 
      }));
      toast.success('Group created successfully');
      return response.data.group;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create group';
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  fetchGroup: async () => {
    set({ isGroupsLoading: true });
    try {
      const response = await axiosInstance.get('/group/get-all-groups');
      const fetchedGroups = response.data.groups || response.data || [];
      set({ groups: fetchedGroups }); 
      return fetchedGroups;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch groups';
      toast.error(errorMessage);
      throw error;
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  setSelectedGroup: (group) => {
    set({ selectedGroup: group });
  },
}));
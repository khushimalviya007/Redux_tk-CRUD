// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await axios.get('http://localhost:8080/blogger/');
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchDataFailure(error));
  }
};

// export const deleteU = (itemId) => async (dispatch) => {
//   try {
//     await axios.delete(`http://localhost:8080/blogger/${itemId}`);
//     dispatch(deleteUser(itemId));
//   } catch (error) {
//     console.error('Error deleting item', error);
//   }
// };

// export const updateU = (id, name, email) => async (dispatch) => {
//   const details = { name, email };
//   try {
//     await axios.put(`http://localhost:8080/blogger/${id}`, details);
//     dispatch(updateUser({ id, details }));
//   } catch (error) {
//     console.error('Error updating resource:', error);
//   }
// };

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.users = [];
      state.isLoading = false;
      state.error = action.payload;
    },
    saveUser: (state, action) => {
      state.users.push(action.payload);
    },
    // deleteU: (state, action) => {
    //   state.users = state.users.filter((user) => user.id !== action.payload);
    // },
    // updateU: (state, action) => {
    //   state.users = state.users.map((user) =>
    //     user.id === action.payload.id ? { ...user, ...action.payload.details } : user
    //   );
    // },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  saveUser,
  deleteUser,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
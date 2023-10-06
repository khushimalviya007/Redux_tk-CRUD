import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { async } from 'rxjs';


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

export const addArticleToBlogger=({articleName,id,articleDes})=>{
  return async (dispatch)=>
  {
    try{
      const toSave = {
        articleName: articleName,
        description: articleDes,
      }
      const response = await axios.post(`http://localhost:8080/blogger/${id}/savearticle`,toSave);
      console.log(response.data);
      dispatch(addArticleToBloggerFullfilled(response.data));
    }catch(error){}
  };
};

export const deleteBloggerrById = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/blogger/${id}`);
      dispatch(deleteBloggerByIdFulfilled(id));
    } catch (error) {
    }
  };
};

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
    addArticleToBloggerFullfilled:(state, action)=>{
      state.users.push(action.payload);
    },
    deleteBloggerByIdFulfilled: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },    
    
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  saveUser,
  addArticleToBloggerFullfilled,
  deleteBloggerByIdFulfilled,
  deleteArticleByIdFulfilled,
} = userSlice.actions;

export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  articles: [],
  isLoading: false,
  error: null,
};

export const fetchDataarticle = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await axios.get('http://localhost:8080/blogger/articles');
    // console.log(response.data);
    dispatch(fetchDataSuccess(response.data));
  } catch (error) {
    console.error('Error fetching articles:', error);
    dispatch(fetchDataFailure(error));
  }
};

export const deleteArticleId = (articleid, blogentityid) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/blogger/${blogentityid}/delete/${articleid}`);
      dispatch(deleteArticleByIdFulfilled(articleid, blogentityid));
    } catch (error) {
    }
  };
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteArticleByIdFulfilled: (state, action) => {
      state.articles = state.articles.filter((article) => article.id !== action.payload);
    },
  },
});

export const{
fetchDataFailure,
fetchDataRequest,
fetchDataSuccess,
deleteArticleByIdFulfilled,
}=articleSlice.actions

export default articleSlice.reducer;

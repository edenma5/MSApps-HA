import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const SERVER_URL = 'https://ms-apps-server.herokuapp.com/'

export const getPictures = (category) => async (dispatch) => {
    try {
        const response = await axios.get(`${SERVER_URL}?category=${category}`);
        dispatch(getData(response.data));
    }
    catch (err) {
        throw new Error(err)
    }
}

const initialState = {
    count: 1,
    numPage: 0,
    typesOfPhotos: ['backgrounds', 'fashion', 'nature', 'science', 'education', 'feelings', 'health', 'people', 'religion', 'places', 'animals', 'industry', 'computer', 'food', 'sports', 'transportation', 'travel', 'buildings', 'business', 'music'],
    data: [],
    detailspopupToogle: false,
    typesPopupToogle: false,
    currentImgDetails: {},
}

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        increment: (state) => {
            state.numPage += 9;
            state.count += 1;
        },
        decrement: (state) => {
            state.numPage -= 9;
            state.count -= 1;
        },
        getData: (state, action) => {
            state.data = action.payload
        },
        setDetailspopupToogle: (state, action) => {
            state.detailspopupToogle = action.payload
        },
        setTypesPopupToogle: (state, action) => {
            state.typesPopupToogle = action.payload
        },
        setCurrentImgDetails: (state, action) => {
            state.currentImgDetails = action.payload
        },
    },
})

export const { increment, decrement, getData, setDetailspopupToogle, setTypesPopupToogle, setCurrentImgDetails } = imagesSlice.actions

export default imagesSlice.reducer
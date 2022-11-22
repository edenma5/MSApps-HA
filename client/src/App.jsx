import { useSelector, useDispatch } from 'react-redux'
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import { decrement, getPictures, increment, setDetailspopupToogle, setTypesPopupToogle, setCurrentImgDetails } from './redux/imagesSlice'
import './App.css'

function App() {
    const dispatch = useDispatch();
    let { count, numPage, data, typesOfPhotos, detailspopupToogle, typesPopupToogle, currentImgDetails } = useSelector((state) => state.galleryActions);

    //Limiting the number of images per page
    const maxElements = 9;
    const minElements = 0;
    const currentPhotosPage = data.slice(minElements + numPage, maxElements + numPage);

    //Functions for the next and previous buttons
    const nextPage = () => {
        dispatch(increment());
    }
    const prevPage = () => {
        dispatch(decrement());
    }

    //Function for image details
    const eachImageDetails = (id) => {
        dispatch(setDetailspopupToogle(true))
        dispatch(setTypesPopupToogle(false))

        for (let item of currentPhotosPage)
            if (item.id === id) dispatch(setCurrentImgDetails(item));
    }

    //The types of images Modal
    const imageTypePopupHandle = (type) => {
        dispatch(setTypesPopupToogle(false))
        dispatch(getPictures(type))
    }

    //The button to open the types modal
    const imageTypeBtnHandle = () => {
        dispatch(setTypesPopupToogle(true))
        dispatch(setDetailspopupToogle(false))
    }

    return (
        <>
            <header className="headerContainer">
                <button className="btn typeBtn" onClick={imageTypeBtnHandle} >Image Type</button>
            </header>

            {typesPopupToogle &&
                <motion.div
                    animate={{ opacity: [0, 1], scale: [0, 1] }}
                    transition={{ duration: .5 }}
                    className="popupWindow">
                    <AiOutlineClose className="close" onClick={() => dispatch(setTypesPopupToogle(false))} />

                    <h4>Select the image type</h4>
                    <div className="typesContainer">
                        {typesOfPhotos.map((type, i) => (
                            <p key={type + i} style={{ fontSize: '1.2em', cursor: 'pointer' }} onClick={() => imageTypePopupHandle(type)}>{type}</p>
                        ))}
                    </div>
                </motion.div>
            }

            {detailspopupToogle &&
                <motion.div
                    animate={{ opacity: [0, 1], scale: [0, 1] }}
                    transition={{ duration: .5 }}
                    className="popupWindow">
                    <AiOutlineClose className="close" onClick={() => dispatch(setDetailspopupToogle(false))} />

                    <h4>Image Details</h4>
                    <p><b>Topics: </b>{currentImgDetails.tags}</p>
                    <p><b>Views: </b>{currentImgDetails.views}</p>
                    <p><b>Downloads: </b>{currentImgDetails.downloads}</p>
                    <p><b>Likes: </b>{currentImgDetails.likes}</p>
                    <p><b>Owner: </b>{currentImgDetails.user}</p>
                </motion.div>
            }

            {currentPhotosPage.length > 0 &&
                <div className='imgContainer'>
                    <button className="btn prevBtn" onClick={prevPage} disabled={(minElements + numPage) === 0}>Prev</button>
                    <button className="btn nextBtn" onClick={nextPage} disabled={(maxElements + numPage) === 36}>Next</button>
                    <p className='pageNumber'>page: ({count})</p>
                    <div>
                        {currentPhotosPage.map(pic => (
                            <img key={pic.id} onClick={() => eachImageDetails(pic.id)} src={pic.webformatURL} />
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default App

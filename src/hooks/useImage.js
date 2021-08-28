import { useReducer, useCallback } from "react";
import storage from '../config/config'

const initialState = {
    url: null,
    image: null,
    progress: null,
    userId: null
}

const reducer = (state, action) => {

    switch (action.type) {
        case 'PROGRESS':
            return {
                progress: action.progress
            }
        case 'URL':
            return {
                url: action.url
            }
        
        default:
            throw new Error('useImage reducer (no option)');
    }
}

const useImage = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const uploadAccountImage = useCallback((image, userId) => {

        const uploadTask = storage.ref('account/profile/picture/').put(image);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                dispatch({ type: 'PROGRESS', progress: progress });
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref('account/profile/picture/')
                    .child(userId)
                    .getDownLoadUrl()
                    .then (url => {
                        dispatch({ type: 'URL', url: url });
                    });
            });
    },[]);

    return {
        url: state.url,
        image: state.image,
        progress: state.image,
        userId: state.userId,
        uploadAccountImage: uploadAccountImage
    };
};

export default useImage;
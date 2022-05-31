import {CHANGE_RESOURCE, IS_SHOW_LOADER, LOAD_DATA_THUNK_EXAMPLE} from './types'
import {fetchAlbums, fetchComments, fetchPhotos, fetchPost, fetchTodos, fetchUsers} from "../../api/placeholderApi";


export const isShowLoaderAction = (flag) => ({
    type: IS_SHOW_LOADER,
    flag
})

export const changeType = (resource) => ({
    type: CHANGE_RESOURCE,
    resource
})


export const loadDataThunkExampleAction = (resource) => {

    const getResource = async () => {
        switch (resource) {
            case 'posts':
                return await fetchPost();
            case 'comments':
                return await fetchComments()
            case 'albums':
                return await fetchAlbums()
            case 'photos':
                return await fetchPhotos()
            case 'todos':
                return await fetchTodos()
            case 'users':
                return await fetchUsers()
            default:
                return await fetchPost();
        }
    }


    return dispatch => {
        dispatch(isShowLoaderAction(true));

        getResource()
            .then(data => {

                data = data.map(item => ({
                    id: item.id,
                    title: item.title || item.name,
                    body: item.body || item.title || item.url || item.email
                }));

                dispatch(isShowLoaderAction(false));
                dispatch(changeType(resource));
                dispatch({
                    type: LOAD_DATA_THUNK_EXAMPLE,
                    data: data
                });
                // throw new Error('addToDo error!');
                // dispatch(addTodoSuccess(res.data));
            })
            .catch(err => {

                console.log(err);

                // dispatch(addTodoFailure(err.message));
            });

    }


    /*
    return ({
        type : LOAD_DATA_THUNK_EXAMPLE,
        data
    })

     */

}

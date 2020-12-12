const initialState = {
    list: []
};

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        // case authConstants.REGISTER_SUCCESS:
        //     return {
        //         user: action.user
        //     };
        // case authConstants.LOGIN_SUCCESS:
        //     return {
        //         user: action.user
        //     };
        // case authConstants.LOGOUT:
        //     return {};
        // case alertConstants.IS_CONFIRMED:
        //     return {
        //         user: state.user,
        //         isConfirmed: action.status
        //     }
        // case authConstants.UPDATE_SUCCESS:
        //     return {
        //         user: action.user,
        //         isConfirmed: action.user.status
        //     }
        default:
            return state;
    }
};
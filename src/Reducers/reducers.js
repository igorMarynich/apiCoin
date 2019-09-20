// Reducer
export const initialState = {
    payload: '',
    loading: false,
    error: false,
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUESTED':
            return {
                payload: '',
                loading: true,
                error: false,
            };
        case 'REQUESTED_SUCCEEDED':
            return {
                payload: action.payload,
                loading: false,
                error: false,
            };
        case 'REQUESTED_FAILED':
            return {
                payload: '',
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
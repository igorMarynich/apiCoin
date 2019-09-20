// Action Creators
export const request = () => {
    return { type: 'REQUESTED' }
};

export const requestDogSuccess = (data) => {
    console.log('data', data);
    return { type: 'REQUESTED_SUCCEEDED', payload: data }
};


export const requestDogError = () => {
    return { type: 'REQUESTED_FAILED' }
};

export const fetchDataAPI = () => {
    return { type: 'FETCHED' }
};
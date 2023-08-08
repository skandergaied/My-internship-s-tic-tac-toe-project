export const SET_PLAYER_NAME = "SET_PLAYER_NAME";


export const setPlayerName = (name) => {
    return {
        type: SET_PLAYER_NAME,
        payload: name,
    };
};
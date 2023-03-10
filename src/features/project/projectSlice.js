import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shortlistedArtists: [],
    selectedContentProducts: null,
    chatLog: [],
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        addChatLog: (state, action) => {
            state.chatLog.push(action.payload);
        },
        setChatLog: (state, action) => {
            state.chatLog = action.payload;
        },
        popChatLog: (state, action) => {
            state.chatLog = state.chatLog.filter(msg => msg.msgID !== action.payload);
        },
    },
});

export const { addChatLog, setChatLog, popChatLog } = projectSlice.actions;
export default projectSlice.reducer;
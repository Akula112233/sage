import { createStore } from 'redux'

// actions
export let changeCurrentRoom = (obj) => {
    return {
        type: "CHANGE_CURRENT_ROOM",
        obj
    }
}

let setNewRoom = (obj, newObj) => {
    let temp = Object.assign({}, obj);
    temp.currentRoom = newObj;
    return temp;
}

export let loginUser = (obj) => {
    return {
        type: "LOGIN_USER",
        obj
    }
}

let logUserIn = (obj, userCred) => {
    let temp = Object.assign({}, obj);
    temp.loginCred = userCred;
    temp.userInfo.userID = userCred.userID
    // need to make a call to the database here!
    /* 
    let jsonResponse = (SERVER REQUEST)
    temp.userInfo.name = 
    temp.userInfo.id = 
    temp.userInfo.profilePictureLink = 

    */
    return temp;
}

// reducer
let templateState = {
    currentRoom: {
        id: "",
        moderatorUID: "",
        description: "",
        discussionName: "",
        currentNumMembers: 0,
        memberLimit: 20,
        expirationTime: 20,
        lastActiveTime: 0,
        type: 0,
        password: null
    },
    loginCred : {
        accessToken: "",
        userID: ""
    },
    userInfo : {
        id: 0,
        userID: "",
        name: "",
        profilePictureLink: ""
    }
}

function modifyState(state = templateState, action) {
    switch(action.type) {
        case "CHANGE_CURRENT_ROOM":
            return setNewRoom(state, action.obj)
        case "LOGIN_USER":
            return logUserIn(state, action.obj)
        default:
            return state
    }
}

export let store = createStore(modifyState)
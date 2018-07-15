import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      avatarIcon: 'https://cdn.iconscout.com/public/images/icon/premium/png-512/glados-robot-bot-technology-machine-39d1fa8989dcd7a4-512x512.png',
      name: 'GLaDOS',
      headerColor: '#363636',
      botMsgColor: '#118fe4',
      usrMsgColor: '#e3e3e3',
      sessionId: require('uuid/v1')()
    },
    mutations: {
      changeAvatar (state, url) {
        state.avatarIcon = url;
      },
      changeName (state, name) {
        state.name = name;
      },
      changeHeaderColor (state, color) {
        state.headerColor = color;
      },
      changeBotColor (state, color) {
        state.botMsgColor = color;
      },
      changeUsrColor (state, color) {
        state.usrMsgColor = color;
      },
    }
  })
}

export default createStore
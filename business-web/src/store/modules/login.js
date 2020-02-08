
const app = {
    state: {
        loginSuccess: false,
        exitSuccess: false,
        isWorker: false,
        isAdmin: false,
        isMember: false,
        isAsso: false,
    },
    mutations: {
        TOGGLE_LOGIN: (state, islogin) => {
            state.loginSuccess = islogin
        },
        TOGGLE_EXIT: (state, isExit) => {
            state.exitSuccess = isExit
        },
        IS_WORKER: (state, isWorker) => {
            state.isWorker = isWorker
        },
        IS_ADMIN: (state, isAdmin) => {
            state.isAdmin = isAdmin
        },
        IS_MEMBER: (state, isMember) => {
            state.isMember = isMember
        },
        IS_ASSO: (state, isAsso) => {
            state.isAsso = isAsso
        }
    },
    actions: {
    }
}

export default app

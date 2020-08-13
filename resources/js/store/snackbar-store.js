const snackbarStore = {
    namespaced:true,
    state: {
        msg: 'test',
        snackbar:false,
    },
    mutations: {
        setMsg(state,payload) {
            if(payload==1) {
                state.msg = 'Inserted Successfully';
            }
            else if(payload==2)
            {
                state.msg = 'Edited Successfully' ;
            }
            else if(payload==3)
            {
                state.msg = 'Deleted Successfully' ;
            }
            else{
                state.msg = payload;
            }
            state.snackbar = true ;
        },
        clearStore(state) {
            state.msg='';
            state.snackbar = false ;
        },
    },


}

export default snackbarStore;

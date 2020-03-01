const reducer = (state: ICount.State, action: ICount.Action) => {
    switch (action.type) {
        case 'ADD':
            return { count: state.count + action.payload.num };
        case 'MINUS':
            return { count: state.count - action.payload.num };
        default:
            return state;
    }
};

export default reducer;

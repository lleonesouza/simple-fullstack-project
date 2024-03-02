import { Actions, User } from './utils';

export type Action =
    | { type: Actions.ADD_USER, payload: User }
    | { type: Actions.REMOVE_USER, payload: { id: string } }
    | { type: Actions.UPDATE_USER, payload: User }
    | { type: Actions.LIST_USERS, payload: User[] };


export const usersReducer = (state: User[], action: Action): User[] => {
    switch (action.type) {
        case Actions.ADD_USER:
            return [...state, action.payload];

        case Actions.REMOVE_USER:
            return state.filter(user => user._id !== action.payload.id);

        case Actions.LIST_USERS:
            return action.payload

        case Actions.UPDATE_USER:
            return state.map(user => {
                if (user._id === action.payload._id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
        default:
            return state;
    }
};

import { Actions, CreateUserInput, UpdateUserInput, User } from "./utils"
import { usersReducer } from "./reducer"
import makeClient from "../client"
import config from "../config"
import { useReducer } from "react"
import toast from 'react-hot-toast';

const initialState: User[] = [];


export const useActions = () => {
    const userClient = makeClient(config.API_URL).user
    const [state, dispatch] = useReducer(usersReducer, initialState);



    return {
        state,
        actions: {
            [Actions.ADD_USER]: async (data: CreateUserInput) => {
                try {
                    const newUser = await userClient.create(data)
                    dispatch({ type: Actions.ADD_USER, payload: newUser })
                    toast.success(`Usuário '${newUser._id}' criado com sucesso!`, {
                        style: { background: '#F0FFF0' }
                    });
                } catch (e) {
                    toast.error(`Falha ao criar usuário`, {
                        style: { background: '#8B0000' }
                    });
                    console.error(e);
                }
            },
            [Actions.REMOVE_USER]: async (id: string) => {
                try {
                    await userClient.delete(id)
                    dispatch({ type: Actions.REMOVE_USER, payload: { id } })
                    toast.success(`Usuário '${id}' deletado com sucesso!`, {
                        style: { background: '#F0FFF0' }
                    });
                } catch (e) {
                    toast.error(`Falha ao deletar usuário`, {
                        style: { background: '#8B0000' }
                    });
                    console.error(e);
                }
            },
            [Actions.LIST_USERS]: async () => {
                try {
                    const users = await userClient.list()
                    dispatch({ type: Actions.LIST_USERS, payload: users })
                } catch (e) {
                    toast.error(`Falha listar usuários`, {
                        style: { background: '#8B0000' }
                    });
                    console.error(e);
                }
            },
            [Actions.UPDATE_USER]: async (id: string, data: UpdateUserInput) => {
                try {
                    const updatedUser = await userClient.update(id, data)
                    dispatch({ type: Actions.UPDATE_USER, payload: updatedUser })
                    toast.success(`Usuário '${updatedUser._id}' atualizado com sucesso!`, {
                        style: { background: '#F0FFF0' }
                    });
                } catch (e) {
                    toast.error(`Falha ao atualizar usuário`, {
                        style: { background: '#8B0000' }
                    });
                    console.error(e);
                }
            }
        }
    }
}

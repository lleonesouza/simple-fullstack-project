import axios from "axios"
import { User } from "../@types"

const makeClient = (url: string) => {
    return {
        user: {
            create: async(body: {}):Promise<User> => {
                const res = await axios.post(`${url}/users`, body)
                return res.data
            },
            list: async ():Promise<User[]> => {
                const res = await axios.get(`${url}/users`)
                return res.data
            },
            update: async (id: string, body: {}):Promise<User> => {
                const res = await axios.put(`${url}/users/${id}`, body)
                return res.data
            },
            delete: async (id: string):Promise<User> => {
                const res = await axios.delete(`${url}/users/${id}`)
                return res.data
            }
        }
    }

}


export default makeClient
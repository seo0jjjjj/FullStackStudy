import axios from "axios";
import SERVER_URL from "../config/config";
import { handleError } from "./todo-service";

const instance = axios.create({
    baseURL: `${SERVER_URL}/account/`
})

export async function checkDupUsername(username) {
    try {
        const res = await instance.get('/check-username-dup', {
            params: {
                username: username
            }
        });
        return res?.data.hasAccount

    } catch (error) {
        handleError(error);
    }


}
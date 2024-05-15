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

/**
 * 회원가입
 */
export async function register(username, password, nickname, profile) {
    try {
        const res = await instance.post('/register', {
            username: username,
            password: password,
            nickname: nickname,
            profile: profile
        },
            { headers: { 'Content-Type': 'multipart/form-data' } });
        return ['ok', res.data];

    } catch (error) {
        return handleError(error);
    }


}

/**
 * 로그인
 */
export async function login(username, password) {
    try {
        const res = await instance.post('/login', {
            username: username,
            password: password,
        },
            { withCredentials: true });
        return ['login-success', res.data];

    } catch (error) {
        return handleError(error);
    }


}
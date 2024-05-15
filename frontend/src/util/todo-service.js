import axios from 'axios';
import SERVER_URL from '../config/config';

const instance = axios.create({
    baseURL: SERVER_URL
});

export function handleError(error) {
    const response = error.response?.data || { error: 'No Response', message: '서버가 응답하지 않습니다.' };
    console.error(response);
    return ['error', response];
}

/**
 * Todo 리스트를 가져옵니다.
 * @returns ['ok | error', json data]
 */
export async function getTodoList() {
    try {
        const response = await instance.get('/list');
        return ['ok', response.data];
    } catch (error) {
        // 에러 핸들링 
        return handleError(error);
    }
}

/**
 * 해당 Id에 맞는 Todo 를 삭제 합니다.
 * @param {} id 삭제할 id
 * @returns ['ok | error', json data]
 */
export async function deleteTodoById(id) {
    try {
        const response = await instance.delete('/delete', { params: { id: id } });
        return ['ok', response.data]

    } catch (error) {
        // 에러 핸들링 
        return handleError(error);
    }
}

/**
 * 해당 content의 내용으로 Todo를 추가합니다.
 */
export async function createTodo(content) {
    try {
        const response = await instance.post('/add', {
            content: content
        });
        return ['ok', response.data]

    } catch (error) {
        // 에러 핸들링 
        return handleError(error);
    }
}

/**
 * 해당 id에 맞는 todo를 가져옵니다.
 * @param {} id 가져올 id
 */
export async function getTodoById(id) {
    try {
        const response = await instance.get('/get', { params: { id: id } });
        return ['ok', response.data];

    } catch (error) {
        return handleError(error);
    }
}

/**
 * 해당 id에 맞는 todo를 content로 수정합니다.
 * @param {} id 가져올 id
 */
export async function updateTodoById(id, content) {
    try {
        const response = await instance.put('/put', { params: { id: id, content: content } });
        return ['ok', response.data];

    } catch (error) {
        return handleError(error);
    }
}
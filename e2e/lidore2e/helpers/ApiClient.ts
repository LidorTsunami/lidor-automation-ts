import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getUserPosts() {
        const response = await this.request.get('/posts');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        return response;
    }


    async getUserPost(postId: number) {
        const response = await this.request.get(`/posts/${postId}`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(data).toEqual(expect.objectContaining({
            id: postId,
            userId: expect.any(Number) // Use any(Number) to match the userId as a number
        }));
        return response;
    }


    async checkAnimalsEndpoint() {
        const response = await this.request.get('/animals');
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe('Not Found');
        return response;
    }
}

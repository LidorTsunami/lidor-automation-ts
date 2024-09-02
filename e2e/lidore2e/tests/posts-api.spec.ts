import { expect } from '@playwright/test';
import { test } from '../utils/test-utils'; // Assuming this file sets up the unified fixture
import { ApiManager } from '../helpers/api-manager'; // Import the unified API client

test.describe('Posts API Tests', () => {
    test.beforeAll(async ({ request }) => {
        console.log('Initialized API clients');
    });

    test('retrieve user posts', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.getUserPosts();
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('retrieve user post', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.getUserPost(1);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(expect.objectContaining({
            "id": 1,
            "userId": 1
        }));
    });

    test('cannot retrieve animals', async ({apiManager}) => {
        const response = await apiManager.baseApiClient.checkAnimalsEndpoint();
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
        expect(response.statusText()).toEqual("Not Found");
    });

    test('delete user post', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.deleteUserPosts(1);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await response.text()).toContain("{}");
    });

    test('updating part of user post', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.updatePartOfUserPost(1);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(expect.objectContaining({
            "title": "Just an edited title"
        }));
    });

    test('create user post', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.createUserPost();
        expect(response.status()).toBe(201);
        expect(await response.json()).toEqual(expect.objectContaining({
            "body": "This is a new post",
            "id": 101,
            "title": "New Post",
            "userId": 1
        }));
    });

    test('update user post', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.updateUserPost(1);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual(expect.objectContaining({
            "body": "This is a post",
            "id": 1,
            "title": "Existing post",
            "userId": 1
        }));
    });

    test('update a user post that does not exist', async ({apiManager}) => {
        const response = await apiManager.postsApiClient.updateNonExistentUser();
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
        expect(response.statusText()).toEqual("Internal Server Error");
        expect(await response.text()).toContain("Cannot read properties of undefined (reading 'id')");
    });

});

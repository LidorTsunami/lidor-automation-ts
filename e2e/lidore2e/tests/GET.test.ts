import { expect } from '@playwright/test'
import { test } from '../utils/test-utils';


test('retrieve user posts', async ({ apiClient }) => {
    const response = await apiClient.getUserPosts();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test('retrieve user post', async ({ apiClient }) => {
    const response = await apiClient.getUserPost(1)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.objectContaining({
        "id":1,
        "userId":1
    }))
})

test('cannot retrieve animals', async ({ apiClient}) => {
    const response = await apiClient.checkAnimalsEndpoint()
    expect(response.ok()).toBeFalsy()
    expect(response.status()).toBe(404)
    expect(response.statusText()).toEqual("Not Found")
})
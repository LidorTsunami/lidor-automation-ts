import {test as base } from '@playwright/test';
import { ApiClient } from '../helpers/ApiClient';


export const test = base.extend<{
    apiClient: ApiClient;
}>({
    apiClient: async ({ request }, use) => {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    },
});

import { test as base } from '@playwright/test';
import { ApiManager } from '../helpers/api-manager';

export const test = base.extend<{
    apiManager: ApiManager;
}>({
    apiManager: async ({ request }, use) => {
        const apiManager = new ApiManager(request);
        await use(apiManager);
    },
});

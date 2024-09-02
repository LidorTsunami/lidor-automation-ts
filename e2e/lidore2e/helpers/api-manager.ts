import { APIRequestContext } from '@playwright/test';
import { PostsApiClient } from './posts-api-client'; // Adjust the path as needed
import { BaseApiClient } from './base-api-client'; // Adjust the path as needed

export class ApiManager {
    public readonly postsApiClient: PostsApiClient;
    public readonly baseApiClient: BaseApiClient;

    constructor(request: APIRequestContext) {
        this.postsApiClient = new PostsApiClient(request);
        this.baseApiClient = new BaseApiClient(request);
    }
}
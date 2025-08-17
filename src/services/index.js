// Export the base API class
export { BaseApi } from './baseApi.js';

// Export the specific API classes
export { default as PhotosApi } from './photosApi.js';
export { default as AlbumsApi } from './albumsApi.js';
export { default as AuthApi } from './authApi.js';
export { default as UserApi } from './userApi.js';

// For backward compatibility, also export as named exports
import PhotosApi from './photosApi.js';
import AlbumsApi from './albumsApi.js';
import AuthApi from './authApi.js';
import UserApi from './userApi.js';

export {
    PhotosApi,
    AlbumsApi, 
    AuthApi,
    UserApi
};
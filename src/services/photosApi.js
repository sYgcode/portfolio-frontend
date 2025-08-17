import { BaseApi } from './baseApi.js';

const photosAPI_Url = '/api/photos';

export default class PhotosApi extends BaseApi {
    constructor() {
        super(photosAPI_Url, 'photo');
    }

    // Wrapper methods to maintain existing API interface
    async getPhotos(limit = 10, page = 1) {
        return this.getAll(limit, page);
    }

    async getFeaturedPhotos(limit = 5, page = 1) {
        return this.getFeatured(limit, page);
    }

    async getPhotosByTag(tag, limit = 10, page = 1) {
        return this.getByTag(tag, limit, page);
    }

    async searchPhotos(searchTerm, limit = 10, page = 1) {
        return this.search(searchTerm, limit, page);
    }

    async getPhotoById(photoId) {
        return this.getById(photoId);
    }

    async createPhoto(photoData) {
        // Prepare FormData for photo upload
        const formData = new FormData();
        
        // Required fields
        formData.append('image', photoData.image);
        formData.append('title', photoData.title);
        
        // Optional fields
        if (photoData.description) {
            formData.append('description', photoData.description);
        }
        
        if (photoData.photographer) {
            formData.append('photographer', photoData.photographer);
        }
        
        if (photoData.tags && photoData.tags.length > 0) {
            formData.append('tags', JSON.stringify(photoData.tags));
        }
        
        // Add comprehensive metadata if provided
        if (photoData.metadata) {
            formData.append('metadata', JSON.stringify(photoData.metadata));
        }

        return this.create(formData, true); // true indicates FormData usage
    }

    async updatePhoto(photoId, photoData) {
        // Prepare FormData for photo update
        const formData = new FormData();
        
        formData.append('title', photoData.title);
        formData.append('description', photoData.description || '');
        formData.append('isFeatured', photoData.isFeatured);
        
        if (photoData.tags && Array.isArray(photoData.tags)) {
            formData.append('tags', JSON.stringify(photoData.tags));
        }
        
        // Add metadata if provided
        if (photoData.metadata) {
            formData.append('metadata', JSON.stringify(photoData.metadata));
        }

        return this.update(photoId, formData, true); // true indicates FormData usage
    }

    async deletePhoto(photoId) {
        return this.delete(photoId);
    }

    // Photo-specific methods that don't exist in albums
    async getFullResImage(photoId) {
        try {
            const token = this.getToken();
            const response = await fetch(`${this.baseUrl}/${photoId}/full`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch full resolution image: ${response.status} ${response.statusText}`);
            }

            const data = await response.blob();
            return URL.createObjectURL(data);

        } catch (error) {
            console.error('Error fetching full resolution image:', error);
            throw error;
        }
    }
}
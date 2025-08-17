import { BaseApi } from './baseApi.js';

const albumsAPI_Url = '/api/albums';

export default class AlbumsApi extends BaseApi {
    constructor() {
        super(albumsAPI_Url, 'album');
    }

    // Wrapper methods to maintain existing API interface
    async getAlbums(limit = 10, page = 1) {
        return this.getAll(limit, page);
    }

    async getFeaturedAlbums(limit = 5, page = 1) {
        return this.getFeatured(limit, page);
    }

    async getAlbumsByTag(tag, limit = 10, page = 1) {
        return this.getByTag(tag, limit, page);
    }

    async searchAlbums(searchTerm, limit = 10, page = 1) {
        return this.search(searchTerm, limit, page);
    }

    async getAlbumById(albumId) {
        return this.getById(albumId);
    }

    async createAlbum(albumData) {
        // Prepare album data for JSON request
        const requestBody = {
            title: albumData.title,
            description: albumData.description || '',
            coverImageUrl: albumData.coverImageUrl,
            photos: albumData.photos || [],
            isFeatured: albumData.isFeatured || false,
            isHidden: albumData.isHidden || false,
            tags: albumData.tags || []
        };

        return this.create(requestBody, false); // false indicates JSON usage
    }

    async updateAlbum(albumId, albumData) {
        // Prepare album data for JSON request
        const requestBody = {
            title: albumData.title,
            description: albumData.description || '',
            coverImageUrl: albumData.coverImageUrl,
            photos: albumData.photos || [],
            isFeatured: albumData.isFeatured || false,
            isHidden: albumData.isHidden || false,
            tags: albumData.tags || []
        };

        return this.update(albumId, requestBody, false); // false indicates JSON usage
    }

    async deleteAlbum(albumId) {
        return this.delete(albumId);
    }

    // Album-specific methods that don't exist in photos
    async addPhotosToAlbum(albumId, photoIds) {
        try {
            // First get the current album
            const album = await this.getAlbumById(albumId);
            
            // Merge existing photos with new ones (avoid duplicates)
            const currentPhotoIds = album.photos.map(photo => 
                typeof photo === 'string' ? photo : photo._id
            );
            const newPhotoIds = photoIds.filter(id => !currentPhotoIds.includes(id));
            const updatedPhotos = [...currentPhotoIds, ...newPhotoIds];

            // Update the album
            return await this.updateAlbum(albumId, {
                ...album,
                photos: updatedPhotos
            });

        } catch (error) {
            console.error('Error adding photos to album:', error);
            throw error;
        }
    }

    async removePhotosFromAlbum(albumId, photoIds) {
        try {
            // First get the current album
            const album = await this.getAlbumById(albumId);
            
            // Remove specified photos
            const currentPhotoIds = album.photos.map(photo => 
                typeof photo === 'string' ? photo : photo._id
            );
            const updatedPhotos = currentPhotoIds.filter(id => !photoIds.includes(id));

            // Update the album
            return await this.updateAlbum(albumId, {
                ...album,
                photos: updatedPhotos
            });

        } catch (error) {
            console.error('Error removing photos from album:', error);
            throw error;
        }
    }
}
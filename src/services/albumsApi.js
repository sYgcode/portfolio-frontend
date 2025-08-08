const serverUrl = import.meta.env.VITE_SERVER_URL;
const albumsAPI_Url = '/api/albums';

export default class AlbumsApi {
    constructor() {
        this.baseUrl = serverUrl + albumsAPI_Url;
    }

    // Gets
    async getAlbums(limit = 10, page = 1) {
        try {
            const response = await fetch(`${this.baseUrl}?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching albums:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    async getFeaturedAlbums(limit = 5, page = 1) {
        try {
            const response = await fetch(`${this.baseUrl}/featured?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch featured albums: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching featured albums:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    async getAlbumsByTag(tag, limit = 10, page = 1) {
        try {
            const queryParams = new URLSearchParams({
                limit: limit.toString(),
                page: page.toString(),
            });

            if (tag && tag.trim().length > 0) {
                queryParams.append('tag', tag.trim());
            }

            const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch albums: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching albums by tag:', error);
            throw error; // Re-throw so the calling code can handle it
        }
    }

    async searchAlbums(searchTerm, limit = 10, page = 1) {
        try {
            const queryParams = new URLSearchParams({
                limit: limit.toString(),
                page: page.toString(),
                search: searchTerm.trim()
            });

            const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Failed to search albums: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error searching albums:', error);
            throw error;
        }
    }

    async getAlbumById(albumId) {
        console.log('Fetching album with ID:', albumId);
        try {
            const response = await fetch(`${this.baseUrl}/${albumId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch album: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching album:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    // Posts
    async createAlbum(albumData) {
        try {
            console.log('Creating album with data:', albumData);
            const token = this.getToken();
            
            const requestBody = {
                title: albumData.title,
                description: albumData.description || '',
                coverImageUrl: albumData.coverImageUrl,
                photos: albumData.photos || [],
                isFeatured: albumData.isFeatured || false,
                isHidden: albumData.isHidden || false,
                tags: albumData.tags || []
            };

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
            });
            
            console.log('Create album response:', response);

            if (!response.ok) {
                // Parse error message from response if available
                let errorMessage = `Failed to create album: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.errors && errorData.errors.length > 0) {
                        errorMessage = errorData.errors.map(err => err.msg || err.message).join(', ');
                    }
                } catch (e) {
                    // If we can't parse the error response, use the default message
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error creating album:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    async updateAlbum(albumId, albumData) {
        try {
            const token = this.getToken();
            
            const requestBody = {
                title: albumData.title,
                description: albumData.description || '',
                coverImageUrl: albumData.coverImageUrl,
                photos: albumData.photos || [],
                isFeatured: albumData.isFeatured || false,
                isHidden: albumData.isHidden || false,
                tags: albumData.tags || []
            };

            const response = await fetch(`${this.baseUrl}/${albumId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include'
            });

            console.log('Update album response:', response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to update album: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error updating album:', error);
            throw error;
        }
    }

    // Add photos to album
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

    // Remove photos from album
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

    // Deletes
    async deleteAlbum(albumId) {
        try {
            const token = this.getToken();
            const response = await fetch(`${this.baseUrl}/${albumId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete album: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error deleting album:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    // Helper method to get token (you'll need to implement this)
    getToken() {
        return localStorage.getItem('token');
    }
}
const serverUrl = import.meta.env.VITE_SERVER_URL;
const photosAPI_Url = '/api/photos';

export default class PhotosApi {
    constructor() {
        this.baseUrl = serverUrl + photosAPI_Url;
    }
    // Gets
    async getPhotos(limit = 10, page = 1) {
        try {
            const response = await fetch(`${this.baseUrl}?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching photos:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }
    async getFeaturedPhotos() {
        try {
            const response = await fetch(`${this.baseUrl}/featured`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch featured photos: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching featured photos:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

    async getPhotosByTag(tag, limit = 10, page = 1) {
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
            throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching photos:', error);
            throw error; // Re-throw so the calling code can handle it
        }
    }

    async getPhotoById(photoId) {
        console.log('Fetching photo with ID:', photoId);
        try {
            const response = await fetch(`${this.baseUrl}/${photoId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch photo: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching photo:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }

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
            throw error; // Re-throw to let calling code handle it
        }
    }

    // Posts
    async createPhoto(photoData) {
    try {
        console.log('Creating photo with data:', photoData);
        const token = this.getToken();
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

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
            credentials: 'include'
        });
        
        console.log('Create photo response:', response);

        if (!response.ok) {
            // Parse error message from response if available
            let errorMessage = `Failed to create photo: ${response.status} ${response.statusText}`;
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
        console.error('Error creating photo:', error);
        throw error; // Re-throw to let calling code handle it
    }
}
    async updatePhoto(photoId, photoData) {
    try {
        const token = this.getToken();
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

        const response = await fetch(`${this.baseUrl}/${photoId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
            credentials: 'include'
        });
        console.log('Update photo response:', response);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to update photo: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
}

    // Deletes
    async deletePhoto(photoId) {
        try {
            const token = this.getToken();
            const response = await fetch(`${this.baseUrl}/${photoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete photo: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error deleting photo:', error);
            throw error; // Re-throw to let calling code handle it
        }
    }


    // Helper method to get token (you'll need to implement this)
    getToken() {
        return localStorage.getItem('token');
    }
}

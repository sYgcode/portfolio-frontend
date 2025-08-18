const serverUrl = import.meta.env.VITE_SERVER_URL;
const userAPI_Url = '/api/users';

export default class UserApi {
    constructor() {
        this.baseUrl = serverUrl + userAPI_Url;
    }

    // Helper method to get token
    getToken() {
        return localStorage.getItem('token');
    }

    // Helper method to get auth headers
    getAuthHeaders() {
        const token = this.getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    // GET /me - Get current user profile
    async getCurrentUser() {
        console.log('Fetching current user profile');
        try {
            const response = await fetch(`${this.baseUrl}/me`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Get current user response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to get user: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Get current user error:', error);
            throw error;
        }
    }

    // PUT /me/profilePicture - Update profile picture
    async updateProfilePicture(profilePictureUrl) {
        try {
            const response = await fetch(`${this.baseUrl}/me/profilePicture`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ profilePicture: profilePictureUrl }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update profile picture response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to update profile picture: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Update profile picture error:', error);
            if (error instanceof TypeError || error.message.includes('Failed to fetch')) {
                throw new Error(`Network error detected. Your profile picture may have been updated, but the server did not respond correctly. Please try again.`);
            }
            throw error;
        }
    }

    // PUT /me/firstname - Update first name
    async updateFirstName(firstName) {
        try {
            const response = await fetch(`${this.baseUrl}/me/firstname`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ firstName }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update first name response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to update first name: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Update first name error:', error);
            throw error;
        }
    }

    // PUT /me/lastname - Update last name
    async updateLastName(lastName) {
        try {
            const response = await fetch(`${this.baseUrl}/me/lastname`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ lastName }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update last name response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to update last name: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Update last name error:', error);
            throw error;
        }
    }

    // PUT /me/username - Update username
    async updateUsername(username) {
        try {
            const response = await fetch(`${this.baseUrl}/me/username`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ username }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update username response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to update username: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Update username error:', error);
            throw error;
        }
    }

    // PUT /me/password - Update password
    async updatePassword(currentPassword, newPassword) {
        try {
            const response = await fetch(`${this.baseUrl}/me/password`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ currentPassword, newPassword }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Update password response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to update password: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Update password error:', error);
            throw error;
        }
    }

    // GET /me/favorites - Get user's favorites (photos or products)
    async getFavorites(type) {
        try {
            const response = await fetch(`${this.baseUrl}/me/favorites?type=${type}`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Get favorites response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to get favorites: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Get favorites error:', error);
            throw error;
        }
    }

    // GET /me/favorites/:id - Check if specific item is favorited
    async isFavorited(id, type) {
        try {
            const response = await fetch(`${this.baseUrl}/me/favorites/${id}?type=${type}`, {
                method: 'GET',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Is favorited response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to check favorite status: ${response.status}`);
            }

            return data.isFavorited;
        } catch (error) {
            console.error('Is favorited error:', error);
            throw error;
        }
    }

    // PUT /me/favorites - Add item to favorites
    async addToFavorites(id, type) {
        try {
            const response = await fetch(`${this.baseUrl}/me/favorites`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ id, type }),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Add to favorites response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to add to favorites: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Add to favorites error:', error);
            throw error;
        }
    }

    // DELETE /me/favorites/:id - Remove item from favorites
    async removeFromFavorites(id, type) {
        try {
            const response = await fetch(`${this.baseUrl}/me/favorites/${id}?type=${type}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders(),
                credentials: 'include'
            });

            const data = await response.json();
            console.log('Remove from favorites response:', data);

            if (!response.ok) {
                throw new Error(data.message || `Failed to remove from favorites: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('Remove from favorites error:', error);
            throw error;
        }
    }

    // Convenience method to toggle favorite status
    async toggleFavorite(id, type) {
        try {
            const isCurrentlyFavorited = await this.isFavorited(id, type);
            
            if (isCurrentlyFavorited) {
                return await this.removeFromFavorites(id, type);
            } else {
                return await this.addToFavorites(id, type);
            }
        } catch (error) {
            console.error('Toggle favorite error:', error);
            throw error;
        }
    }
}
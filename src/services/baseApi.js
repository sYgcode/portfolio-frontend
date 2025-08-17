const serverUrl = import.meta.env.VITE_SERVER_URL;

/**
 * Generic API base class for handling common CRUD operations
 * Provides standardized methods for Photos and Albums APIs
 */
export class BaseApi {
    constructor(apiPath, resourceName) {
        this.baseUrl = serverUrl + apiPath;
        this.resourceName = resourceName; // 'photo' or 'album'
        this.resourceNamePlural = resourceName + 's'; // 'photos' or 'albums'
    }

    // GET /{resource}s - Get all resources with pagination
    async getAll(limit = 10, page = 1) {
        try {
            const response = await fetch(`${this.baseUrl}?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch ${this.resourceNamePlural}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error fetching ${this.resourceNamePlural}:`, error);
            throw error;
        }
    }

    // GET /{resource}s/featured - Get featured resources
    async getFeatured(limit = 5, page = 1) {
        try {
            const response = await fetch(`${this.baseUrl}/featured?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch featured ${this.resourceNamePlural}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching featured ${this.resourceNamePlural}:`, error);
            throw error;
        }
    }

    // GET /{resource}s?tag={tag} - Get resources by tag
    async getByTag(tag, limit = 10, page = 1) {
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
                throw new Error(`Failed to fetch ${this.resourceNamePlural}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error fetching ${this.resourceNamePlural} by tag:`, error);
            throw error;
        }
    }

    // GET /{resource}s?search={term} - Search resources
    async search(searchTerm, limit = 10, page = 1) {
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
                throw new Error(`Failed to search ${this.resourceNamePlural}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error searching ${this.resourceNamePlural}:`, error);
            throw error;
        }
    }

    // GET /{resource}s/{id} - Get resource by ID
    async getById(resourceId) {
        console.log(`Fetching ${this.resourceName} with ID:`, resourceId);
        try {
            const response = await fetch(`${this.baseUrl}/${resourceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch ${this.resourceName}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error fetching ${this.resourceName}:`, error);
            throw error;
        }
    }

    // POST /{resource}s - Create new resource
    async create(resourceData, useFormData = false) {
        try {
            console.log(`Creating ${this.resourceName} with data:`, resourceData);
            const token = this.getToken();
            
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            let body;
            if (useFormData) {
                // For file uploads - don't set Content-Type, let browser set it
                body = resourceData;
            } else {
                // For JSON data
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(resourceData);
            }

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers,
                body,
                credentials: 'include'
            });
            
            console.log(`Create ${this.resourceName} response:`, response);

            if (!response.ok) {
                let errorMessage = `Failed to create ${this.resourceName}: ${response.status} ${response.statusText}`;
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
            console.error(`Error creating ${this.resourceName}:`, error);
            throw error;
        }
    }

    // PUT /{resource}s/{id} - Update resource
    async update(resourceId, resourceData, useFormData = false) {
        try {
            const token = this.getToken();
            
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            let body;
            if (useFormData) {
                // For file uploads - don't set Content-Type, let browser set it
                body = resourceData;
            } else {
                // For JSON data
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(resourceData);
            }

            const response = await fetch(`${this.baseUrl}/${resourceId}`, {
                method: 'PUT',
                headers,
                body,
                credentials: 'include'
            });

            console.log(`Update ${this.resourceName} response:`, response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Failed to update ${this.resourceName}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error updating ${this.resourceName}:`, error);
            throw error;
        }
    }

    // DELETE /{resource}s/{id} - Delete resource
    async delete(resourceId) {
        try {
            const token = this.getToken();
            const response = await fetch(`${this.baseUrl}/${resourceId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`Failed to delete ${this.resourceName}: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error(`Error deleting ${this.resourceName}:`, error);
            throw error;
        }
    }

    // Helper method to get token
    getToken() {
        return localStorage.getItem('token');
    }
}
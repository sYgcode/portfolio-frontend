import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Image, Package, FolderOpen, BarChart3, Users, Settings } from 'lucide-react';

const AdminPanel = () => {
  const navigate = useNavigate();
  
  const handleAddPhoto = () => {
    navigate('/admin/add-photo');
  };

  const handleAddAlbum = () => {
    navigate('/admin/add-album');
  };

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  const primaryActions = [
    {
      id: 'add-album',
      title: 'Add Album',
      description: 'Create and organize photo albums',
      icon: FolderOpen,
      action: handleAddAlbum,
      primary: true
    },
    {
      id: 'add-photo',
      title: 'Add Photo',
      description: 'Upload and manage gallery images',
      icon: Image,
      action: handleAddPhoto,
      primary: true
    },
    {
      id: 'add-product',
      title: 'Add Product',
      description: 'Create and manage new products',
      icon: Package,
      action: handleAddProduct,
      primary: true
    }
  ];

  const secondaryActions = [
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View performance metrics',
      icon: BarChart3,
      action: () => console.log('Analytics coming soon'),
      disabled: true
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Manage user accounts',
      icon: Users,
      action: () => console.log('Users coming soon'),
      disabled: true
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure app settings',
      icon: Settings,
      action: () => console.log('Settings coming soon'),
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 mt-2 font-light">
                Manage your application content and settings
              </p>
            </div>
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded-sm opacity-90"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Primary Actions */}
        <div className="mb-16">
          <h2 className="text-xl font-light text-gray-900 mb-8 tracking-tight">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-8 text-left transition-all duration-300 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50 hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="h-14 w-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        <IconComponent className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-900 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Plus className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Actions */}
        <div>
          <h2 className="text-xl font-light text-gray-900 mb-8 tracking-tight">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {secondaryActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={action.action}
                  disabled={action.disabled}
                  className="relative bg-gray-50/50 border border-gray-100 rounded-xl p-6 text-left transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                      <IconComponent className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-700 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-1">-</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Albums</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-1">-</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-1">-</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-gray-900 mb-1">-</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
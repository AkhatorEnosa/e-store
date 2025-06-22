import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {const navigate = useNavigate();

    return (
      <div className="min-h-screen bg-[#f6f6f6] flex flex-col items-center justify-center gap-8 p-4">
            <h1 className="text-9xl font-bold bg-black text-white py-4 px-6 rounded-lg">404</h1> 
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
            </p>
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                <i className='bi bi-house-door-fill'></i> Home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition-colors"
              >
                <i className='bi bi-arrow-left'></i> Go Back
              </button>
            </div>
  
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Need help? <a href="/contact" className="text-primary-600 hover:underline">Contact support</a>
              </p>
            </div>
          </div>
      </div>
    );
}

export default NotFound
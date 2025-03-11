export const ImageModal = ({ imageUrl, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white p-4 rounded-lg max-w-[90vw] max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-all duration-200 ease-in-out shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Close image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={imageUrl}
            alt="Large view"
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>
      </div>
    );
  };
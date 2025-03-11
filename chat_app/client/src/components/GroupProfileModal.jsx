import React from "react";
import { X } from "lucide-react";

export function GroupProfileModal({ isOpen, onClose, group }) {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50">
      <div className="bg-base-200 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-gray-800">{group.name}</h3>
          <button 
            onClick={onClose} 
            className="text-lg text-gray-600 hover:text-gray-800"
          >
            <span className="font-bold text-xl"> <X/> </span>
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <img
            src={group.image || "/avatar.png"}
            alt={group.name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-primary"
          />
          <p className="mt-3 text-sm text-gray-600">
            {group.description || "No description available."}
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={onClose} 
            className="btn btn-primary btn-sm w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

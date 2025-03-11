import React, { useState } from "react";
import { useGroupStore } from "../store/useGroupStore";
import { ImageModal } from "./ImageModal";
import { X, MergeIcon, SquareMenu } from "lucide-react";
import { GroupProfileModal } from "./GroupProfileModal";

export default function GroupChatHeader() {
  const { selectedGroup, setSelectedGroup } = useGroupStore();
  const [selectImage, setSelectedImage] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedGroup.image || "/avatar.png"}
                alt={selectedGroup.name}
                onClick={() => setSelectedImage(selectedGroup.image)}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedGroup.name}</h3>
            <p className="text-sm text-base-content/70">Group</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
        <button onClick={openProfileModal} className="text-base-content/70 hover:text-base-content">
          <SquareMenu />
        </button>

        <button onClick={() => setSelectedGroup(null)}>
          <X />
        </button>
        </div>
      </div>
      <ImageModal
        imageUrl={selectImage}
        isOpen={!!selectImage}
        onClose={() => setSelectedImage(null)}
      />
      <GroupProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        group={selectedGroup}
      />
    </div>
  );
}

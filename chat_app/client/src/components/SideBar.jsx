import React, { useEffect, useState } from "react";
import { Users, Search, PlusIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SlideBarSkeleton from "./SlideBarSkeleton";
import { ImageModal } from "./ImageModal";
import { useGroupStore } from "../store/useGroupStore";
import toast from "react-hot-toast";

export default function SideBar() {
  const { users, selectedUser, isUsersLoading, getUsers, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const {
    setSelectedGroup,
    groups,
    isGroupsLoading,
    createGroups,
    fetchGroup,
    selectedGroup,
  } = useGroupStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    // Fetch data on mount
    getUsers();
    fetchGroup();
  }, [getUsers, fetchGroup]);

  const filteredUsers = users.filter((user) => {
    const isOnline = onlineUsers.includes(user._id);
    const matchesSearch = user.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return (showOnlineOnly ? isOnline : true) && matchesSearch;
  });

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const combineUsersAndGroups = [...filteredUsers, ...filteredGroups];

  const handleGroupSelect = (group) => {
    setSelectedUser(null);
    setSelectedGroup(group);
  };

  const handleUserSelect = (user) => {
    setSelectedGroup(null);
    setSelectedUser(user);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }
    try {
      await createGroups(groupName);
      setIsOpenModal(false);
      setGroupName("");
      await fetchGroup();
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  if (isUsersLoading || isGroupsLoading) return <SlideBarSkeleton />;

  const handleImageClick = (item, event) => {
    if (event.target.tagName === "IMG") {
      setSelectedImage(item.profilePic || item.image);
    }
  };

  const handleItemClick = (item) => {
    if (item.fullName) {
      setSelectedUser(item);
      setSelectedGroup(null);
    }

    if (item.name) {
      setSelectedGroup(item);
      setSelectedUser(null);
    }
  };

  return (
    <aside className="h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>

        <div className="relative mt-3">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 size-4" />
          <input
            type="text"
            placeholder="Search users and groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-md bg-base-200 text-sm focus:outline-none"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>

        <div className="mt-3 flex items-center">
          <button
            className="btn bg-base-200 w-full"
            onClick={() => setIsOpenModal(true)}
          >
            <PlusIcon size={22} />
            <span>Create Group</span>
          </button>
        </div>

        {isOpenModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="bg-base-300 p-5 rounded-lg w-96">
              <h1 className="text-xl font-medium mb-3">Create Group</h1>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="input mb-3 w-full"
              />
              <button
                className="btn bg-base-100 w-full"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
              <button
                className="btn bg-base-100 w-full mt-3"
                onClick={() => {
                  setIsOpenModal(false);
                  setGroupName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {combineUsersAndGroups.length > 0 ? (
          combineUsersAndGroups.map((item) => (
            <button
              key={item._id}
              onClick={() => handleItemClick(item)}
              onMouseDown={(event) => handleImageClick(item, event)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors
                ${
                  selectedUser?._id === item._id ||
                  selectedGroup?._id === item._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={item.profilePic || item.image}
                  alt={item.fullName || item.name}
                  className="size-12 object-cover rounded-full"
                />
                {item.fullName !== undefined &&
                  onlineUsers.includes(item._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
              </div>

              <div className="text-left min-w-0 flex-1">
                <div className="font-medium truncate">
                  {item.fullName !== undefined ? item.fullName : item.name}
                </div>
                <div className="text-sm text-zinc-400">
                  {item.fullName !== undefined
                    ? onlineUsers.includes(item._id)
                      ? "Online"
                      : "Offline"
                    : "Group"}
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">
            No users or groups found
          </div>
        )}
      </div>
      <ImageModal
        imageUrl={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </aside>
  );
}

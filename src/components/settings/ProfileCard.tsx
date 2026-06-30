import { useProfile } from "../../hooks/useProfile";
import { useRef, useState } from "react";

export default function ProfileCard() {
  const { profile, updateProfile, uploadProfilePicture, loading } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadProfilePicture(file);
    }
  };

  const startEditing = () => {
    setEditName(profile.name);
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const saveEditing = () => {
    updateProfile({ name: editName });
    setEditing(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
      <h2 className="text-white text-2xl font-semibold mb-6">Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <img
            src={profile.profilePicture || "https://i.pravatar.cc/150?u=admin"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-700 group-hover:opacity-75 transition-opacity"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold"
          >
            Upload
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 text-sky-300 hover:text-sky-200 text-sm"
        >
          Change Profile Picture
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 text-center py-4">Loading profile...</div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs mb-1">Name</label>
            {editing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg px-3 py-2 text-lg"
              />
            ) : (
              <p className="text-white text-lg">{profile.name}</p>
            )}
          </div>
          <div>
            <label className="block text-slate-300 text-xs mb-1">Email</label>
            <p className="text-white text-lg">{profile.email}</p>
          </div>
          <div className="flex gap-3 pt-2">
            {editing ? (
              <>
                <button
                  onClick={saveEditing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-slate-800 text-white border border-slate-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

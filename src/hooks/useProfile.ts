import { useState, useEffect } from "react";
import * as userApi from "../api/userApi";

interface Profile {
  name: string;
  email: string;
  profilePicture: string | null;
}

const defaultProfile: Profile = {
  name: "Admin",
  email: "admin@email.com",
  profilePicture: null,
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = localStorage.getItem("userProfile");
    if (!stored) return defaultProfile;
    try {
      return JSON.parse(stored) as Profile;
    } catch {
      return defaultProfile;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    userApi
      .getProfile()
      .then((data) => {
        const p: Profile = {
          name: data.name || defaultProfile.name,
          email: data.email || defaultProfile.email,
          profilePicture: data.picture || null,
        };
        setProfile(p);
        localStorage.setItem("userProfile", JSON.stringify(p));
        setError(null);
      })
      .catch((err) => {
        console.warn("Failed to fetch profile from API, using local data:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = (updates: Partial<Profile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem("userProfile", JSON.stringify(updated));

    const token = localStorage.getItem("token");
    if (!token) return;

    userApi.updateProfile({
      name: updates.name || undefined,
      picture: updates.profilePicture || undefined,
    }).catch((err) => {
      console.warn("Failed to update profile on API, saved locally:", err);
    });
  };

  const uploadProfilePicture = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      updateProfile({ profilePicture: base64 });
    };
    reader.readAsDataURL(file);
  };

  return { profile, updateProfile, uploadProfilePicture, loading, error };
};

'use client';
import { getCurrentUser, signOut } from '@/lib/auth';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <button onClick={handleLogout} className="mt-4 rounded-md bg-red-600 p-2 text-white">
        Logout
      </button>
    </div>
  );
}
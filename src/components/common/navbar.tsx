/* eslint-disable jsx-a11y/anchor-is-valid */
/* This example requires Tailwind CSS v2.0+ */
import React, { useEffect, useState } from "react";

import Logo from "../../assets/logo.png";
import { uauth } from "../../constants/unstoppableDomains";

export function Navbar() {
  const login = async () => {
    try {
      await uauth.login();
    } catch (err) {
      console.log(err);
    }
  };
  const [loading, setLoading] = useState<any>(false);

  const [profile, setProfile] = useState<any>(null);

  const fetchUser = () => {
    uauth
      .user()
      .then((data) => {
        if (data) {
          setProfile(data);
        } else {
          setProfile(false);
        }
      })
      .catch((_err) => {});
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      await uauth.logout();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-20 w-screen flex justify-between bg-slate-900 pt-2">
      <img
        src={Logo}
        className="w-16 h-16 md:w-36 md:h-36 md:-translate-y-3 md:-translate-y-4"
        alt="Logo"
      />
      {profile ? (
        <button
          onClick={logout}
          className="bg-red-500	text-white font-medium translate-y-1 flex h-10 p-3 items-center m-2 rounded"
        >
          Logout
          <img
            className="h-4 w-4 mx-2"
            alt="Login With Unstoppable"
            src="https://gitcoin.co/dynamic/avatar/unstoppabledomains"
          />
        </button>
      ) : (
        <button
          onClick={login}
          className="bg-red-500	text-white font-medium translate-y-1 flex h-10 p-3 items-center m-2 rounded"
        >
          Login With Unstoppable
          <img
            className="h-4 w-4 mx-2"
            alt="Login With Unstoppable"
            src="https://gitcoin.co/dynamic/avatar/unstoppabledomains"
          />
        </button>
      )}
    </div>
  );
}

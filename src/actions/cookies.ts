"use server";

// REVIEWED - 01

import { cookies } from "next/headers";

export const getCookie = async function getCookie(name: string) {
  return (await cookies()).get(name);
};

export const setCookie = async function setCookie(name: string, value: string) {
  (await cookies()).set({
    name,
    value,
    secure: true,
    httpOnly: true,
    path: "/",
  });
};

export const deleteCookie = async function deleteCookie(name: string) {
  (await cookies()).delete(name);
};

import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "./Auth";

export default function AuthRedirect({ user }) {
  return !user ? <Auth /> : <Navigate replace to="/posts" />;
}

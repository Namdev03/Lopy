import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import Loading from "../Components/Loading";
import { pagePath } from "./pagePath";

function Protected() {
  const { isLoggedIn, isLoading } = useSelector(
    (store) => store.user
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to={pagePath.LOGIN} replace />;
  }

  return <Outlet />;
}

export default Protected;
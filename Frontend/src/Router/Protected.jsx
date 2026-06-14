// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router";
// import Loading from "../Components/Loading";
// import { pagePath } from "./pagePath";

// function Protected({ children }) {
//   const { isLoggedIn, isLoading } = useSelector(
//     (store) => store.user
//   );

//   if (isLoading) {
//     return <div><Loading/></div>;
//   }

//   if (!isLoggedIn) {
//     return <Navigate to={pagePath.LOGIN} replace />;
//   }

//   return children;
// }

// export default Protected;
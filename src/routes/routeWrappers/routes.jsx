import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DefaultLayout from "../../components/defaultLayout/defaultLayout";
import { Home } from "../Home";
import Login from "../Login";
import Signup from "../Signup";
import PetList from "../PetList";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <DefaultLayout>
        <Home />
      </DefaultLayout>
    ),
  },
  {
    path: "/pet-list",
    element: (
      <DefaultLayout>
        <PetList />
      </DefaultLayout>
    ),
  },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { routes } from "../utils/routes";
import { Suspense, useLayoutEffect } from "react";
import { Spin } from "antd";
import Home from "./jobSeeker/home";
import JobDetail from "./jobSeeker/job";
import EmployerLayout from "../layouts/EmployerLayout";
import Register from "./employer/auth/register";
import LogIn from "./employer/auth/login";
import ManagePost from "./employer/post";
import CreatePost from "./employer/post/CreatePost";
import AccountInfor from "./employer/account";
import CompanyInfor from "./employer/company";
import Profile from "./employer/profile";
import SavedProfile from "./employer/profile/SavedProfile";
import rootLoader from "./rootLoader";
import Account from "./jobSeeker/account";
import UserProfile from "./jobSeeker/account/profile";
import { useAppDispatch } from "../store";
import { getAllIndustries } from "../store/industry/actions";
import Employer from "./employer";
import { getAllJobs } from "../store/job/action";
import { Jobs } from "./jobSeeker/jobs";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: routes.HOME,
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },

          {
            path: routes.JOBSEEKER,
            element: <JobDetail />,
          },
          {
            path: routes.ACCOUNT,
            element: <Account />,
            children: [
              {
                path: routes.ACCOUNT_PROFILE,
                element: <UserProfile />,
              },
            ],
          },
          {
            path: routes.JOBS,
            element: <Jobs/>,
          }
        ],
      },
    ],
  },
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: routes.EMPLOYER,
        element: <EmployerLayout />,
        children: [
          {
            index: true,
            element: <Register />,
            loader: () => rootLoader({ authOptions: { isAuthRoute: true } }),
          },
          {
            path: routes.EMPLOYER_LOGIN,
            element: <LogIn />,
            loader: () => rootLoader({ authOptions: { isAuthRoute: true } }),
          },
          {
            path: routes.EMPLOYER_REGISTER,
            element: <Register />,
            loader: () => rootLoader({ authOptions: { isAuthRoute: true } }),
          },
          {
            path: routes.EMPLOYER_DEFAULT,
            element: <Employer/>,
            children: [
              {
                path: routes.EMPLOYER_MANAGEPOST,
                element: <ManagePost />,
              },
              {
                path: routes.EMPLOYER_CREATEPOST,
                element: <CreatePost />,
              },
              {
                path: routes.EMPLOYER_ACCOUNTINFOR,
                element: <AccountInfor />,
              },
              {
                path: routes.EMPLOYER_COMPANYINFOR,
                element: <CompanyInfor />,
              },
              {
                path: routes.EMPLOYER_PROFILE,
                element: <Profile />,
              },
              {
                path: routes.EMPLOYER_SAVEDPROFILE,
                element: <SavedProfile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(getAllIndustries());
    dispatch(getAllJobs());
 
  }, []);
  return (
    <>
      <Suspense
        fallback={
          <div className="fixed flex h-screen w-screen items-center justify-center ">
            <Spin size="large" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;

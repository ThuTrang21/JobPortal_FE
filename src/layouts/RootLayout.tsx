import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { useLayoutEffect } from "react";
import { setNavigateFunction } from "../store/app/actions";
import { useFirstRender } from "../hooks/useFirstRender";
import { AnyType } from "../interfaces/common";


function RootLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFirstRender = useFirstRender();

  useLayoutEffect(() => {
    if (isFirstRender()) {
      dispatch(setNavigateFunction(navigate) as AnyType);
    }
  }, [dispatch, isFirstRender, navigate]);
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

export default RootLayout;

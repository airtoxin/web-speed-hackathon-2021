import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { AppPage } from "../../components/application/AppPage";
import { useFetch } from "../../hooks/use_fetch";
import { fetchJSON } from "../../utils/fetchers";

import { AuthModalContainer } from "../AuthModalContainer";
import { NewPostModalContainer } from "../NewPostModalContainer";

const NotFoundContainer = React.lazy(() => import("../NotFoundContainer"));
const PostContainer = React.lazy(() => import("../PostContainer"));
const TermContainer = React.lazy(() => import("../TermContainer"));
const TimelineContainer = React.lazy(() => import("../TimelineContainer"));
const UserProfileContainer = React.lazy(() =>
  import("../UserProfileContainer")
);

/** @type {React.VFC} */
const AppContainer = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [activeUser, setActiveUser] = React.useState(null);
  const { data, isLoading } = useFetch("/api/v1/me", fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState("none");
  const handleRequestOpenAuthModal = React.useCallback(
    () => setModalType("auth"),
    []
  );
  const handleRequestOpenPostModal = React.useCallback(
    () => setModalType("post"),
    []
  );
  const handleRequestCloseModal = React.useCallback(
    () => setModalType("none"),
    []
  );

  React.useEffect(() => {
    document.title = isLoading ? "読込中 - CAwitter" : "CAwitter";
  }, [isLoading]);

  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Routes>
          <Route
            element={
              <React.Suspense fallback={null}>
                <TimelineContainer />
              </React.Suspense>
            }
            path="/"
          />
          <Route
            element={
              <React.Suspense fallback={null}>
                <UserProfileContainer />
              </React.Suspense>
            }
            path="/users/:username"
          />
          <Route
            element={
              <React.Suspense fallback={null}>
                <PostContainer />
              </React.Suspense>
            }
            path="/posts/:postId"
          />
          <Route
            element={
              <React.Suspense fallback={null}>
                <TermContainer />
              </React.Suspense>
            }
            path="/terms"
          />
          <Route
            element={
              <React.Suspense fallback={null}>
                <NotFoundContainer />
              </React.Suspense>
            }
            path="*"
          />
        </Routes>
      </AppPage>

      {modalType === "auth" ? (
        <AuthModalContainer
          onRequestCloseModal={handleRequestCloseModal}
          onUpdateActiveUser={setActiveUser}
        />
      ) : null}
      {modalType === "post" ? (
        <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} />
      ) : null}
    </>
  );
};

export { AppContainer };

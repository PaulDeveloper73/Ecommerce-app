import { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AppRoute from "./AppRoute";
import { Suspense, lazy } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Loading from "../components/Loading";

const AppRouting = () => {
  const routes = AppRoute.map((route, index) => {
    if (route.requireAuth === true) {
      return console.log("", route.path);
    } else {
      return (
        <Route
          exact
          key={index}
          path={route.path}
          element={<route.component />}
        />
      );
    }
  });

  const location = useLocation();
  const fadeRef = useRef(null); // useRef for CSSTransition

  return (
    <SwitchTransition>
      <CSSTransition
        nodeRef={fadeRef} // Ref used for CSSTransition
        key={location.key}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div className="fade" ref={fadeRef}>
          <Suspense fallback={<Loading />}>
            <Routes>{routes}</Routes>
          </Suspense>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppRouting;

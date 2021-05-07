import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/index";
import Dashboard from "./pages/Dashboard";

import * as path from "./constant/router";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import Detail from "./pages/Detail";

interface IConditionalProps extends RouteProps {
  readonly isMatch: boolean;
  readonly redirectPath: string;
  readonly component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const ConditionalRoute = ({
  component,
  redirectPath,
  isMatch,
  ...rest
}: IConditionalProps) => {
  const Component = component;

  const render = (renderProps: RouteComponentProps<any>) => {
    let element = <Component {...renderProps} />;

    if (!isMatch) {
      element = (
        <Redirect
          to={{
            pathname: redirectPath,
            state: { from: renderProps.location },
          }}
        />
      );
    }

    return element;
  };
  return <Route {...rest} render={render} />;
};

export const ListCityContext = React.createContext<any>(null);

const App = () => {
  const [listCity, setListCity] = React.useState<string[]>([
    "hanoi",
    "Berlin",
    "Hamburg",
    "Munich",
    "Cologne",
  ]);

  React.useEffect(() => {
    const store = localStorage.getItem("store_weathers");
    console.log(store);
    store === null
      ? localStorage.setItem("store_weathers", JSON.stringify(listCity))
      : setListCity(JSON.parse(localStorage.getItem("store_weathers")!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <ListCityContext.Provider
        value={{
          listCity,
          setListCity,
        }}
      >
        <Router basename={path.HOME}>
          <Header />
          <div className={styles.wrapperContent}>
            <span>
              {window.location.pathname === "/" ||
              window.location.pathname === "/dashboard"
                ? "Dashboard"
                : `Dashboard / Detail`}
            </span>
            <Switch>
              <ConditionalRoute
                path={`${path.DASHBOARD}`}
                component={Dashboard}
                exact={true}
                redirectPath={"/"}
                isMatch={true}
              />
              <ConditionalRoute
                path={`${path.DASHBOARD}/:nameCity`}
                component={Detail}
                exact={true}
                redirectPath={"/"}
                isMatch={true}
              />
              <Route component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </ListCityContext.Provider>
    </div>
  );
};

export default App;

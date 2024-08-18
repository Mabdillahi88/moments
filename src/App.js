import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Switch, Route } from "react-router-dom";  // Import Switch and Route

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home Page</h1>} />
          <Route path="/signin" render={() => <h1>Sign In Page</h1>} />
          <Route path="/signup" render={() => <h1>Sign Up Page</h1>} />
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

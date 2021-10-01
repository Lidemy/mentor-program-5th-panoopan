import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../Navbar";
import HomePage from "../../pages/HomePage";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import AboutPage from "../../pages/AboutPage";
import AdminPage from "../../pages/AdminPage";
import PostPage from "../../pages/PostPage";
import NewPostPage from "../../pages/NewPostPage";
import EditPostPage from "../../pages/EditPostPage";
import AuthorPage from "../../pages/AuthorPage";

import { useState, useEffect } from "react";
import { AuthContext, LoadingContext, PageContext } from "../../context";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setUser(response.data);
        }
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <PageContext.Provider value={{ page, setPage }}>
          <Root>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/post/:id">
                  <PostPage />
                </Route>
                <Route path="/new-post">
                  <NewPostPage />
                </Route>
                <Route path="/edit-post/:id">
                  <EditPostPage />
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/admin">
                  <AdminPage />
                </Route>
                <Route path="/author/:id">
                  <AuthorPage />
                </Route>
              </Switch>
            </Router>
          </Root>
        </PageContext.Provider>
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

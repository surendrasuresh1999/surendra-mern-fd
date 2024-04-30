import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CommonPage from "./Pages/CommonPage";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import AuthorsPage from "./Pages/AuthorsPage";
import JokesPage from "./Pages/JokesPage";
import QuotesPage from "./Pages/QuotesPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<CommonPage />}>
        <Route index element={<HomePage />} />
        <Route path="authors" element={<AuthorsPage />} />
        <Route path="blog/:id" element={<BlogDetailsPage />} />
        <Route path="jokes" element={<JokesPage />} />
        <Route path="quotes" element={<QuotesPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

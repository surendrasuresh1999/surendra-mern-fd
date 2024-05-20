import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import CommonPage from "./Pages/CommonPage";
import PageNotFound from "./Pages/PageNotFound";
import AuthorsPage from "./Pages/AuthorsPage";
import JokesPage from "./Pages/JokesPage";
import QuotesPage from "./Pages/QuotesPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import MyActivityPage from "./Pages/MyActivityPage";
import LandingPage from "./Pages/LandingPage";
import BlogsPage from "./Pages/BlogsPage";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<CommonPage />}>
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="my-activity" element={<MyActivityPage />} />
          <Route path="blogs/:id" element={<BlogDetailsPage />} />
          <Route path="my-activity/blogs/:id" element={<BlogDetailsPage />} />
          <Route path="jokes" element={<JokesPage />} />
          <Route path="quotes" element={<QuotesPage />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;

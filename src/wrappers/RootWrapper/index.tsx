import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';

const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const Tasks = lazy(() => import('pages/Tasks'));
const SearchProduct = lazy(() => import('pages/SearchProduct'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="tasks" element={<Tasks />} />
          <Route path="search-product" element={<SearchProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';

const Login = lazy(() => import('pages/Login'));
const SignUp = lazy(() => import('pages/SignUp'));
const Home = lazy(() => import('pages/Home'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

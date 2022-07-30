import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';

const Home = lazy(() => import('pages/Home'));
const Category = lazy(() => import('pages/Category'));
const SearchExam = lazy(() => import('pages/SearchExam'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search-exam" element={<SearchExam />} />
        </Route>
      </Routes>
    </div>
  );
}

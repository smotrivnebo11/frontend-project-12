import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from 'react-router-dom';
// import {
//   Route,
//   RouterProvider,
//   Navigate,
//   useLocation,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from 'react-router-dom';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import ChatLayout from './layouts/ChatLayout.jsx';
// import MainLayout from './layouts/MainLayout.jsx';
// import Layout from './layouts/MainLayout.jsx';
import { appPaths } from '../routes/routes.js';
import { useAuth } from '../hooks/index.js';

import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import NavBar from './navbar/Navbar.jsx';

// const Root = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();
//   return user ? children : <Navigate to={appPaths.loginPagePath()} state={{ from: location }} />;
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path={appPaths.chatPagePath()} element={<Layout />}>
//       <Route
//         index
//         element={(
//           <Root>
//             <ChatPage />
//           </Root>
//         )}
//       />
//       <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
//       <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Route>,
//   ),
// );

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={appPaths.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      {/* <ToastContainer /> */}
      <NavBar />

      <Routes>
        <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
        <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
        <Route
          path={appPaths.chatPagePath()}
          element={(
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  </BrowserRouter>
);

// const App = () => (
//   <>
//     <div className="d-flex flex-column h-100">
//       {/* <RouterProvider router={router} /> */}
//       <Router>
//         <NavBar />
//         <Routes>
//           <Route path={appPaths.notFoundPath()} element={<NotFoundPage />} />
//           <Route element={<MainLayout />}>
//             <Route path={appPaths.loginPagePath()} element={<LoginPage />} />
//             <Route path={appPaths.signupPagePath()} element={<SignUpPage />} />
//           </Route>
//           <Route element={<ChatLayout />}>
//             <Route path={appPaths.chatPagePath()} element={<ChatPage />} />
//           </Route>
//         </Routes>
//       </Router>
//     </div>
//     <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="light"
//     />
//   </>
// );

export default App;

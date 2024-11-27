import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import MultiStepForm from './Multiform/MultiStepForm';
import ForgotPasswordPage from './ForgotPasswordPage';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("accessToken");
  
  
  return accessToken ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem("accessToken") ? "/form" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={
          <PrivateRoute>
            <MultiStepForm />
          </PrivateRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;

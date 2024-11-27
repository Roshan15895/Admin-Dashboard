import React, { useState } from 'react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 

  
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    setError(''); 

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setMessage(`Password reset link sent to ${email}. Please check your inbox.`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        
        {message ? (
          <p className="text-green-600 text-center">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Enter your email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@domain.com"
                required
              />
            </div>

           
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

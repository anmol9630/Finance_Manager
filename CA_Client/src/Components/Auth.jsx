import React, { useState } from "react";
import { useLoginMutation, useRegisterMutation } from "../../Store/API/Api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name , setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login , {isLoading}] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [error,setError] = useState('');

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isLogin) {
        const res = await login({email, password});
        console.log("Logging in with", { email, password });
        console.log(res)
    } else {
      //check confirm password === pas
      if(confirmPassword !== password){
        setError("Password doesn't match with Confirm Password")
        return;
      }else setError('');

      const res = await register({email,password, name })
      console.log(res);
    }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Please Login
        </h2>
        <div className="flex justify-around mb-6">
          <button
            className={`py-2 px-4 ${
              isLogin ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button
            className={`py-2 px-4 ${
              !isLogin ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700"> Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label className="text-gray-700">Show Password</label>
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button className="text-blue-500 hover:underline">
              Forgot password
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M21.35 11.1h-9.7v2.8h5.5c-.2 1.4-.9 2.6-2 3.4l2.6 2.1c2.1-2 3.3-4.9 3.3-8.3 0-.8-.1-1.5-.2-2.2z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.7 0 4.9-.9 6.6-2.4l-2.6-2.1c-.7.5-1.6.9-2.5 1-.7.1-1.4.2-2.1.2-4.1 0-7.5-2.8-8.7-6.6L2.1 14l-.1.3c1.6 4.1 5.5 7 9.9 7z"
                fill="#34A853"
              />
              <path
                d="M3.3 10.4C2.7 8.9 2.7 7.4 3.3 5.9L.6 3.8C-.7 6.2-.7 9.8.6 12.2l2.7-1.8z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.8c1.4 0 2.7.5 3.6 1.4l2.7-2.7C16.9 1.7 14.6.8 12 .8c-4.5 0-8.3 3-9.6 7.1l2.8 2C5.5 6.7 8.5 4.8 12 4.8z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;







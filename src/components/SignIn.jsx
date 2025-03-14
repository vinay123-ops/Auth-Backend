import { useState } from "react";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const BASE_URL = "http://localhost:5000/api";
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const onSubmit = async (data) => {
    const endpoint = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`;
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        reset();
      } else {
        setMessage(result.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? "Login" : "Register"}</h2>

        {message && <p className="text-red-500 text-center">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <input 
            type="email" 
            placeholder="Email" 
            {...register("email", { required: "Email is required" })} 
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password Input */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              {...register("password", { required: "Password is required", minLength: 6 })} 
              className="w-full p-2 border rounded pr-10"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Register/Login */}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <span 
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

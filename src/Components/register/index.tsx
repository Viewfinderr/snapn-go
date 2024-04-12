import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Quelque chose a mal tourné");
      }
      toast.success("Compte créé avec succès !", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col mt-7">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center justify-center">
          <Image
            src="/Icon.svg"
            width={58}
            height={58}
            alt="Icon site web"
            className="mb-4"
            loading="lazy"
          />
        </div>
        <ToastContainer />
        <h2 className="mt-20 mb-2 ml-6  text-3xl font-custom font-bold ">
          Register
        </h2>
        <p className="mx-6 text-gray-600 mb-6 font-custom font-regular">
          Welcome. Enter your credentials to access your account
        </p>

        <form className="px-6 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm mb-2 font-custom font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hello@example.com"
              className="font-custom font-regular border border-[1.5px] border-grayBorder rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm mb-2 font-custom font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="font-custom font-regular border border-[1.5px] border-grayBorder rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-6 flex">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 leading-tight"
            />
            <label
              htmlFor="remember"
              className="block text-sm font-custom font-regular"
            >
              Keep me signed in
            </label>
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="bg-greenButton text-white py-2 px-6 w-full rounded font-custom font-semibold"
            >
              Continue
            </button>
            <div className="flex justify-center items-center mt-4 font-custom font-regular">
              <p>Don’t have an Account? </p>
              <Link
                href="/login"
                className="inline-block align-baseline underline decoration-solid text-sm text-greenButton font-custom font-bold ml-1"
              >
                Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

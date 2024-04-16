import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Quelque chose a mal tourné");
      } else if (response.ok) {
        router.push("/");
      }
      setMessage("Connexion réussie!");
      toast.success("Connexion réussie!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err: any) {
      setMessage(err.toString());
    }
  };

  return (
    <div className="flex flex-col mt-7">
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
          Login
        </h2>
        <p className="mx-6 text-gray-600 mb-2 font-custom font-regular">
          Welcome back. Enter your credentials to access your account
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
              className="font-custom font-regular border-[1.5px] border-grayBorder rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm mb-2 font-custom font-semibold"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-greenButton font-custom font-bold"
              >
                Forgot Password
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="font-custom font-regular border-[1.5px] border-grayBorder rounded w-full py-2 px-3 text-gray-700"
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
                href="/signup"
                className="inline-block align-baseline underline decoration-solid text-sm text-greenButton font-custom font-bold ml-1"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

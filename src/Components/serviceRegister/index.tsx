import Image from "next/image";
import Link from "next/link";
import Navbar from "../navbar";

function ServiceRegister() {
  return (
    <div className=" flex flex-col mt-7 md:h-[75vh]">
      <div className="max-w-md w-full mx-auto ">
        <div className="flex items-center justify-center ">
          <Image
            src="/Icon.svg"
            width={58}
            height={58}
            alt="Icon site web"
            className="mb-4"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <h2 className="mt-20 mb-2 ml-6  text-3xl font-custom font-bold ">
            Register
          </h2>
          <p className="mx-6 text-gray-600 mb-2 font-custom font-regular">
            Welcome back. Enter your credentials to access your account
          </p>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center justify-center mx-10">
              <Link
                href="/signup"
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              >
                Your information
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center mx-10">
              <Link
                href="/signup"
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              >
                Google
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center mx-10">
              <Link
                href="/signup"
                className="border-[1px] border-solid rounded border-grayBorder w-full text-center"
              >
                Apple
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
}

export default ServiceRegister;

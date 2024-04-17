import Image from "next/image";
import Link from "next/link";

export default function choice() {
  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <Image
          src="/Icon.svg"
          width={58}
          height={58}
          alt="Icon site web"
          className="mb-4"
          loading="lazy"
        />
      </div>
      <div className="flex justify-center mt-5">
        <h1>What did you want to do </h1>
      </div>
      <div className="flex flex-col gap-10 mt-52">
        <div className="flex flex-col items-center justify-center mx-10 md:mx-36">
          <Link
            href="/signupservice"
            className="border-[1px] border-solid rounded border-grayBorder w-full text-center md:bg-greenButton md:text-white  md:w-[35vw] md:h-[2vw] flex justify-center items-center"
          >
            Register
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center mx-10 ">
          <Link
            href="/Login"
            className="border-[1px] border-solid rounded border-grayBorder w-full text-center md:bg-greenButton md:text-white md:w-[35vw] md:h-[2vw] flex justify-center items-center "
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

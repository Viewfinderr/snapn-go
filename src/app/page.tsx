'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Home() {


  return (
    <div>
       <Link href="/login">
            <p>Login</p>
          </Link>
       <Link href="/signup">
            <p>signup</p>
          </Link>
    </div>
  );
}

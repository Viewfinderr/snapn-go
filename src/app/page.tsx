'use client'

import Image from "next/image";
import Navbar from '@/Components/navbar';
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
          
          <Navbar></Navbar>
    </div>
  );
}

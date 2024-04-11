'use client'

import Navbar from '@/Components/navbar';
import Link from "next/link";

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

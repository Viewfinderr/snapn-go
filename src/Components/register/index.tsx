import Image from 'next/image';
import { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Quelque chose a mal tourné');
      }
      setMessage("Félicitations!");
    } catch (error) {
      setMessage(error.toString());
    }
  };

  return (
    <div className='min-h-screen flex flex-col mt-7'>
      <div className='max-w-md w-full mx-auto'>
        <div className='flex items-center justify-center'>
          <Image
            src="/Icon.svg"
            width={58}
            height={58}
            alt='Icon site web'
            className='mb-4'
          />
        </div>

        <h2 className='mt-32 mb-2 text-center text-3xl font-extrabold text-gray-900'>Register</h2>
        <p className='text-center text-gray-600 mb-6'>Welcome. Enter your credentials to access your account</p>

        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 text-sm font-bold mb-2'>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='hello@example.com'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor="password" className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Enter password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-6'>
            <input type="checkbox" id="remember" className='mr-2 leading-tight'/>
            <label htmlFor="remember" className='block text-gray-700 text-sm font-bold'>
              Keep me signed in
            </label>
          </div>
          <div className='flex items-center justify-between'>
            <button type="submit" className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Continue
            </button>
            <a href="#" className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'>
              Login here
            </a>
          </div>
        </form>
        {message && <p className='text-center text-red-500 text-xs'>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;

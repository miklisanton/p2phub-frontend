'use client'

import { useRouter } from 'next/navigation';
import { LoginRequest} from '@/types';
import { useAppSelector } from '@/lib/hooks';

export const Login = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  if (user) {
    router.push('/trackers');
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    LoginRequest({email, password}).then((response) => {
      if (response.success) {
        router.push('/trackers');
        console.log('Login successful');

        window.location.reload();
      } else {
        console.error('Login failed');
        response.error.displayErrors();
      }
    })
  }

  return (
      <form onSubmit={handleSubmit}
        className="self-center container grid justify-center grid bg-gray-300 mx-auto w-2/3 md:w-1/3 p-5 rounded-lg shadow-lg transition-all max-w-md">
        <label className="text-gray-700 font-bold mt-2" htmlFor="email">Email:</label>
        <input className="block w-full bg-gray-200 text-gray-700 px-4 py-1 mt-2 mb-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                placeholder="your@mail.com"
                autoComplete="email"
                required/>
        <label className="text-gray-700 font-bold" htmlFor="password">Password:</label>
        <input className="block w-full bg-gray-200 text-gray-700 px-4 py-1 mt-2  rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                type="password"
                id="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                required/>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            className="bg-orange-700 text-white font-bold py-2 px-8 rounded-lg shadow hover:bg-orange-800 transition duration-300">
            Login
          </button>
        </div>
    </form>
  );
}

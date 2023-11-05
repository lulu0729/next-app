'use client'

import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { FormDataSchema } from '@/lib/schema'
import axios from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = z.infer<typeof FormDataSchema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    reset()
    onLogin(data.username, data.password);
  }
  const onLogin = (username: string, password: string) => {
    axios.post('/api/login', {
      username,
      password
    }).then((res) => {
      if (res.data.success) {
        toast.success('Login successful!');
      } else {
        toast.error('Login failed!');
      }
    }).catch((error) => {
      toast.error('Login failed!');
    });
  }

  const inputClass = 'w-72 p-2 ml-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500';
  const formItemClass = 'mt-4';
  const inputWrapperClass = 'flex items-top w-96';
  const labelClass = 'leading-10'
  const errorMessageClass = 'text-sm text-red-400 ml-4 mt-2'
  return (
    <div className="flex flex-col items-center justify-center min-h-fit py-2">
      <h1 className="mt-20">Login Page</h1>
      <hr />
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 items-center flex-left"
      >
        <div className={formItemClass}>
          <div className={inputWrapperClass}>
            <label className={labelClass} htmlFor="username">username</label>
            <input
              placeholder="username"
              id="username"
              className={inputClass}
              {...register('username')}
            />
          </div>
            {errors.username?.message && (
                <p className={errorMessageClass}>{errors.username.message}</p>
                )}
        </div>
        <div className={formItemClass}>
          <div className={inputWrapperClass}>
          <label className={labelClass} htmlFor="password">password</label>
            <input
                placeholder="password"
                type="password"
                id="password"
                className={inputClass}
                {...register('password')}
            />
            </div>
            {errors.password?.message && (
                <p className={errorMessageClass}>{errors.password.message}</p>
            )}

        </div>

        <button
          type="submit"
          className="w-96 p-2 m-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
        >
          login
        </button>

      </form>
      <Toaster />
    </div>
  )
}

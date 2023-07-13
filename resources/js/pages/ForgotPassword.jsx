import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAxiosPromise } from "../hooks/axios";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useActionData, useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/routes";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from "@greatsumini/react-facebook-login";
import ModalLoading from "../components/loaders/ModalLoading";

export default function ForgotPassword() {

  const [isLoading, setIsLoading] = useState()

  // Handle submit action
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true)

    let data = {
      email: e.target.email.value,
    }

    useAxiosPromise('/forgot-password', 'POST', data).then(res => {
      console.log(res)
      if (res.status == 200) {
        toast.success(res.data.message)
      }

      setIsLoading(false)
    }).catch(err => {
      let errResponse = err.response
      toast.error(errResponse?.data.message || errResponse?.data.error || err)
      setIsLoading(false)
    })
  }

  return (
    <Layout>
      <ModalLoading open={isLoading} />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot your password?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Request reset link
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login instead
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import ModalLoading from "../components/loaders/ModalLoading";
import { useQuery } from "../hooks/routes";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import SocialLoginButtons from "../components/SocialLoginButtons";
import { useAxiosPromise } from "../hooks/axios";
import { toast } from "react-toastify";
import { isAValidationError } from "../utils/connection";
import ValidationError from "../components/ValidationError";

export default function Register() {

  const { user, setUser, isLoggedIn } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState()
  const [validationErrors, setValidationErrors] = useState()
  const query = useQuery()
  const navigate = useNavigate()

  // Navigate to previous page if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      return navigate(-1)
    }
  }, [user])

  const handleRegistrationResponse = (user) => {
    setUser(user)

    // if (query.get('redirect_to')) {
    //   return navigate(query.get('redirect_to'))
    // }

    // return navigate('/')
  }

  // Handle submit action
  const handleSubmit = (e) => {
    console.log('asd');
    e.preventDefault();

    setIsLoading(true)

    let form = e.target

    let data = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      contact_no: form.contact_no.value,
      email: form.email.value,
      password: form.password.value,
    }

    console.log(data);

    useAxiosPromise('/api/register', 'POST', data).then(res => {
      if (res.status === 200) {
        handleRegistrationResponse(res.data.data)
      }

      setIsLoading(false)
      throw new Error('Error authenticating user')
    }).catch(err => {
       // Validation errors
       if (isAValidationError(err.response)) {
        setValidationErrors(err.response.data.errors)
       }else{
        let errResponse = err.response
        toast.error(errResponse?.data.message || errResponse?.data.error || err)
       }
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
            Register with us
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first_name"
                      name="first_name"
                      type="first_name"
                      autoComplete="first_name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ValidationError errors={validationErrors?.first_name} />
                  </div>
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last_name"
                      name="last_name"
                      type="last_name"
                      autoComplete="last_name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ValidationError errors={validationErrors?.last_name} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="contact_no" className="block text-sm font-medium leading-6 text-gray-900">
                  Contact no
                </label>
                <div className="mt-2">
                  <input
                    id="contact_no"
                    name="contact_no"
                    type="contact_no"
                    autoComplete="contact_no"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ValidationError errors={validationErrors?.contact_no} />
                </div>
              </div>

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
                  <ValidationError errors={validationErrors?.email} />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ValidationError errors={validationErrors?.password} />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <SocialLoginButtons afterLogin={handleRegistrationResponse} />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

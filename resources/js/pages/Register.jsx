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
          <svg fill="#7800e8" version="1.1" id="Layer_1" viewBox="0 0 512 512" className="h-8 w-auto mx-auto" stroke="#7800e8"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M230.4,243.2c-21.171,0-38.4,17.229-38.4,38.4c0,21.171,17.229,38.4,38.4,38.4s38.4-17.229,38.4-38.4 C268.8,260.429,251.571,243.2,230.4,243.2z M230.4,294.4c-7.066,0-12.8-5.734-12.8-12.8c0-7.074,5.734-12.8,12.8-12.8 c7.066,0,12.8,5.726,12.8,12.8C243.2,288.666,237.466,294.4,230.4,294.4z"></path> </g> </g> <g> <g> <rect x="140.8" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="192" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <rect x="294.4" y="256" width="25.6" height="51.2"></rect> </g> </g> <g> <g> <rect x="204.8" y="345.6" width="51.2" height="25.6"></rect> </g> </g> <g> <g> <path d="M230.4,0c-8.422,0-17.161,0.435-26.726,1.34c-8.303,0.785-15.71,5.564-19.84,12.809 c-8.542,14.985-14.985,30.959-19.951,47.334C69.257,90.146,0,177.741,0,281.6C0,408.644,103.356,512,230.4,512 c103.868,0,191.505-69.257,220.143-163.891c16.367-4.975,32.324-11.409,47.3-19.942c7.245-4.13,12.023-11.529,12.809-19.84 c0.913-9.566,1.348-18.304,1.348-26.726C512,126.327,385.673,0,230.4,0z M230.4,486.4c-113.109,0-204.8-91.691-204.8-204.8 c0-87.236,54.622-161.553,131.473-191.053c-2.057,12.382-3.473,24.858-3.473,37.453c0,11.571,1.161,22.844,2.825,33.963 C116.369,186.786,89.6,231.014,89.6,281.6c0,77.764,63.036,140.8,140.8,140.8c50.637,0,94.899-26.82,119.706-66.935 C361.19,357.18,372.437,358.4,384,358.4c12.553,0,24.986-1.408,37.325-3.447C391.817,431.77,317.611,486.4,230.4,486.4z M230.4,166.4c63.522,0,115.2,51.678,115.2,115.2s-51.678,115.2-115.2,115.2s-115.2-51.678-115.2-115.2S166.878,166.4,230.4,166.4 z M485.171,305.92C455.305,322.944,420.83,332.8,384,332.8c-7.467,0-14.788-0.572-22.033-1.399 c5.871-15.497,9.233-32.239,9.233-49.8c0-77.764-63.036-140.8-140.8-140.8c-17.527,0-34.236,3.345-49.715,9.199 c-0.853-7.228-1.485-14.532-1.485-21.999c0-36.83,9.856-71.305,26.88-101.171c8.013-0.759,16.111-1.229,24.32-1.229 c141.38,0,256,114.611,256,256C486.4,289.809,485.931,297.907,485.171,305.92z"></path> </g> </g> <g> <g> <circle cx="74.615" cy="323.345" r="12.8"></circle> </g> </g> <g> <g> <circle cx="46.78" cy="297.668" r="12.8"></circle> </g> </g> <g> <g> <circle cx="63.351" cy="359.509" r="12.8"></circle> </g> </g> <g> <g> <circle cx="100.07" cy="411.904" r="12.8"></circle> </g> </g> <g> <g> <circle cx="152.499" cy="448.649" r="12.8"></circle> </g> </g> <g> <g> <circle cx="278.101" cy="459.639" r="12.8"></circle> </g> </g> <g> <g> <circle cx="336.128" cy="432.589" r="12.8"></circle> </g> </g> <g> <g> <circle cx="124.681" cy="130.611" r="12.8"></circle> </g> </g> <g> <g> <circle cx="381.389" cy="387.328" r="12.8"></circle> </g> </g> <g> <g> <circle cx="79.411" cy="175.881" r="12.8"></circle> </g> </g> <g> <g> <circle cx="52.361" cy="233.89" r="12.8"></circle> </g> </g> <g> <g> <circle cx="214.357" cy="465.237" r="12.8"></circle> </g> </g> <g> <g> <circle cx="98.287" cy="374.101" r="12.8"></circle> </g> </g> <g> <g> <circle cx="137.899" cy="413.696" r="12.8"></circle> </g> </g> <g> <g> <circle cx="188.672" cy="437.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="244.454" cy="442.266" r="12.8"></circle> </g> </g> <g> <g> <circle cx="298.564" cy="427.776" r="12.8"></circle> </g> </g> <g> <g> <circle cx="344.405" cy="395.605" r="12.8"></circle> </g> </g> <g> <g> <circle cx="116.361" cy="167.561" r="12.8"></circle> </g> </g> <g> <g> <circle cx="84.233" cy="213.419" r="12.8"></circle> </g> </g> <g> <g> <circle cx="69.734" cy="267.546" r="12.8"></circle> </g> </g> </g></svg>
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
                  Register
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
              Login
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

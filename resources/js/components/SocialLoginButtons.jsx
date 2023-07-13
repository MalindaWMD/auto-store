import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAxiosPromise } from "../hooks/axios";

export default function SocialLoginButtons({afterLogin}) {

  const onGoogleSuccess = response => {
    useAxiosPromise('/api/login/google', 'POST', { creds: response.credential }).then(res => {
      if(afterLogin){
        afterLogin(res.data.data)
      }
    })
  }

  const onFacebookSuccess = response => {
    useAxiosPromise('/api/login/google', 'POST', { creds: response.credential }).then(res => {
      if(afterLogin){
        afterLogin(res.data.data)
      }
    })
  }

  return (
    <GoogleOAuthProvider clientId={process.env.MIX_GOOGLE_CLIENT_ID}>
      <div className="mt-6 col-span-2 flex justify-center items-center flex-col">
        <GoogleLogin
          onSuccess={onGoogleSuccess}
          onError={err => console.log(err)}
        />

        <FacebookLogin
          appId={process.env.MIX_FACEBOOK_APP_ID}
          onSuccess={onFacebookSuccess}
          onFail={err => console.log(err)}
          onProfileSuccess={res => console.log(res)}
          style={{
            backgroundColor: '#4267b2',
            color: '#fff',
            fontSize: '12px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            marginTop: '5px'
          }}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
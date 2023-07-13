<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController as LunarPasswordResetLinkController;
use Illuminate\Contracts\Support\Responsable;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Illuminate\Support\Facades\Password;
use Laravel\Fortify\Contracts\SuccessfulPasswordResetLinkRequestResponse;
use Laravel\Fortify\Fortify;

class PasswordResetLinkController extends LunarPasswordResetLinkController
{
    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public function store(Request $request): Responsable
    {
        $request->validate([Fortify::email() => 'required|email']);

        $email = $request->only(Fortify::email());

        if( ! $this->validateUser($email)){
            return app(FailedPasswordResetLinkRequestResponse::class, ['status' => __('passwords.user')]);
        }

        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = $this->broker()->sendResetLink($email);

        return $status == Password::RESET_LINK_SENT
                    ? app(SuccessfulPasswordResetLinkRequestResponse::class, ['status' => $status])
                    : app(FailedPasswordResetLinkRequestResponse::class, ['status' => $status]);
    }

    protected function validateUser($email)
    {
        return User::where('email', $email)->where('auth_type', User::AUTH_TYPE_DEFAULT)->first();
    }
}

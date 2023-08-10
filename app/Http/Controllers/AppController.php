<?php

namespace App\Http\Controllers;

use App\Models\Language;

class AppController extends Controller
{
    public function getLang()
    {
        $lang = Language::default()->first();
        return $this->success($lang);
    }
}

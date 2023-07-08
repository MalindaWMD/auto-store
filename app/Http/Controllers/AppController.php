<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class AppController extends Controller
{
    public function getLang()
    {
        $lang = Language::default()->first();
        return $this->success($lang);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;

class Language extends \Lunar\Models\Language
{
    public function scopeDefault($query, $default=true)
    {
        $query->where('default', true);
    }
}

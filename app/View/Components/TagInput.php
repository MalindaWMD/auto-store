<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class TagInput extends Component
{
    /**
     * Whether or not the input has an error to show.
     */
    public bool $error = false;

    public array $tags = [];

    /**
     * Initialise the component.
     *
     * @param  bool  $error
     */
    public function __construct($error = false, $tags = [])
    {
        $this->error = $error;
        $this->tags = $tags;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tag-input');
    }
}

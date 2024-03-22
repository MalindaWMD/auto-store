const mix = require('laravel-mix');

require('laravel-mix-eslint');

mix.js('resources/js/app.js', 'public/js')
    .eslint({
      fix: true,
      extensions: ['js'],
      exclude: ['./node_modules', './resources/js/bootstrap.js'],
    })
    .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')])
    .react();

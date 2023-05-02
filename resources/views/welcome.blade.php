<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- font awsome link --}}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <link rel="icon" type="image/x-icon" href="{{asset('icons/download.png')}}" width="20px" height="auto" class="rounded">
        <title>Zeng Shoping</title>
    </head>
    <body class="antialiased">
       <div id="app"></div>
       @vite('resources/js/app.js')
    </body>
</html>




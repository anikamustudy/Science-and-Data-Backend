<!doctype html>
<html lang="en">

@include('layouts.includes.header')

<body>
    <div class="row justify-content-center mt-5">
        @yield('content')
    </div>
    @include('layouts.includes.footer')
</body>

</html>

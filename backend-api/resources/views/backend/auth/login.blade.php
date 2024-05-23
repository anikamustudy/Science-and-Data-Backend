@extends('layouts.master')
@section('page_title', 'Admin Login')

@section('content')

    <div class="col-lg-4">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Login</h3>
            </div>
            <div class="card-body">
                @if (Session::has('error'))
                    <div class="alert alert-danger" role="alert">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <form action="{{ route('auth.handle.login') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" name="email" class="form-control" placeholder="name@example.com" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <div class="d-grid">
                            <button class="btn btn-primary">Access Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection

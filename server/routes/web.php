<?php

use App\Http\Controllers\TaskController;
use App\Models\Customer;
use App\Models\Task;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    $user = Customer::all();
    return response()->json(
        $user
    );
});

Route::resource('tasks', TaskController::class)->only(['index', 'store','show', 'update', 'destroy']);
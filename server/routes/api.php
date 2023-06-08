<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('alltasks', [TaskController::class, 'getTasksById']);
    Route::get('todaytasks', [TaskController::class, 'getTasksByCurDate']);
    Route::get('important', [TaskController::class, 'getTasksImportant']);
    Route::get('completed', [TaskController::class, 'getTasksCompleted']);
    Route::get('uncompleted', [TaskController::class, 'getTasksUnCompleted']);
    Route::get('taskbydir/{name}', [TaskController::class, 'getTasksByDir']);
    Route::post('addtask', [TaskController::class, 'store']);
    Route::delete('delete-taskbyid', [TaskController::class, 'deleteTaskById']);

    Route::post('adddir', [DirectoryController::class, 'store']);
    Route::get('getdir', [DirectoryController::class, 'getUserDirs']);

    Route::put('changeurl', [UserController::class, 'changeImage']);

    Route::delete('delete-all', [UserController::class, 'deleteAllDirAndTask']);
});
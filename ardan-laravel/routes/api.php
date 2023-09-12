<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\PenyiarController;
use App\Http\Controllers\FeedsController;
use App\Http\Controllers\LiveStreamingsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'banner'
], function ($router) {
    Route::post('/read', [BannerController::class, 'read']); 
    Route::post('/get', [BannerController::class, 'get']); 
    Route::post('/create', [BannerController::class, 'create']); 
    Route::post('/update', [BannerController::class, 'update']); 
    Route::post('/delete', [BannerController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'category'
], function ($router) {
    Route::post('/read', [CategoryController::class, 'read']); 
    Route::post('/get', [CategoryController::class, 'get']); 
    Route::post('/create', [CategoryController::class, 'create']); 
    Route::post('/update', [CategoryController::class, 'update']); 
    Route::post('/delete', [CategoryController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'news'
], function ($router) {
    Route::post('/read', [NewsController::class, 'read']); 
    Route::post('/get', [NewsController::class, 'get']); 
    Route::post('/create', [NewsController::class, 'create']); 
    Route::post('/update', [NewsController::class, 'update']); 
    Route::post('/delete', [NewsController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'events'
], function ($router) {
    Route::post('/read', [EventsController::class, 'read']); 
    Route::post('/get', [EventsController::class, 'get']); 
    Route::post('/create', [EventsController::class, 'create']); 
    Route::post('/update', [EventsController::class, 'update']); 
    Route::post('/delete', [EventsController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'programs'
], function ($router) {
    Route::post('/read', [ProgramsController::class, 'read']); 
    Route::post('/get', [ProgramsController::class, 'get']); 
    Route::post('/create', [ProgramsController::class, 'create']); 
    Route::post('/update', [ProgramsController::class, 'update']); 
    Route::post('/delete', [ProgramsController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'penyiar'
], function ($router) {
    Route::post('/read', [PenyiarController::class, 'read']); 
    Route::post('/get', [PenyiarController::class, 'get']); 
    Route::post('/create', [PenyiarController::class, 'create']); 
    Route::post('/update', [PenyiarController::class, 'update']); 
    Route::post('/delete', [PenyiarController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'feeds'
], function ($router) {
    Route::post('/read', [FeedsController::class, 'read']); 
    Route::post('/get', [FeedsController::class, 'get']); 
    Route::post('/create', [FeedsController::class, 'create']); 
    Route::post('/update', [FeedsController::class, 'update']); 
    Route::post('/delete', [FeedsController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'livestreamings'
], function ($router) {
    Route::post('/read', [LiveStreamingsController::class, 'read']); 
    Route::post('/get', [LiveStreamingsController::class, 'get']); 
    Route::post('/create', [LiveStreamingsController::class, 'create']); 
    Route::post('/update', [LiveStreamingsController::class, 'update']); 
    Route::post('/delete', [LiveStreamingsController::class, 'delete']); 
});

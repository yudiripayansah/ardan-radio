<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/dashboard');
});
Route::get('/dashboard', [MainController::class, 'index']);
Route::get('/member', [MainController::class, 'member']);
Route::get('/radio', [MainController::class, 'radio']);
Route::get('/feed', [MainController::class, 'feed']);
Route::get('/music', [MainController::class, 'music']);
Route::get('/live-streaming', [MainController::class, 'liveStreaming']);
Route::get('/notification', [MainController::class, 'notification']);
Route::get('/banner', [MainController::class, 'banner']);
Route::get('/news', [MainController::class, 'news']);
Route::get('/event', [MainController::class, 'event']);
Route::get('/user', [MainController::class, 'user']);

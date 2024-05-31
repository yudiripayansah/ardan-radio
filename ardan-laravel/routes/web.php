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
Route::get('/program', [MainController::class, 'program']);
Route::get('/penyiar', [MainController::class, 'penyiar']);
Route::get('/feed', [MainController::class, 'feed']);
Route::get('/content', [MainController::class, 'content']);
Route::get('/music', [MainController::class, 'music']);
Route::get('/live-streaming', [MainController::class, 'liveStreaming']);
Route::get('/live-chat', [MainController::class, 'liveChat']);
Route::get('/notification', [MainController::class, 'notification']);
Route::get('/banner', [MainController::class, 'banner']);
Route::get('/category', [MainController::class, 'category']);
Route::get('/news', [MainController::class, 'news']);
Route::get('/event', [MainController::class, 'event']);
Route::get('/user', [MainController::class, 'user']);
Route::get('/sharing/{id}', [MainController::class, 'msharing']);
Route::get('/post/{id}', [MainController::class, 'mpost']);
Route::get('/events/{id}', [MainController::class, 'mevents']);
Route::get('/news/{id}', [MainController::class, 'mnews']);
Route::get('/program/{id}', [MainController::class, 'mprogram']);
Route::get('/notif/{id}', [MainController::class, 'mnotif']);
Route::get('/login', [MainController::class, 'login'])->name('login');

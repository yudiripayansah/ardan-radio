<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\ProgramsController;
use App\Http\Controllers\PenyiarController;
use App\Http\Controllers\FeedsController;
use App\Http\Controllers\LiveStreamingsController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicChatControllers;
use App\Http\Controllers\PrivateChatController;
use App\Http\Controllers\ReportController;

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
    Route::post('/loginOrRegister', [AuthController::class, 'loginOrRegister']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
    Route::post('/sendotp', [AuthController::class, 'sendotp']);
    Route::post('/checkotp', [AuthController::class, 'checkotp']);
    Route::post('/updatePassword', [AuthController::class, 'updatePassword']);
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
    'prefix' => 'report'
], function ($router) {
    Route::post('/read', [ReportController::class, 'read']); 
    Route::post('/get', [ReportController::class, 'get']); 
    Route::post('/create', [ReportController::class, 'create']); 
    Route::post('/update', [ReportController::class, 'update']); 
    Route::post('/delete', [ReportController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'content'
], function ($router) {
    Route::post('/read', [ContentController::class, 'read']); 
    Route::post('/get', [ContentController::class, 'get']); 
    Route::post('/create', [ContentController::class, 'create']); 
    Route::post('/update', [ContentController::class, 'update']); 
    Route::post('/delete', [ContentController::class, 'delete']); 
    Route::post('/pin', [ContentController::class, 'pin']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'notifications'
], function ($router) {
    Route::post('/read', [NotificationsController::class, 'read']); 
    Route::post('/get', [NotificationsController::class, 'get']); 
    Route::post('/create', [NotificationsController::class, 'create']); 
    Route::post('/update', [NotificationsController::class, 'update']); 
    Route::post('/delete', [NotificationsController::class, 'delete']); 
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
    Route::post('/checkNextProgram', [ProgramsController::class, 'checkNextProgram']); 
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
    Route::post('/report', [FeedsController::class, 'report']); 
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
Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($router) {
    Route::post('/read', [UserController::class, 'read']); 
    Route::post('/get', [UserController::class, 'get']); 
    Route::post('/create', [UserController::class, 'create']); 
    Route::post('/update', [UserController::class, 'update']); 
    Route::post('/delete', [UserController::class, 'delete']); 
    Route::post('/registerToken', [UserController::class, 'createToken']);
    Route::post('/readToken', [UserController::class, 'readToken']);
    Route::post('/userFollow', [UserController::class, 'userFollow']);
    Route::post('/dashboard', [UserController::class, 'dashboard']);
    Route::post('/saveStats', [UserController::class, 'saveStats']);
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'comment'
], function ($router) {
    Route::post('/read', [CommentController::class, 'read']); 
    Route::post('/get', [CommentController::class, 'get']); 
    Route::post('/create', [CommentController::class, 'create']); 
    Route::post('/update', [CommentController::class, 'update']); 
    Route::post('/delete', [CommentController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'like'
], function ($router) {
    Route::post('/read', [LikeController::class, 'read']); 
    Route::post('/get', [LikeController::class, 'get']); 
    Route::post('/create', [LikeController::class, 'create']); 
    Route::post('/update', [LikeController::class, 'update']); 
    Route::post('/delete', [LikeController::class, 'delete']); 
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'chat'
], function ($router) {
    Route::post('/read', [PublicChatControllers::class, 'read']); 
    Route::post('/send', [PublicChatControllers::class, 'send']);
    Route::post('/delete', [PublicChatControllers::class, 'delete']);
});
Route::group([
    'prefix' => 'privatechat'
], function ($router) {
    Route::post('/', [PrivateChatController::class, 'index']); 
    Route::post('/send', [PrivateChatController::class, 'send']);
    Route::post('/get', [PrivateChatController::class, 'get']);
    Route::post('/messageList', [PrivateChatController::class, 'messageList']);
});

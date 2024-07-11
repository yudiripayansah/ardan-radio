<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Mail\ForgotMail;
use Illuminate\Support\Facades\Mail;
use Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['login', 'register', 'sendotp', 'checkotp', 'updatePassword','loginOrRegister']]);
  }
  /**
   * Get a JWT via given credentials.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function login(Request $request)
  {
    $credentials = $request->only('email', 'password');
    if (!$token = auth()->attempt($credentials)) {
      $res = array(
        'status' => false,
        'msg' => 'Email dan Password tidak valid'
      );
    } else {
      $aUser = auth()->user();
      $getData = User::find($aUser->id);
      $getData->image_url = ($getData->image) ? Storage::disk('public')->url('user/' . $getData->image) : null;
      $data = $getData;
      $data['access_token'] = $token;
      $data['token_type'] = 'bearer';
      $data['expires_in'] = auth()->factory()->getTTL() * 60;
      $res = array(
        'status' => true,
        'msg' => 'Login successful',
        'data' => $data,
      );
    }
    return response()->json($res, 200);
  }
  /**
   * Register a User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|between:2,100',
      'email' => 'required|string|email|max:100|unique:users',
      'password' => 'required|string|confirmed|min:6',
    ]);
    if ($validator->fails()) {
      return response()->json($validator->errors()->toJson(), 400);
    }
    $user = User::create(
      array_merge(
        $validator->validated(),
        ['password' => bcrypt($request->password)]
      )
    );
    return response()->json([
      'message' => 'User successfully registered',
      'user' => $user
    ], 201);
  }

  /**
   * Log the user out (Invalidate the token).
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function logout()
  {
    auth()->logout();
    $res = array(
      'status' => true,
      'msg' => 'Logout successful',
    );
    return response()->json($res);
  }
  /**
   * Refresh a token.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function refresh()
  {
    return $this->createNewToken(auth()->refresh());
  }
  /**
   * Get the authenticated User.
   *
   * @return \Illuminate\Http\JsonResponse
   */
  public function userProfile()
  {
    return response()->json(auth()->user());
  }
  /**
   * Get the token array structure.
   *
   * @param  string $token
   *
   * @return \Illuminate\Http\JsonResponse
   */
  protected function createNewToken($token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'user' => auth()->user()
    ]);
  }
  function generateOTP($length = 6)
  {
    // Generate a random sequence of numbers
    $otp = '';
    for ($i = 0; $i < $length; $i++) {
      $otp .= rand(0, 9);
    }
    return $otp;
  }

  public function sendotp(Request $request)
  {
    if ($request->email) {
      $user = User::where('email', $request->email);
      if (count($user->get()) > 0) {
        $user = $user->first();
        $name = $user->name;
        $email = $user->email;
        $otp = $this->generateOTP(6);
        $user->otp = $otp;
        $user->save();
        $this->sendEmail($name, $email, $otp);
        $res = [
          'status' => true,
          'msg' => 'OTP code successfully sent to email ' . $request->email
        ];
      } else {
        $res = [
          'status' => false,
          'msg' => 'Account not found',
          'data' => null
        ];
      }
    } else {
      $res = [
        'status' => false,
        'msg' => 'Please enter email'
      ];
    }
    return response()->json($res);
  }
  public function checkotp(Request $request)
  {
    $email = $request->email;
    $otp = $request->otp;
    $user = User::where('email', $email)->where('otp', $otp);
    if (count($user->get()) > 0) {
      $res = [
        'status' => true,
        'msg' => 'Account found. Please enter new password'
      ];
    } else {
      $res = [
        'status' => false,
        'msg' => 'OTP doesnt match'
      ];
    }
    return response()->json($res);
  }
  public function updatePassword(Request $request)
  {
    $email = $request->email;
    $password = Hash::make($request->password);
    $user = User::where('email', $email)->first();
    $user->password = $password;
    if ($user->save()) {
      $res = [
        'status' => true,
        'msg' => 'Password successfully updated.'
      ];
    } else {
      $res = [
        'status' => false,
        'msg' => 'Failed update password, please try again.'
      ];
    }
    return response()->json($res);
  }
  function sendEmail($name, $email, $otp)
  {
    $mailInfo = new \stdClass();
    $mailInfo->recieverName = $name;
    $mailInfo->sender = "Ardan Radio";
    $mailInfo->senderCompany = "ardanradio.com";
    $mailInfo->to = $email;
    $mailInfo->subject = "Forgot Password";
    $mailInfo->name = "Ardan Radio";
    $mailInfo->cc = "ripayansahyudi@gmail.com";
    $mailInfo->bcc = "yudiripayansah@gmail.com";
    $mailInfo->from = "forgot@ardanradio.com";
    $mailInfo->title = 'Forgot Password';
    $mailInfo->name = $name;
    $mailInfo->email = $email;
    $mailInfo->otp = $otp;
    Mail::to($email)->send(new ForgotMail($mailInfo));
  }
  public function loginOrRegister(Request $request)
  {
    if($request->email){
      $user = User::where('email', $request->email)->first();
    }
    if($request->fbid){
      $user = User::where('fbid', $request->fbid)->first();
    }
    if($request->gid){
      $user = User::where('gid', $request->gid)->first();
    }
    if(!$user) {
      $dataCreate = $request->all();
      if($request->image){
        $filename = uniqid().time().'-'. '-users.png';
        $filePath = 'user/' .$filename;
        $dataCreate['image'] = $filename;
        Storage::disk('public')->put($filePath, file_get_contents($request->image));
      } else { 
        unset($dataCreate['image']);
      }
      $dataCreate['password'] = Hash::make(uniqid());
      $dc = User::create($dataCreate);
      $user = User::find($dc->id);
    } 
    $token = auth()->login($user);
    if ($token) {
      $aUser = auth()->user();
      $getData = User::find($aUser->id);
      $getData->image_url = ($getData->image) ? Storage::disk('public')->url('user/' . $getData->image) : null;
      $data = $getData;
      $data['access_token'] = $token;
      $data['token_type'] = 'bearer';
      $data['expires_in'] = auth()->factory()->getTTL() * 60;
      $res = array(
        'status' => true,
        'msg' => 'Login successful',
        'data' => $data,
      );
    } else {
      $res = $token;
    }
    return response()->json($res, 200);
  }
}
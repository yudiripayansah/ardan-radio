<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    use SoftDeletes;
    protected $table = 'users';
    protected $fillable = [
      'username','email','name','password','phone','image','address','gender','dob','role','penyiar','verified','status','token','otp','fbid','gid'
    ];
    protected $hidden = [
      'password',
    ];
    public static function validate($validate)
    {
      if($validate['id']) {
        $rule = [
          'email' => 'unique:App\Models\User,email,'.$validate['id'],
          'name' => 'required',
          'role' => 'required',
        ];
      } else {
        $rule = [
          'email' => 'unique:App\Models\User,email',
          'name' => 'required',
          'password' => 'required',
          'role' => 'required',
        ];
      }
        $validator = Validator::make($validate, $rule);
        if ($validator->fails()) {
            $errors =  $validator->errors()->all();
            $res = array(
                    'status' => false,
                    'error' => $errors,
                    'msg' => 'Error on Validation'
                  );
        } else {
            $res = array(
                    'status' => true,
                    'msg' => 'Validation Ok'
                  );
        }
        return $res;
    }
    public function getJWTIdentifier() {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }    
}
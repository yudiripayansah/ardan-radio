<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Likes extends Model
{
    use SoftDeletes;
    protected $table = 'likes';
    protected $fillable = [
      'id_user','id_target','type'
    ];
    public static function validate($validate)
    {
        $rule = [
          'id_user' => 'required',
          'id_target' => 'required',
          'type' => 'required',
        ];
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
    public function user()
    {
      return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function user_target()
    {
      return $this->belongsTo(User::class, 'id_target', 'id');
    }
    public function tokens()
    {
      return $this->hasMany(UserToken::class, 'id_user', 'id_user');
    }
}

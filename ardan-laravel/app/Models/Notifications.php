<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Notifications extends Model
{
    use SoftDeletes;
    protected $table = 'notifications';
    protected $fillable = [
      'image','title','text','id_target','id_user_target','id_user_sender','read_by','type'
    ];
    public static function validate($validate)
    {
        $rule = [
          'title' => 'required',
          'text' => 'required',
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
    public function user_target()
    {
      return $this->belongsTo(User::class, 'id_user_target', 'id');
    }
    public function user_sender()
    {
      return $this->belongsTo(User::class, 'id_user_sender', 'id');
    }
    public function tokens()
    {
        return $this->hasManyThrough(
            UserToken::class, User::class,
            'id', 'id_user', 'id_user_target'
        );
    }
}

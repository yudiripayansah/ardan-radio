<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class LiveChat extends Model
{
    use SoftDeletes;
    protected $table = 'livechat';
    protected $fillable = [
      'id_user','id_target','target_type','title','chat'
    ];
    public static function validate($validate)
    {
        $rule = [
          'id_user' => 'required',
          'id_target' => 'required',
          'target_type' => 'required',
          'chat' => 'required',
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
    public function reciever()
    {
      return $this->belongsTo(User::class, 'id_target', 'id');
    }
}

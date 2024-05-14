<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Report extends Model
{
    use SoftDeletes;
    protected $table = 'report';
    protected $fillable = [
      'id_user','id_feed','text'
    ];
    public static function validate($validate)
    {
        $rule = [
          'id_user' => 'required',
          'id_feed' => 'required'
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
}

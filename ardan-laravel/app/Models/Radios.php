<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Radios extends Model
{
    use SoftDeletes;
    protected $table = 'radios';
    protected $fillable = [
      'id_user','image','title','text','url','status'
    ];
    public static function validate($validate)
    {
        $rule = [
          'title' => 'required',
          'text' => 'required',
          'url' => 'required',
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
}

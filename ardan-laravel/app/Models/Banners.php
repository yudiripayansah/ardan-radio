<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Banners extends Model
{
    use SoftDeletes;
    protected $table = 'banners';
    protected $fillable = [
      'image','title','text','cta'
    ];
    public static function validate($validate)
    {
        $rule = [
          'image' => 'required'
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

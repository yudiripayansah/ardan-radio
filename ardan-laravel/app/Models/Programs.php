<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Programs extends Model
{
    use SoftDeletes;
    protected $table = 'programs';
    protected $fillable = [
      'image_square','image','title','text','days','time','penyiar'
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
}

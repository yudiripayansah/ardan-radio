<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class RadioSchedules extends Model
{
    use SoftDeletes;
    protected $table = 'radioschedules';
    protected $fillable = [
      'id_radio','image','title','text','date_start','date_end','time_start','time_end','status'
    ];
    public static function validate($validate)
    {
        $rule = [
          'id_radio' => 'required',
          'title' => 'required',
          'text' => 'required',
          'date_start' => 'required',
          'date_end' => 'required',
          'time_start' => 'required',
          'time_end' => 'required',
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

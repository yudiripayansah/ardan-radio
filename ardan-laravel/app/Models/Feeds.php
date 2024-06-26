<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Validator;

class Feeds extends Model
{
    use SoftDeletes;
    protected $table = 'feeds';
    protected $fillable = [
      'id_user','image','title','text','category','type','status',
    ];
    public static function validate($validate)
    {
        $rule = [
          'id_user' => 'required',
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
    public function user()
    {
      return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function reports()
    {
      return $this->hasMany(Report::class, 'id_feed', 'id');
    }
}

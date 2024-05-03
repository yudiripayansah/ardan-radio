<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\Storage;
use Kutia\Larafirebase\Messages\FirebaseMessage;
use App\Models\Programs;
use App\Models\Likes;
use Illuminate\Console\Command;

class ProgramsReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'programs:reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send programs reminder when the program will start';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $currentTimestamp = time();
        $newTimestamp = $currentTimestamp + 600;
        $time_now = date('H:i',$newTimestamp);
        $day_now = date('N');
        $time = "TIME(SUBSTRING_INDEX(time,'-',1)) = TIME('".$time_now."')";
        $program = Programs::
                  selectRaw("
                    *,
                    SUBSTRING_INDEX(time,'-',1) AS startTime,
                    SUBSTRING_INDEX(time,'-',-1) AS endTime
                  ")
                  ->whereRaw("
                    (
                      ".$time."
                    )
                    AND days LIKE '%".$day_now."%'
                  ")->orderBy('time', 'ASC')->first();
        $program->image = Storage::disk('public')->url('programs/' . $program->image);
        $program->message = 'Hallo sebentar lagi '.$program->title.' mau mulai nih, stay tune ya di Ardan Radio';
        $users = Likes::where('id_target', $program->id)->where('type','Program')->with('tokens')->get();
        foreach($users as $u) {
            $program->tokens = $u->tokens;
            $this->notif($program);
        }
    }
    function notif($data){
        $tokens = [];
        foreach($data->tokens as $t){
          array_push($tokens, $t->token);
        }
        if(count($tokens) > 0){
          $fcm = (new FirebaseMessage);
          $fcm = $fcm->withTitle($data->title);
          $fcm = $fcm->withBody($data->message);
          if($data->image){
            $fcm = $fcm->withImage($data->image);
          }
          if($data->icon){
            $fcm = $fcm->withIcon($data->icon);
          }
          $fcm = $fcm->withSound('default');
          $fcm = $fcm->withPriority('high');
          $fcm = $fcm->withAdditionalData($data);
          $fcm = $fcm->asNotification($tokens);
        } else {
          $fcm = 'No token to send';
        }
        return $fcm;
      }
}

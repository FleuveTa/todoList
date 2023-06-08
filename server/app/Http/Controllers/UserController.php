<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Directory;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function deleteAllDirAndTask () {
        $userId = auth()->id();

        Task::where('user_id', $userId)->delete();

        Directory::where('user_id', $userId)->delete();

        response()->json(['messsage' => 'Delete all dirs and tasks successfully']);
    }

    public function changeImage (Request $request) {
        $url = $request->img_url;

        $userId = auth()->id();

        User::where('id', $userId)->update(array('img_url' => "$url"));

        response()->json([
            'message' => "Change avatar successfully"
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Directory;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() 
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }
    /**
     * Get all tasks of current user
     * @OA\Get (
     *     path="/api/alltasks",
     *     tags={"Tasks"},
     *     @OA\Response(
     *         response=200,
     *         description="success",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="number",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="user_id",
     *                         type="number",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="directory_id",
     *                         type="number",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="important",
     *                         type="number",
     *                         example="1"
     *                     ),
     *                     @OA\Property(
     *                         property="completed",
     *                         type="number",
     *                         example="0"
     *                     ),
     *                     @OA\Property(
     *                         property="title",
     *                         type="string",
     *                         example="example title"
     *                     ),
     *                     @OA\Property(
     *                         property="description",
     *                         type="string",
     *                         example="example content"
     *                     ),
     *                     @OA\Property(
     *                         property="updated_at",
     *                         type="string",
     *                         example="2021-12-11T09:25:53.000000Z"
     *                     ),
     *                     @OA\Property(
     *                         property="created_at",
     *                         type="string",
     *                         example="2021-12-11T09:25:53.000000Z"
     *                     )
     *                 )
     *             )
     *         )
     *     )
     * )
     */
 
    public function getTasksById () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)->get();

        return response()->json($tasks);
    }

    public function getTasksByDir ($name) {
   
        $userId = auth()->id();

        $directory = Directory::where('user_id', $userId)
                           ->where('name', $name)
                           ->first();

        $tasks = Task::where('user_id', $userId)->where('directory_id', $directory->id)->get();

        return response()->json($tasks);
    }

    public function getTasksByCurDate () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->whereDate('created_date', Carbon::today())->get();
                    
        return response()->json($tasks);
    }

    public function getTasksImportant () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('important', 1)->get();
                    
        return response()->json($tasks);
    }

    public function getTasksCompleted () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('completed', 1)->get();
                    
        return response()->json($tasks);
    }

    public function getTasksUnCompleted () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('completed', 0)->get();
                    
        return response()->json($tasks);
    }

    public function deleteTaskById (Request $request) {

        $taskId = $request->id;
        
        Task::where('id', $taskId)->delete();
                    
        return response()->json([
            'messsage' => 'Delete successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'completed' => 'required|boolean',
            'important' => 'required|boolean',
            'date' => 'required|date',
            'description' => 'required|string',
            'directory' => 'required|string',
            'title' => 'required|string',
        ]);

        $userId = auth()->id();

        $directory = Directory::where('user_id', $userId)
                           ->where('name', $validatedData['directory'])
                           ->first();

        $model = new Task();

        $model->completed = $validatedData['completed'];
        $model->important = $validatedData['important'];
        $model->create_date = $validatedData['date'];
        $model->description = $validatedData['description'];
        $model->directory_id = $directory->id;
        $model->user_id = $userId;
        $model->title = $validatedData['title'];

        $model->save();

        return response()->json(['message' => 'Model created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}

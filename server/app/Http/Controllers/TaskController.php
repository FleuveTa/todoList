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

    /**
     * Get all tasks in request directory 
     * @OA\Get (
     *     path="/api/taskbydir/{name}",
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

    public function getTasksByDir ($name) {
   
        $userId = auth()->id();

        $directory = Directory::where('user_id', $userId)
                           ->where('name', $name)
                           ->first();

        $tasks = Task::where('user_id', $userId)->where('directory_id', $directory->id)->get();

        return response()->json($tasks);
    }

    /**
     * Get all tasks in request date 
     * @OA\Get (
     *     path="/api/todaytasks",
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

    public function getTasksByCurDate () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->whereDate('created_at', Carbon::today())->get();
                    
        return response()->json($tasks);
    }

    /**
     * Get important tasks  
     * @OA\Get (
     *     path="/api/important",
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

    public function getTasksImportant () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('important', 1)->get();
                    
        return response()->json($tasks);
    }

    /**
     * Get completed tasks 
     * @OA\Get (
     *     path="/api/completed",
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

    public function getTasksCompleted () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('completed', 1)->get();
                    
        return response()->json($tasks);
    }

    /**
     * Get uncompleted tasks  
     * @OA\Get (
     *     path="/api/uncompleted",
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

    public function getTasksUnCompleted () {
        $userId = auth()->id();
        $tasks = Task::where('user_id', $userId)
                    ->where('completed', 0)->get();
                    
        return response()->json($tasks);
    }

    /**
     * Delete task by id
     * @OA\Delete (
     *     path="/api/delete-taskbyid",
     *     tags={"Tasks"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                      type="number",
     *                      property="id",
     *                      example="1"
     *             )
     *         )
     *      )
     * ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  type="string",
     *                  property="message",
     *                  example="delete successfully"
     *               ),                  
     *          )
     *      )
     * )
     */

    public function deleteTaskById (Request $request) {

        $taskId = $request->id;
        
        Task::where('id', $taskId)->delete();
                    
        return response()->json([
            'messsage' => 'Delete successfully'
        ]);
    }

    /**
     * Add task
     * @OA\Post (
     *     path="/api/addtask",
     *     tags={"Tasks"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                      type="number",
     *                      property="completed",
     *                      example="1"
     *             ),
     *                 @OA\Property(
     *                      type="number",
     *                      property="important",
     *                      example="0"
     *             ),
     *                 @OA\Property(
     *                      type="string",
     *                      property="title",
     *                      example="taskname"
     *             ),
     *                 @OA\Property(
     *                      type="string",
     *                      property="description",
     *                      example="day src len github"
     *             ),
     *                 @OA\Property(
     *                      type="string",
     *                      property="date",
     *                      example="2023-06-09"
     *             ),
     *                 @OA\Property(
     *                      type="string",
     *                      property="directory",
     *                      example="main"
     *             ),
     *         )
     *      )
     * ),
     *      @OA\Response(
     *          response=200,
     *          description="success",
     *          @OA\JsonContent(
     *              @OA\Property(
     *                  type="string",
     *                  property="message",
     *                  example="Model created successfully"
     *               ),                  
     *          )
     *      )
     * )
     * )
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
    public function update(Request $request, $id) {
        $task = Task::where('id', $id);

        $task->fill($request->all());
        
        $task->save();
                    
        return response()->json([
            'messsage' => 'Update successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}

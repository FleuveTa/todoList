<?php

namespace App\Http\Controllers;

use App\Models\Directory;
use App\Http\Requests\UpdateDirectoryRequest;
use Illuminate\Http\Request;

class DirectoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Add directory
     * @OA\Post (
     *     path="/api/adddir",
     *     tags={"Directory"},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="application/json",
     *             @OA\Schema(
     *                 @OA\Property(
     *                      type="string",
     *                      property="name",
     *                      example="main2"
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
     *                  example="Directory created successfully"
     *               ),                  
     *          )
     *      )
     * )
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|string'
        ]);

        $userId = auth()->id();

        $model = new Directory();

        $model->name = $validateData['name'];
        $model->user_id = $userId;

        $model->save();

        return response()->json([
            'message' => 'Create new directory successfully'
        ]);
    }


    /**
     * Get all dirs of current user  
     * @OA\Get (
     *     path="/api/getdir",
     *     tags={"Directory"},
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
     *                         example="2"
     *                     ),
     *                     @OA\Property(
     *                         property="name",
     *                         type="string",
     *                         example="main"
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

    public function getUserDirs () {
        $userId = auth()->id();

        $dirs = Directory::where('user_id', $userId)->get();

        return response()->json($dirs);
    }

    /**
     * Display the specified resource.
     */
    public function show(Directory $directory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Directory $directory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDirectoryRequest $request, Directory $directory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Directory $directory)
    {
        //
    }
}

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
     * Store a newly created resource in storage.
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    public function directories() :HasMany
    {
        return $this->hasMany(Directory::class);
    }

    public function tasks() :HasMany
    {
        return $this->hasMany(Task::class);
    }
}

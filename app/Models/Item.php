<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $table='items';
    
    protected $fillable=[
        'name',
        'image',
        'description',
        'price',
        'expiredate',
        'catagory',
        'brand',
        'rating'
    ];
}

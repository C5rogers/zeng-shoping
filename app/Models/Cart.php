<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table='carts';
    protected $fillable=[
        'user_id',
        'item_id',
        'total_price',
        'quantity'
    ];

    public function user(){
        return $this->belongsTo('App\User','id','user_id');
    }
}

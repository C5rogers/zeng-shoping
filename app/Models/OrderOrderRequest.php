<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderOrderRequest extends Model
{
    use HasFactory;
    protected $table="order_order_requests";
    protected $fillable=[
        'order_id',
        'order_request_id'
    ];
}

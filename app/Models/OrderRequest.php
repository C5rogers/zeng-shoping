<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderRequest extends Model
{
    use HasFactory;
    protected $table='order_requests';
    protected $fillable=[
        'user_id',
        'overallprice'
    ];

    public function user(){
        return $this->belongsTo(User::class,'id','user_id');
    }
}

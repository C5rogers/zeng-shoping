<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Item;
use Illuminate\Support\Facades\DB;


class AdminController extends Controller
{
    //
    public function getAllUsers (Request $request){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){
            return response()->json(['users'=>User::latest()->get(),'status'=>200]);
        }

        return response([
            "errorMessage"=>"You Are Not Authorized",
            "status"=>401
        ]);
    }

    public function getAllOrders(Request $request){

        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){
            //need to send two datas with order_request + User && orders + Users
            $orderRequest=DB::table('order_requests')->join('users','users.id','=','order_requests.user_Id')->select('users.name','users.email','users.profile','users.phonenumber','order_requests.overallprice','order_requests.id')->get();
            $orders=DB::table('items')->join('orders','items.id','=','orders.item_id')->join('users','users.id','=','orders.user_id')->select('orders.total_price','orders.quantity','orders.item_id','orders.id','items.name','items.image','items.brand','items.expiredate','items.catagory','users.email','users.phonenumber','users.profile')->get();

            return response([
                'orderRequests'=>$orderRequest,
                'orders'=>$orders,
                'status'=>200
            ]);
            
        }

        return response([
            "errorMessage"=>"You Are Not Authorized",
            "status"=>401
        ]);
        
    }

    public function getSoldItems(Request $request){

        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){
             //need the user information and also the item information
            //  combine the item and also the user and also the sold item tables 3 tables
            $soldItems=DB::table('items')->join('sold_items','items.id','=','sold_items.item_id')->join('users','users.id','=','sold_items.user_id')->select('sold_items.total_price','sold_items.quantity','items.name','items.image','items.price','items.expiredate','items.catagory','items.brand','items.rating','users.email','users.phonenumber','users.profile')->get();

            return response([
                'sold_items'=>$soldItems,
                "status"=>200
            ]);
        }


        return response([
            "errorMessage"=>"You Are Not Authorized",
            "status"=>401
        ]);

    }
}

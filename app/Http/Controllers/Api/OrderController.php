<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Hamcrest\Number\OrderingComparison;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderOrderRequest;
use App\Models\OrderRequest;
use App\Models\User;

class OrderController extends Controller
{
    //this will return the user specific order for the user itself
    public function index(Request $request){

        $user=User::find($request->user()->id);
        if($user->status=='active'){
            // return response()->json(OrderRequest::where('user_id',$request->user()->id)->get());
            return response(['orders'=>OrderRequest::where('user_id',$request->user()->id)->get(),'status'=>200]);
        }

            return response([
                'status'=>400,
                'message'=>'Sorry You\'r Account Has Been Blocked By The Admin Please Contact Him/Her'
            ]);
        

    }

    //this will return all order from the order tables
    public function getAllOrders(Request $request){
        return response()->json(Order::latest()->get());
    }

    //this will store the order request by migrating from carts table
    public function store(Request $request){

        $user=User::find($request->user()->id);
        if($user->status=='active'){

            $fild['overallprice']=$request['overallprice'];
            $fild['user_id']=$request->user()->id;
            $order=OrderRequest::create($fild);

            Cart::select('*')
                ->where('user_id',$request->user()->id)
                ->each(function ($cartItem){
                    $fild['user_id']=$cartItem->user_id;
                    $fild['item_id']=$cartItem->item_id;
                    $fild['quantity']=$cartItem->quantity;
                    $fild['total_price']=$cartItem->total_price;
                    $newOrder=Order::create($fild);

                    $orderRequest=OrderRequest::where('user_id','=',$newOrder->user_id)->latest()->first();
                    
                    $fildTwo['order_id']=$newOrder->id;
                    $fildTwo['order_request_id']=$orderRequest->id;
                    OrderOrderRequest::create($fildTwo);
                    $cartItem->delete();
                });
            


                return response()->json(['order'=>$order,'status'=>201]);

        }
        return response([
            'status'=>400,
            'message'=>'Sorry You\'r Account Has Been Blocked By The Admin Please Contact Him/Her'
        ]);
        
    }

    public function destroy(Request $request,OrderRequest $orderRequest){


        //this need to be validated if the order is the users or the rollbacker is the admin

        $user=User::find($request->user()->id);


        if($user->id==$orderRequest->user_Id||$user->authority=='admin'){
            //geting deleted orders from the table
            if($user->status=='active'){
                $deletedOrderId=OrderOrderRequest::select('order_id')
                ->where('order_request_id','=',$orderRequest->id)
                ->get();
    
                //deleting the orders
                Order::whereIn('id',$deletedOrderId)->delete();
    
                //deleting order request
                $orderRequest->delete();
                return response(['status'=>200]);
            }else{
                return response([
                    'status'=>400,
                    'message'=>'Sorry You\'r Account Has Been Blocked By The Admin Please Contact Him/Her'
                ]);
            }
           

        }

        return response([
            "errorMessage"=>"You Are Not allowed",
            "status"=>401
        ]);
        

    }

}

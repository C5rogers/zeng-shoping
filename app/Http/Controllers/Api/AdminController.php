<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Item;
use App\Models\OrderRequest;
use Illuminate\Support\Facades\DB;
use App\Models\OrderOrderRequest;
use App\Models\SalesReport;
use App\Models\SoldItem;


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
            $orders=DB::table('items')->join('orders','items.id','=','orders.item_id')->join('users','users.id','=','orders.user_id')->select('orders.total_price','orders.quantity','orders.item_id','orders.id','items.name','items.image','items.brand','items.expiredate','items.catagory','items.rating','items.description','items.price','users.email','users.phonenumber','users.profile')->get();

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
            $soldItems=DB::table('items')->join('sold_items','items.id','=','sold_items.item_id')->join('users','users.id','=','sold_items.user_id')->select('sold_items.total_price','sold_items.id','sold_items.quantity','items.name','items.image','items.price','items.expiredate','items.catagory','items.brand','items.rating','users.email','users.phonenumber','users.profile')->get();
            //this is where we select out some data from the sales report table to send
            $salesReport=SalesReport::select('year','month','ammount')->get();

            return response([
                'sold_items'=>$soldItems,
                'sales_report'=>$salesReport,
                "status"=>200
            ]);
        }


        return response([
            "errorMessage"=>"You Are Not Authorized",
            "status"=>401
        ]);

    }

    // this is done when the admin sale the order of user
    public function sale(Request $request,OrderRequest $orderRequest){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){
           $ordersToBeSold = OrderOrderRequest::select('order_id')
                                    ->where('order_request_id','=',$orderRequest->id)
                                    ->get();
           Order::whereIn('id',$ordersToBeSold)->select('*')
                            ->each(function ($order){
                                $fild['user_id']=$order->user_id;
                                $fild['item_id']=$order->item_id;
                                $fild['total_price']=$order->total_price;
                                $fild['quantity']=$order->quantity;
                                SoldItem::create($fild);

                                $order->delete();
                            });

                            //this is where we add the sales report for the graph to be seen
                            $salesReport=SalesReport::latest()->first();

                            
                            if($salesReport && $salesReport->year==date('Y') && $salesReport->month==date('M')){
                                $fild['ammount']=$salesReport->ammount+1;
                                $salesReport->update($fild);
                            }else{
                                $fild['year']=date('Y');
                                $fild['month']=date('M');
                                $fild['ammount']=1;
                                SalesReport::create($fild);
                            }
                            
                            $orderRequest->delete();

                            return response([
                                "message"=>"Item Sold Successfully!",
                                "status"=>200
                            ]);

        }

        return response([
            'errorMessage'=>"You Are Not Authorized",
            "status"=>401
        ]);
    }

    // this will roll back order items from order list by the admin
    public function rollBackOrderItem(Request $request,Order $order){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){

                $orderOrderRequest=OrderOrderRequest::where('order_id','=',$order->id)->first();
                
                $toFindCount=OrderOrderRequest::where('order_request_id','=',$orderOrderRequest->order_request_id)->get();
                $count=$toFindCount->count();

                $orderRequest=OrderRequest::where('id','=',$orderOrderRequest->order_request_id)->first();

                if($count>1){
                    $fild['overallprice']=$orderRequest->overallprice-$order->total_price;
                    $orderRequest->update($fild);
                    $order->delete();
                }else {
                    $order->delete();
                    $orderRequest->delete();
                }




            return response([
                "message"=>"Order Rolled Back Successfylly!",
                "status"=>200
            ]);

        }

        return response([
            'errorMessage'=>"You Are Not Authorized",
            "status"=>401
        ]);
    }


    public function deleteSoldItem(Request $request,SoldItem $soldItem){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin'){
            $soldItem->delete();
            return response(['message'=>"Sold Item Deleted Successfully!",'status'=>200]);
        }

        return response([
            'message'=>"You Are Not Authorized",
            'status'=>401
        ]);
    }

    public function activateUser(Request $request,User $user){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin' && $user->authority=='user'){
            $fild['status']='active';
            $user->update($fild);
            return response([
                'user'=>$user,
                'status'=>200
            ]);
        }

        return response([
            'message'=>'You Are Not Authorized',
            'status'=>401
        ]);
    }

    public function deActivateUser(Request $request,User $user){
        $admin=User::find($request->user()->id);
        if($admin && $admin->authority=='admin' && $user->authority=='user'){
            $fild['status']='baned';
            $user->update($fild);
            return response([
                'user'=>$user,
                'status'=>200
            ]);
        }

        return response([
            'message'=>'You Are Not Authorized!',
            'status'=>401
        ]);
    }
}

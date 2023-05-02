<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        // $user=User::find($request->user()->id);
        // $carts=Cart::where('user_id',$user->id)->get();
        // return response()->json($carts);


        $carts=DB::table('carts')->join('items','items.id','=','carts.item_id')->where('carts.user_id','=',$request->user()->id)->select('items.name','items.brand','items.price','items.catagory','items.image','items.expiredate','items.rating','carts.id','carts.total_price','carts.quantity','carts.user_id')->get();

        return response()->json($carts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fild['user_id']=$request->user()->id;
        $fild['item_id']=$request['item_id'];
        $fild['total_price']=$request['total_price'];
        $fild['quantity']=$request['quantity'];
        $cart=Cart::create($fild);
        return response()->json(['cart'=>$cart,'status'=>201]);
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        $fild['quantity']=$request['quantity'];
        $fild['total_price']=$request['total_price'];
        $cart->update($fild);
        $newCart=DB::table('carts')->join('items','items.id','=','carts.item_id')->where('carts.id','=',$cart->id)->select('items.name','items.brand','items.price','items.catagory','items.image','items.expiredate','items.rating','carts.id','carts.total_price','carts.quantity','carts.user_id')->get();
        return response()->json(['cart'=>$newCart,'status'=>200]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();
        return response(['status'=>200]);
    }
}

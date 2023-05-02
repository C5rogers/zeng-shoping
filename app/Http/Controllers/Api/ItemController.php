<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemCreateRequest;
use App\Models\Item;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return response()->json(Item::latest()->get());
        return response()->json(Item::latest()->paginate(8));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ItemCreateRequest $request)
    {
        $fild=$request->validated();
        $image=$request->file('image')->store('items','public');
        $image=asset('storage/'.$image);
        $fild['image']=$image;
        $item=Item::create($fild);
        return response()->json(['item'=>$item,'status'=>201]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $fild=$request->validate([
            'name'=>['required','string','min:3'],
            'price'=>['required'],
            'description'=>['required','string'],
            'expiredate'=>['required'],
            'catagory'=>['required','string'],
            'brand'=>['required','string']
        ]);
        if($request->hasFile('image')){
            $request->validate(['image'=>['file','mimes:png,jpg,gif,jpeg','max:2048']]);
            $image=$request->file('image')->store('items','public');
            $imageAddress=str_replace("http://localhost:8000/","",$item->image);
            File::delete($imageAddress);
            $image=asset('storage/'.$image);
            $fild['image']=$image;
        }
        $item->update($fild);
        return response([
            'item'=>$item,
            'status'=>200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $imageAddress=str_replace("http://localhost:8000/","",$item->image);
        File::delete(public_path($imageAddress));
        $item->delete();
        return response(['status'=>200]);
    }

    public function like(Item $item){
        $newRating['rating']=$item->rating+1;
        $item->update($newRating);
        return response([
            'id'=>$item->id,
            'rating'=>$item->rating
        ],200);
    }

    public function dislike(Item $item){
        if($item->rating>0){
            $newRating['rating']=$item->rating-1;
            $item->update($newRating);
        }
        return response([
            'id'=>$item->id,
            'rating'=>$item->rating
        ],200);
    }
}

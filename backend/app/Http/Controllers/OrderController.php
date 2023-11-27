<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $payload = $request->validate([
            'basketContents' => ['required'],
        ]);
        $userId = $request->user()->id;

        $total = array_reduce($payload['basketContents'], function ($acc, $item) {
            $p = Product::where(['id' => $item['id']])->first();
            $discounted = $p->price - $p->discount;
            $acc += $discounted * $item['quantity'];
            return $acc;
        }, 0);

        $order = new Order;
        $order->userId = $userId;
        $order->basketContents = json_encode(array_map(function ($item) {
            $p = Product::where(['id' => $item['id']])->first();
            return ['id' => $p->id, 'name' => $p->name, 'price' => $p->price, 'discount' => $p->discount, 'packSize' => $p->packSize, 'productImageFileName' => $p->productImageFileName, 'quantity' => $item['quantity']];
        }, $payload['basketContents']));
        $order->shippingAddress = 'Ulica Hardkodovana 17';
        $order->billingAddress = 'Ulica Hardkodovana 17';
        $order->orderTotal = $total;
        $order->save();
        return response()->json(['status' => 'ok', 'data' => $order]);
    }

    public function getOrder(string $id)
    {
        return response()->json(['status' => 'ok', 'data' => Order::where(['id' => $id])->first()]);
    }
}

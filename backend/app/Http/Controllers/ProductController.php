<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function productsList()
    {
        return response()->json(['status' => 'ok', 'data' => ['products' => Product::all()]]);
    }
}

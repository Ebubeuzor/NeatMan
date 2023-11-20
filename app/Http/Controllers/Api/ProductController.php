<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Mail\ContactUs;
use App\Mail\MakeInquiry;
use App\Models\Category;
use App\Models\Image;
use App\Models\Size;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProductResource::collection(
            Product::paginate(20)
        );
    }

    public function newArrival()
    {
        $twoWeeksAgo = Carbon::now()->subWeeks(2);

        $products = Product::whereDate('created_at', '>=', $twoWeeksAgo)
            ->paginate(20);

        return ProductResource::collection($products);
    }


    public function rearrange(Request $request)
    {
        $data = $request->all();

        $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->where('categories.category', '=', $data['category']);

        
        $products = $productsQuery->paginate(6);

        return ProductResource::collection(
            $products
        );
    }

    public function makeInquiry(Request $request)
    {
        $data = $request->validate([
            "message" => "required"
        ]);

        $user = Auth()->user();
        Mail::to('neatmannil@gmail.com')->send(new MakeInquiry($user,$data["message"]));

    }

    

    public function contactUs(Request $request)
    {
        $data = $request->validate([
            "name" => "required",
            "email" => "required",
            "message" => "required"
        ]);

        $username = $data["name"];
        $useremail = $data["email"];

        Mail::to('neatmannil@gmail.com')->send(new ContactUs($username,$useremail,$data["message"]));

    }

    


    public function selectProducts(Request $request)
    {
        
        $category = request('category');
        $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->where('categories.category', '=', $category);

        
        $products = $productsQuery->paginate(6);

        return ProductResource::collection(
            $products
        );

    }
    
    public function search(Request $request)
    {
        
        $search = request('search');
        $productsQuery = Product::query();

        if ($search) {
            $productsQuery->where('title', 'LIKE', "%$search%");
        }

        
        $products = $productsQuery->paginate(6);

        return ProductResource::collection(
            $products
        );

    }
    

    public function selectProductsRandom(Request $request)
    {
        
        $menu = request('menu');
        $submenu = request('submenu');
        $item = request('item');
        $productsQuery = Product::select('products.*')
            ->join('category_product', 'products.id', '=', 'category_product.product_id')
            ->join('categories', 'category_product.category_id', '=', 'categories.id')
            ->join('menus', 'categories.menu_id', '=', 'menus.id') // Join the menus table
            ->where('categories.categories', '=', $submenu)
            ->where('menus.Title', '=', $menu);

        
        $products = $productsQuery
                    ->inRandomOrder() 
                    ->limit(3) 
                    ->get();

        return ProductResource::collection(
            $products
        );

    }

    public function getProductsRandom()
    {
        return ProductResource::collection(
            Product::select('id', 'frontImage', 'title', 'details', 'created_at')
                ->groupBy('id', 'frontImage', 'title', 'details', 'created_at')
                ->inRandomOrder()
                ->limit(4)
                ->get()
        );        

    }

    
    private function saveImage($image)
    {
        // Check if image is base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $matches)) {
            $imageData = substr($image, strpos($image, ',') + 1);
            $imageType = strtolower($matches[1]);

            // Check if file is an image
            if (!in_array($imageType, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('Invalid image type');
            }

            // Decode base64 image data
            $decodedImage = base64_decode($imageData);

            if ($decodedImage === false) {
                throw new \Exception('Failed to decode image');
            }
        } else {
            throw new \Exception('Invalid image format');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $imageType;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }

        // Save the decoded image to the file
        if (!file_put_contents($relativePath, $decodedImage)) {
            throw new \Exception('Failed to save image');
        }

        return $relativePath;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $image = $this->saveImage($data['frontImage']);
        $data['frontImage'] = $image;

        $product = new Product();
        $product->frontImage = $data['frontImage'];
        $product->details = $data['details'];
        $product->title = $data['title'];

        $product->save();

        $categories = $data['categories'];

        $images = $data['images'];
        
        foreach ($images as $base64Image) {
            $imageData = ['image' => $base64Image, 'product_id' => $product->id];
            $this->createImage($imageData);
        }

        foreach ($categories as $category) {
            $categoryData = ['product_id' => $product->id,'category_id' => $category];
            $this->createProductCategory($categoryData);
        }

        return new ProductResource($product);
    }




    public function createImage($data)
    {
        $validator = Validator::make($data,[
            'image' => 'string', 'product_id' => 'exists:App\Models\Product,id'
        ]);

        $data2 = $validator->validated();

        $data2['image'] = $this->saveImage($data2['image']);

        return Image::create($data2);

    }

    public function createProductCategory($data)
    {
        $validator = Validator::make($data, [
            'category_id' => 'exists:App\Models\Category,id',
            'product_id' => 'exists:App\Models\Product,id'
        ]);

        $validatedData = $validator->validated();

        $product = Product::find($validatedData['product_id']);
        $category = Category::find($validatedData['category_id']);

        if (!$product || !$category) {
            throw new \Exception('Product or Category not found');
        }

        $product->categories()->attach($category->id);

        return true;
    }
    
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        $product->update([
            'details' => $data['details'],
            'title' => $data['title'],
        ]);

        if (isset($data['images']) && !empty($data['images'])) {
            $this->updateImages($product, $data['images']);
        } 

        if (isset($data['categories'])) {
            $this->updateCategories($product, $data['categories']);
        }

        if (isset($data['frontImage'])) {
            $product->frontImage = $this->saveImage($data['frontImage']);
        }


        // Save the updated product with the possibly modified frontImage and alternateImage
        $product->save();

        return new ProductResource($product);

    }

    // Helper function to update images
    private function updateImages(Product $product, array $images)
    {
        $product->images()->delete();

        // Create and associate new images
        foreach ($images as $base64Image) {
            $imageData = ['image' => $base64Image, 'product_id' => $product->id];
            $this->createImage($imageData);
        }
    }

    private function updateSizes(Product $product, array $sizes)
    {
        // Delete existing sizes related to the product
        $product->sizes()->delete();

        // Create and associate new sizes
        foreach ($sizes as $size) {
            $sizeData = ['product_id' => $product->id, 'sizes' => $size];
            $this->createSize($sizeData);
        }
    }

    private function updateCategories(Product $product, array $categories)
    {
        // Detach all existing categories from the product
        $product->categories()->detach();

        // Attach new categories to the product
        foreach ($categories as $category) {
            $categoryData = ['product_id' => $product->id, 'category_id' => $category];
            $this->createProductCategory($categoryData);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        $product->images()->delete();
        
        $absolutePath = public_path($product->frontImage);
        File::delete($absolutePath);
        
        $absolutePath2 = public_path($product->alternateImage);
        File::delete($absolutePath2);

        return response("",204);        
    }

}

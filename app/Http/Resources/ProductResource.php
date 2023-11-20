<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class ProductResource extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image' => ImageResource::collection($this->images),
            'frontImage' => $this->frontImage ? URL::to($this->frontImage) : null,
            'title' => $this->title,
            'categories' => CategoryResource::collection($this->categories),
            'details' => $this->details,
            'created_at' => optional($this->created_at)->format('Y/m/d H:i a'),
        ];
    }
}

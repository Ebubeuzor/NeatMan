<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;

class HomepageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            
            'title1' => $this->title1,
            'Subtext1' => $this->Subtext1,
            'Section1Image' => $this->Section1Image ? URL::to($this->Section1Image) : null,
            
            'title2' => $this->title2,
            'Subtext2' => $this->Subtext2,
            'Section2Image' => $this->Section2Image ? URL::to($this->Section2Image) : null,
        ];
    }
}

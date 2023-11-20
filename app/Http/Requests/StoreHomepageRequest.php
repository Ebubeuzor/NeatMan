<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHomepageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title1' => 'nullable',
            'Subtext1' => 'nullable',
            'Section1Image' => 'nullable',
            'title2' => 'nullable',
            'Subtext2' => 'nullable',
            'Section2Image' => 'nullable',
        ];
    }
}

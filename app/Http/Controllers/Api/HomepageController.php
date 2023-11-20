<?php

namespace App\Http\Controllers\Api;
use FFMpeg\FFMpeg;
use App\Http\Controllers\Controller;
use App\Models\Homepage;
use App\Http\Requests\StoreHomepageRequest;
use Illuminate\Support\Str;
use App\Http\Requests\UpdateHomepageRequest;
use App\Http\Resources\HomepageResource;
use FFMpeg\FFMpeg as FFMpegFFMpeg;
use Illuminate\Support\Facades\File;

class HomepageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HomepageResource::collection(
            Homepage::all()
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



    public function store(StoreHomepageRequest $request)
    {
        $data = $request->validated();
        $attributes = [];

        // Loop through only 1 and 2
        for ($i = 1; $i <= 2; $i++) {
            $titleKey = "title{$i}";
            $subtextKey = "Subtext{$i}";
            $imageKey = "Section{$i}Image";

            // Check if the keys are present in the data
            if (isset($data[$titleKey]) || isset($data[$subtextKey]) || isset($data[$imageKey])) {
                $attributes["title{$i}"] = $data[$titleKey] ?? null;
                $attributes["Subtext{$i}"] = $data[$subtextKey] ?? null;
                $attributes["Section{$i}Image"] = $data[$imageKey] ?? null;

                // If the image is present, save it and update the attribute
                if ($data[$imageKey]) {
                    $attributes["Section{$i}Image"] = $this->saveImage($data[$imageKey]);
                }
                // Update or create records based on a specific condition
                Homepage::updateOrCreate(['id' => 1], [
                    "title{$i}" => $attributes["title{$i}"] ,
                    "Subtext{$i}" => $attributes["Subtext{$i}"],
                    "Section{$i}Image" => $attributes["Section{$i}Image"],
                ]);
            }
            
        }


        return response('');
    }






    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Homepage  $homepage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Homepage $homepage)
    {
        //
    }
    
}

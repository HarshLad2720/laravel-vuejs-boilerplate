<?php
namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait UploadTrait {
    public function uploadOne(UploadedFile $uploadedFile, $folder, $filename = "") {
        return $uploadedFile->store($folder);
    }

    public function deleteOne($paths, $filenames = "") {
        foreach ($paths as $path) {
            if(Storage::exists($path)) {
                Storage::delete($path);
            }
        }
    }
}
?>

<?php
use Illuminate\Http\Request;

Route::post('/hub/download', function(Request $request) {
    if( ! $request->product_id){
        return;
    }

    $id = $request->product_id;
    $zipFileName = "$id-images.zip";
    $zipFilePath = storage_path($zipFileName);

    echo "Downloading...";

    try{
        $zip = new ZipArchive;
        $zip->open($zipFilePath, \ZipArchive::CREATE);

        $zip->addFromString("h-preview.jpg", file_get_contents("https://media.autodoc.de/360_photos/$id/h-preview.jpg"));

        for ($i=1; $i < 5; $i++) { 
            $zip->addFromString("image-$i.jpg", file_get_contents("https://cdn.autodoc.de/thumb?id=$id&n=$i"));
        }

        // 360 images
        $url360 = "https://media.autodoc.de/360_photos/$id/images/$id";
        if(substr(get_headers($url360 . '_1.jpg')[0], 9, 3) !== 404){
            for ($i=1; $i < 36; $i++) { 
                $url = "{$url360}_$i.jpg";
                if(substr(get_headers($url)[0], 9, 3) == 404){
                    continue;
                }

                $zip->addFromString("360/$id-$i.jpg", file_get_contents($url));
            }
        }else if(substr(get_headers($url360 . '-(1).jpg')[0], 9, 3) !== 404){
            for ($i=1; $i < 36; $i++) { 
                $url = "{$url360}-($i).jpg";
                if(substr(get_headers($url)[0], 9, 3) == 404){
                    continue;
                }

                $zip->addFromString("360/$id-$i.jpg", file_get_contents($url));
            }
        }
    }catch(\Exception $e){
        print_r([$e->getMessage(), $e->getLine(), $e->getFile()]);
        return 'Error downloading images. <a href="/hub/image-scrapper">Go back</a>';
    }

    $zip->close();
   
    return response()->download($zipFilePath)->deleteFileAfterSend();
});
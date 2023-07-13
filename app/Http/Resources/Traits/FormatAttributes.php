<?php

namespace App\Http\Resources\Traits;

trait FormatAttributes
{
    public $locale;

    public function getAttributeData($key)
    {
        if(is_array($key)){
            return $this->getAttributeValuesList($key);
        }

        $attribute = $this->attribute_data->get($key);

        return $this->getAttributeValue($attribute, $this->getLocale());
    }

    public function getAttributeValuesList($keys, $withNames=false) 
    {
        $formatted = [];
        $names = [];

        if($keys instanceof \Illuminate\Support\Collection){
            $attributes = $keys;
        }else{
            $attributes = $this->attribute_data->only($keys);
        }

        $locale = $this->getLocale();

        if($withNames){
            $names = $this->getModel()->attributeNames();
        }

        foreach($attributes as $name => $attr){
            if($val = $this->getAttributeValue($attr, $locale)){
                if($withNames){
                    $formatted[] = [
                        'name' => \Arr::get($names, $name),
                        'value' => $val,
                    ];
                }else {
                    $formatted[$name] = $val;
                }
            }
        }

        return $formatted;
    }
    
    public function getAttributeValue($attribute, $locale='en')
    {
        if( ! $attribute){
            return null;
        }

        $value = $attribute->getValue();

        if(is_string($value) || is_numeric($value)){
            return $value;
        }

        // Use here otherwise 0's will be ignored
        if( ! $value){
            return null;
        }

        return $value->get($locale);        
    }

    public function getLocale()
    {
        if( ! $this->locale){
            $this->locale = app()->getLocale();
        }
        
        return $this->locale;
    }

     public function getImageData($media)
    {
        if( ! $media){
            return null;
        }
        
        return [
            'id' => $media->id,
            'name' => $media->name,
            'original_url' => $media->getFullUrl(),
        ];
    }
}

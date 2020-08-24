<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class StatesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => (string)$this->name,
            'country_id' =>(string) $this->country_id,
            'country' => $this->country,
            'created_at' => (string)$this->created_at,
            'updated_at' => (string)$this->updated_at,
            'deleted_at' => (string)$this->deleted_at
        ];
    }
}

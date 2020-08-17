<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class HobbiesResource extends JsonResource
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
            'created_at' => (string)$this->created_at,
            'created_by' => (string)$this->created_by,
            'updated_at' => (string)$this->updated_at,
            'updated_by' => (string)$this->updated_by,
            'deleted_at' => (string)$this->deleted_at
        ];
    }
}

<?php

namespace App\Http\Resources\Permission;

use App\Http\Resources\DataJsonResponse;

class PermissionsCollection extends DataJsonResponse
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}

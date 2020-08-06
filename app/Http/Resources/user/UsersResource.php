<?php

namespace App\Http\Resources\user;

use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
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
            'id' => (string)$this->id,
            'name' => (string)$this->name,
            'email' =>(string) $this->email,
            'mobile_no' => (string)$this->mobile_no,
            'role_id' => (string)$this->role_id,
            'profile_image' =>(string) $this->profile_image,
            'gender' => (string)$this->gender,
            'gender_text' => (string) config('constants.user.gender.'.$this->gender),
            'dob' => (string)$this->dob,
            'city' => (string)$this->city,
            'address' => (string)$this->address,
            'status' => (string)$this->status,
            'status_text' => (string) config('constants.user.status.'.$this->status),
            'email_verified_at' =>(string) $this->email_verified_at,
            'created_at' => (string)$this->created_at,
            'updated_at' => (string)$this->updated_at
        ];
    }
}

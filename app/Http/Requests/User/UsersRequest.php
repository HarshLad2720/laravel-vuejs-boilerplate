<?php

namespace App\Http\Requests\User;

//use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UsersRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required | max:255',
            'email' => 'required|max:255|email|max:255|unique:users,email',
            'password' => 'required | min:6 | max:255',
            'mobile_no' => 'required | digits:10',
            'profile' => 'required',
            'gender' => 'required',
            'dob' => 'required',
            'address' => 'required',
            'country_id' => 'required',
            'state_id' => 'required',
            'city_id' => 'required',
            'gallery' => 'required',
            'hobby' => 'required',
        ];
    }
}

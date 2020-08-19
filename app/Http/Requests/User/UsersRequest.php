<?php

namespace App\Http\Requests\User;

//use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

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
    public function rules(Request $request)
    {
        $uri = $request->path();
        $urlArr = explode("/",$uri);

        return [
            'name' => 'required | max:255',
            'email' => [
                'required',
                'max:255',
                Rule::unique('users')->ignore(end($urlArr)),
            ],
            'password' => 'required | min:6 | max:255',
            'mobile_no' => 'required | digits:10',
            'profile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:255',
            'gender' => ['required', Rule::in([0, 1,])],
            'dob' => 'required|date|date_format:Y-m-d',
            'address' => 'required|max:500',
            'country_id' => 'required|integer|exists:countries,id,deleted_at,NULL',
            'state_id' => 'required|integer|exists:states,id,deleted_at,NULL',
            'city_id' => 'required|integer|exists:cities,id,deleted_at,NULL',
            'gallery' => 'required|array',
            'gallery.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
            'hobby' => 'required|exists:hobbies,id,deleted_at,NULL|array',
            'hobby.*' => 'required|integer',
        ];
    }
}

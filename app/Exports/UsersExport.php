<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    protected $request;// defined private $request variable

    public function __construct($request)// constructor method
    {
        $this->request = $request;// assign $request $this variable
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $model = new User();

        $query =  User::commonFunctionMethod($model::select('name', 'email'),$this->request, true, null, null, true);

        return $query;
    }

    public function headings():array
    {
        return[
            'Name',
            'Email'
        ];
    }
}

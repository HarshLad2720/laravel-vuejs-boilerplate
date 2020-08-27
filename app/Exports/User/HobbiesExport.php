<?php

namespace App\Exports\User;

use App\Models\User\Hobby;
//use Laravel\Passport\Bridge\User;
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class HobbiesExport implements FromCollection, WithHeadings
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
        $model = new Hobby();

        $query =  User::commonFunctionMethod($model::select(
            'id',
            'name'),
            $this->request, true, null, null, true);

        return $query;
    }

    public function headings():array
    {
        return[
            'ID',
            'Name'
        ];
    }
}

<?php

namespace App\Exports\User;

use App\Models\User\State;
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;

class StatesExport implements FromCollection, WithHeadings
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
        $model = new State();

        $query =  User::commonFunctionMethod($model::select(
            'id',
            DB::raw('(SELECT name from countries WHERE id = states.country_id) AS country_name'),
            'name'),
            $this->request, true, null, null, true);

        return $query;
    }

    public function headings():array
    {
        return[
            'ID',
            'Country Name',
            'State Name',
        ];
    }
}

<?php

namespace App\Exports\User;

use App\Models\User\Permission;
use App\User;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PermissionsExport implements FromCollection, WithHeadings
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
        $model = new Permission();

        $query =  User::commonFunctionMethod($model::select(
            'id',
            'name',
            'guard_name'),
            $this->request, true, null, null, true);

        return $query;
    }

    public function headings():array
    {
        return[
            'ID',
            'Name',
            'Guard Name',
        ];
    }
}

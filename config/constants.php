<?php


return [

    /* 'project_name' => 'Laravel Project',
     'project_url' => 'http://127.0.0.1:8000/',
     'project_img' => 'storage/logo-facelab.png',
     'project_img2' => 'images/logo.png',
     'image' => [
         'dir_path' => '/storage/',
         'default_types' => 'gif|jpg|png|jpeg',
         'user_default_img' => 'images/default.jpg',
     ],


 */
    'messages' => [
        'user' => [
            'invalid' => 'Invalid credentials',
        ],

        'success' => 'Success.',
        'delete_24_hour_error_message' => 'You can\'t delete after 24 hours.',
        'update_24_hour_error_message' => 'You can\'t update after 24 hours.',
        'add_sucess' => 'Added Successfully.',
        'remove_sucess' => 'Remove Successfully.',
        'no_data_found' => 'No data found.',
        'token_amount_exceed' => 'Assign token total must be less or equal to ',
        'token_expire' => 'Invalid token id or token expired.',

    ],

    'validation_codes' => [
        '422' => 422,
    ],

    'user'=>[
        'status' => [
            '0' => 'Inactive',
            '1' => 'Active',
        ],
        'status_enum' => ['0', '1'],

        'gender' => [
            '0' => 'Female',
            '1' => 'Male',
        ],
        'gender_enum' => ['0', '1'],
    ],
];

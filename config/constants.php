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

        'success' => 'Success',
        'delete_success' => 'Delete Successfully',
        'registration_success'=>'Please check your inbox to activate your account',
        'forgotpassword_success'=>'Password reset instructions has been sent to your email. Please check your inbox/spam',
        'forgotpassword_error'=>'Invalid Email',
        'login' => [
            'success' => 'Login is successful.',
            'unverified_account' => 'Your account is not verified yet.',
            'wrong_credentials' => 'Invalid combination of email and password.',
            'login_token_failed' => 'Could not create login token.',
        ],
        'password_changed' => "Password has been changed.",
        'something_went_wrong' => 'Something went wrong.',
        'invalid_old_password' => "Invalid old password.",
        'similar_password' => "Please enter a password which is not similar then current password.",
        'not_match_confirm_password' => "New password is not match to confirm password.",
        'delete_sucess' => 'Delete Successful.',
        'apply_permissions' => 'Role permissions applied successfully.',
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
        'status_code' => [
            'inactive' => '0',
            'active' => '1',
        ],
        //'status_enum' => ['0', '1'],

        'gender' => [
            '0' => 'Female',
            '1' => 'Male',
        ],
       // 'gender_enum' => ['0', '1'],
    ],

    'permission' => [
        'has_permission' => '1',
        'has_not_permission' => '0',
        'role_guard_name' => 'web',
        'user_has_not_permission' => "You don\'t have permission to this functionality",
        'user_already_has_permission' => "Given permission already exists",
        'user_clinic_mapping_error' => "User clinic is not mapped yet",
        'module_error' => "Module not in request",
        'invalid_module_error' => "Invalid Module",
        'validation_error_status_code' => 422,
        'permission_assign_success' => 'Permission assign successfully',
        'permission_revert_success' => 'Permission reverted successfully',
        'permission_revert_failure' => 'Permission revert failed',
        'permission_not_found' => 'Permission not found',
        'role_not_found' => 'Role not found',
    ],
];

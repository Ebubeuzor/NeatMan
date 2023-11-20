<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'country' => 'required|string',
            'date_of_birth' => 'required|date',
        ]);

        $user->update($data);

        return response('');
    }
    
    public function updateAddress(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'state' => 'required|string',
            'city' => 'required|string',
            'address1' => 'required|string',
            'address2' => 'nullable|string',
            'phoneno' => 'required|string',
            'zipcode' => 'required|string',
        ]);

        $user->update($data);

        return response('');
    }

}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'aricellanightshade',
            'password' => Hash::make('nightshadearicella'),
            'role'     => 'officer'
        ]);

        User::create([
            'username' => 'kaelthorwindrider',
            'password' => Hash::make('windriderkaelthor'),
            'role'     => 'manager'
        ]);

        User::create([
            'username' => 'lyrindrastarfall',
            'password' => Hash::make('starfalllyrindra'),
            'role'     => 'finance'
        ]);
    }
}

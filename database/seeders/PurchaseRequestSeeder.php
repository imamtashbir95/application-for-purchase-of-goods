<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PurchaseRequest;

class PurchaseRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PurchaseRequest::create([
            'user_id' => 1,
            'item_name' => 'Laptop',
            'quantity' => 2,
            'price' => 15000000.00,
            'status' => 'Approved by Manager',
            'manager_comment' => 'Approved for department upgrade',
            'finance_comment' => null,
            'transfer_proof' => null,
        ]);

        PurchaseRequest::create([
            'user_id' => 1,
            'item_name' => 'Printer',
            'quantity' => 1,
            'price' => 3000000.00,
            'status' => 'Rejected by Manager',
            'manager_comment' => 'Not within budget',
            'finance_comment' => null,
            'transfer_proof' => null,
        ]);

        PurchaseRequest::create([
            'user_id' => 1,
            'item_name' => 'Office Chair',
            'quantity' => 5,
            'price' => 2500000.00,
            'status' => 'Pending',
            'manager_comment' => null,
            'finance_comment' => null,
            'transfer_proof' => null,
        ]);
    }
}

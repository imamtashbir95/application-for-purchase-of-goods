<?php

namespace App\Policies;

use App\Models\PurchaseRequest;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PurchaseRequestPolicy
{
    use HandlesAuthorization;

    public function update(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'officer' && $purchaseRequest->status == 'Pending' && $user->id == $purchaseRequest->user_id;
    }

    public function delete(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'officer' && $purchaseRequest->status == 'Pending' && $user->id == $purchaseRequest->user_id;
    }

    public function approve(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'manager' && $purchaseRequest->status == 'Pending';
    }

    public function rejectManager(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'manager' && $purchaseRequest->status == 'Pending';
    }

    public function rejectFinance(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'finance' && $purchaseRequest->status == 'Approved by Manager';
    }

    public function uploadProof(User $user, PurchaseRequest $purchaseRequest)
    {
        return $user->role == 'finance' && $purchaseRequest->status == 'Approved by Manager';
    }
}

<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\PurchaseRequest;
use App\Policies\PurchaseRequestPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        PurchaseRequest::class => PurchaseRequestPolicy::class
    ];


    public function boot()
    {
        $this->registerPolicies();

        Gate::define('update-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            // Misalkan Anda ingin memastikan hanya pengguna yang membuat purchase request yang bisa memperbaruinya
            return $user->id === $purchaseRequest->user_id;
        });

        Gate::define('delete-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            // Misalkan Anda ingin memastikan hanya pengguna yang membuat purchase request yang bisa menghapusnya
            return $user->id === $purchaseRequest->user_id;
        });

        Gate::define('approve-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            return $user->role === 'manager';
        });

        Gate::define('reject-manager-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            return $user->role === 'manager';
        });

        Gate::define('reject-finance-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            return $user->role === 'finance';
        });

        Gate::define('upload-proof-purchase-request', function ($user, PurchaseRequest $purchaseRequest) {
            return $user->role === 'finance';
        });
    }
}

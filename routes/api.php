<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PurchaseRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::group(['middleware' => ['auth:sanctum', \App\Http\Middleware\Cors::class]], function () {
    Route::get('/user', [UserController::class, 'getUser']);

    Route::apiResource('/purchase-requests', PurchaseRequestController::class);
    Route::post('/purchase-requests/{id}/approve', [PurchaseRequestController::class, 'approve']);
    Route::post('/purchase-requests/{id}/reject-manager', [PurchaseRequestController::class, 'rejectManager']);
    Route::post('/purchase-requests/{id}/reject-finance', [PurchaseRequestController::class, 'rejectFinance']);
    Route::post('/purchase-requests/{id}/upload-proof', [PurchaseRequestController::class, 'uploadProof']);
});
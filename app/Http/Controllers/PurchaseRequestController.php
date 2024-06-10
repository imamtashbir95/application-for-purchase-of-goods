<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use App\Models\PurchaseRequest;
use Illuminate\Support\Facades\Auth;

class PurchaseRequestController extends Controller
{
    use AuthorizesRequests;

    public function index() {
        $user = Auth::user();
        if ($user->role == 'officer') {
            return PurchaseRequest::where('user_id', $user->id)->get();
        }
        else if ($user->role == 'manager') {
            return PurchaseRequest::where('status', 'Pending')->orWhere('status', 'Approved by Manager')->get();
        }
        else if ($user->role == 'finance') {
            return PurchaseRequest::all();
        }
    }

    public function store(Request $request) {
        $request->validate([
            'item_name' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required',
        ]);

        $purchaseRequest = new PurchaseRequest();
        $purchaseRequest->user_id = Auth::id();
        $purchaseRequest->item_name = $request->item_name;
        $purchaseRequest->quantity = $request->quantity;
        $purchaseRequest->price = $request->price;
        $purchaseRequest->status = 'Pending';
        $purchaseRequest->manager_comment = null;
        $purchaseRequest->finance_comment = null;
        $purchaseRequest->save();

        return response()->json($purchaseRequest, 201);
    }

    public function show($id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        return response()->json($purchaseRequest, 200);
    }

    public function update(Request $request, $id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        
        $this->authorize('update', $purchaseRequest);

        $request->validate([
            'item_name' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required',
        ]);

        $purchaseRequest->item_name = $request->item_name;
        $purchaseRequest->quantity = $request->quantity;
        $purchaseRequest->price = $request->price;
        $purchaseRequest->save();

        return response()->json($purchaseRequest, 200);
    }

    public function destroy($id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        $this->authorize('delete', $purchaseRequest);
        $purchaseRequest->delete();

        return response()->json(['message' => 'Berhasil Menghapus Pengajuan'], 200);
    }

    public function approve($id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        $this->authorize('approve', $purchaseRequest);
        $purchaseRequest->status = 'Approved by Manager';
        $purchaseRequest->save();

        return response()->json($purchaseRequest);
    }

    public function rejectManager(Request $request, $id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        $this->authorize('rejectManager', $purchaseRequest);

        $purchaseRequest->status = 'Rejected by Manager';
        $purchaseRequest->manager_comment = $request->comment;

        $purchaseRequest->save();

        return response()->json($purchaseRequest);
    }

    public function rejectFinance(Request $request, $id) {
        $purchaseRequest = PurchaseRequest::findOrFail($id);
        $this->authorize('rejectFinance', $purchaseRequest);

        $purchaseRequest->status = 'Rejected by Finance';
        $purchaseRequest->finance = $request->comment;

        $purchaseRequest->save();

        return response()->json($purchaseRequest);
    }

    public function uploadProof(Request $request, $id) {
        $request->validate([
            'transfer_proof' => 'required|file|mimes:jpg,png,pdf',
        ]);

        $purchaseRequest = PurchaseRequest::findOrFail($id);
        $this->authorize('uploadProof', $purchaseRequest);

        if ($request->hasFile('transfer_proof')) {
            $file = $request->file('transfer_proof');
            $path = $file->store('transfer_proofs', 'public');
            $purchaseRequest->transfer_proof = $path;
            $purchaseRequest->status = 'Approved by Finance';
            $purchaseRequest->save();
        }

        return response()->json($purchaseRequest);
    }
}

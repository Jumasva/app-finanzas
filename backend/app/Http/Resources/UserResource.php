<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            // Fecha sin hora (AAAA-MM-DD). null solo en cuentas creadas antes de pedirla
            'birth_date' => $this->birth_date?->toDateString(),
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at?->toIso8601ZuluString(),
            'currency_code' => $this->currency_code,
            'status' => $this->status,
            'created_at' => $this->created_at?->toIso8601ZuluString(),
        ];
    }
}

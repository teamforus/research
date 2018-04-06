<?php

namespace App\Services\UUIDGeneratorService;

class UUIDGenerator
{
    public function generate($block_length, $block_count = 1)
    {
        return collect(range(0, $block_count - 1))
        ->map(function() use ($block_length) {
            return bin2hex(openssl_random_pseudo_bytes($block_length / 2));
        })->implode('-');
    }
}
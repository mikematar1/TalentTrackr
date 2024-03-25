<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('listing_matches_seekers', function (Blueprint $table) {
            $table->id();
            $table->integer("listing_id");
            $table->integer("seeker_id");
            $table->double("match_percentage");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listing_matches_seekers');
    }
};

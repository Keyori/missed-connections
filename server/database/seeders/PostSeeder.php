<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use MatanYadaev\EloquentSpatial\Objects\Point;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seedPosts = json_decode(Storage::disk('local')->get('SeedPosts.json'));
        $admin = User::where('is_admin', true)->first();

        foreach ($seedPosts as $seedPost) {
            $post = new Post();

            $post->user()->associate($admin);
            $post->message = $seedPost->message;
            $post->happened_at = $seedPost->postedAt;

            if (!empty($seedPost->campus)) {
                $post->campus = $seedPost->campus;
            }

            $post->location_name = $seedPost->location ?? null;

            if (!empty($seedPost->latitude) && !empty($seedPost->longitude)) {
                $post->latitude = $seedPost->latitude;
                $post->longitude = $seedPost->longitude;
            }

            $post->save();
        }
    }
}

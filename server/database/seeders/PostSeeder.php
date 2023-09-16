<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use MatanYadaev\EloquentSpatial\Objects\Point;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campusIndexMap = [
            "livingston" => 0,
            "collegeAve" => 1,
            "cookDoug" => 2,
            "busch" => 3,
        ];

        $seedPosts = json_decode(Storage::disk('local')->get('SeedPosts.json'));
        $admin = User::where('is_admin', true)->first();

        foreach ($seedPosts as $seedPost) {
            $post = new Post();

            $post->user()->associate($admin);
            $post->message = $seedPost->message;
            $post->happened_at = $seedPost->postedAt;

            if (!empty($seedPost->campus)) {
                $post->campus = $campusIndexMap[$seedPost->campus];
            }

            $post->location_name = $seedPost->location ?? null;

            if (!empty($seedPost->latitude) && !empty($seedPost->longitude)) {
                $post->coordinates = DB::raw("");
            }

            $post->save();
            // INSERT INTO posts (
            //     id,
            //     created_at,
            //     updated_at,
            //     user_id,
            //     message,
            //     happened_at,
            //     campus,
            //     likes,
            //     dislikes,
            //     location_name,
            //     coordinates
            //   )
            // VALUES (
            //     'id:bigint',
            //     'created_at:timestamp without time zone',
            //     'updated_at:timestamp without time zone',
            //     'user_id:bigint',
            //     'message:character varying',
            //     'happened_at:timestamp without time zone',
            //     campus:integer,
            //     likes:integer,
            //     dislikes:integer,
            //     'location_name:character varying',
            //     'coordinates:USER-DEFINED'
            //   );
        }
    }
}

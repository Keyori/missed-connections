<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

use function Ramsey\Uuid\v1;

class PostController extends Controller
{
    /**
     * Display posts to be rendered on a map
     */
    public function index()
    {
        $campuses = Post::select('campus')->distinct()->pluck('campus');
        $res = [];
        foreach ($campuses as $campus) {
            if (!empty($campus)) {
                $res += [$campus => Post::where('campus', $campus)->whereNotNull(['latitude', 'longitude'])->get()];
            }
        }
        return $res;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $random_feed_posts = Post::inRandomOrder()->whereNotNull('campus')->limit(10)->get()->toArray();
        array_unshift($random_feed_posts, Post::find($id));
        return $random_feed_posts;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

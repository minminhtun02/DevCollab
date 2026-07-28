<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function welcome(): Response
    {
        return Inertia::render('Welcome');
    }
}

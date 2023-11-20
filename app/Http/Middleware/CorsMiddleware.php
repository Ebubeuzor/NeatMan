<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    
    public function handle(Request $request, Closure $next)
     {
         $origin = $request->headers->get('Origin');
 
         if ($origin === 'http://127.0.0.1:5173') {
             $headers = [
                 'Access-Control-Allow-Origin' => $origin,
                 'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
                 'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
             ];
 
             $response = $next($request);
             $response->headers->add($headers);
 
             return $response;
         }
 
         return $next($request);
     }
}

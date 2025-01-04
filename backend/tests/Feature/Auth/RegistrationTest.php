<?php

test('new users can register', function () {
    $response = $this->post('api/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertStatus(201);
    $response->assertJson([
        'message' => 'User registered successfully',
    ]);
});

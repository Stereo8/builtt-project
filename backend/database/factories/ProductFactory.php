<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(fake()->numberBetween(1, 5), true),
            'price' => fake()->numberBetween(270, 1399),
            'productImageFileName' => fake()->numberBetween(1, 10).'.jpg',
            'discount' => fake()->optional(0.20, 0)->numberBetween(50, 270),
            'packSize' => fake()->randomElement(['250g', '500g', '750g', '1kg', '2,5kg'])
        ];
    }
}

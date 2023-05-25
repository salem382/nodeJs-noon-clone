# ECommerce Website Noon Clone

Welcome to Noon Clone ! This is a web application built with Node.js and Mongoose that allows users to browse and purchase products,   add products to wishlist, apply coupons,add review for product how buy it , manage their cart, and make cash or Stripe payments for their orders.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Product browsing and searching by category and subcategory
- Brand management for products
- Coupon system for discounts
- Shopping cart functionality
- Cash on delivery and Stripe payment options for orders

## Prerequisites

Before running this application, make sure you have the following prerequisites installed on your system:

- Node.js (version v16.17.0)
- mogoose (version ^7.0.3)
- Stripe API credentials (for Stripe payment integration)

## Installation

1. Clone this repository to your local machine: git clone https://github.com/salem382/nodeJs-noon-clone.git
2. Navigate to the project's root directory:cd nodeJs-noon-clone
3. Install the dependencies: npm i
4. Run the application: npm run start0


The application should now be running on `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:5000`.
2. Register as a new user or log in if you already have an account.
3. Browse the available products by category or subcategory.
4. Add desired items to your shopping cart.
5. Apply a coupon code, if available, to get a discount.
6. Proceed to checkout and choose between cash on delivery or Stripe payment.
7. Complete the payment process and place your order.
8. Enjoy your shopping experience!

## API Endpoints

# Auth
- `localhost:5000/api/v1/auth/signup` (post): sign up.
- `localhost:5000/api/v1/auth/signin` (post): sign in.

# user
- `localhost:5000/api/v1/user?page=1` (GET): Get a list of all users.
- `localhost:5000/api/v1/user` (post): add user.
- `localhost:5000/api/v1/user/id` (GET): get spcific user.
- `localhost:5000/api/v1/user/id` (put): update user.
- `localhost:5000/api/v1/user/id` (delete): delete user.
# Category
- `localhost:5000/api/v1/category?page=1` (GET): Get a list of all categories.
- `localhost:5000/api/v1/category` (post): add category.
- `localhost:5000/api/v1/category/id` (GET): get spcific category.
- `localhost:5000/api/v1/category/id` (put): update category.
- `localhost:5000/api/v1/category/id` (delete): delete category.

# subCategory
- `localhost:5000/api/v1/subCategory?page=1` (GET): Get a list of all subCategories.
- `localhost:5000/api/v1/subCategory` (post): add subCategory.
- `localhost:5000/api/v1/subCategory/id` (GET): get spcific subCategory.
- `localhost:5000/api/v1/subCategory/id` (put): update subCategory.
- `localhost:5000/api/v1/subCategory/id` (delete): delete subCategory.

# Brand
- `localhost:5000/api/v1/brand?page=1` (GET): Get a list of all brand.
- `localhost:5000/api/v1/brand` (post): add brand.
- `localhost:5000/api/v1/brand/id` (GET): get spcific brand.
- `localhost:5000/api/v1/brand/id` (put): update brand.
- `localhost:5000/api/v1/brand/id` (delete): delete brand.

# product
- `localhost:5000/api/v1/product?page=1` (GET): Get a list of all products.
- `localhost:5000/api/v1/product` (post): add product.
- `localhost:5000/api/v1/product/id` (GET): get spcific product.
- `localhost:5000/api/v1/product/id` (put): update product.
- `localhost:5000/api/v1/product/id` (delete): delete product.

# Review
- `localhost:5000/api/v1/review?page=1` (GET): Get a list of all review.
- `localhost:5000/api/v1/review` (post): add review.
- `localhost:5000/api/v1/review/id` (GET): get spcific review.
- `localhost:5000/api/v1/review/id` (put): update review.
- `localhost:5000/api/v1/review/id` (delete): delete review.

# wishlist
- `localhost:5000/api/v1/wishlist` (post): add wishlist.
- `localhost:5000/api/v1/wishlist/id` (put): update wishlist.
- `localhost:5000/api/v1/wishlist/id` (delete): delete wishlist.

# Address
- `localhost:5000/api/v1/address` (GET): Get a list of all wishlist.
- `localhost:5000/api/v1/address` (post): add wishlist.
- `localhost:5000/api/v1/address/id` (GET): get spcific wishlist.
- `localhost:5000/api/v1/address/id` (put): update wishlist.
- `localhost:5000/api/v1/address/id` (delete): delete wishlist.

# Coupon
- `localhost:5000/api/v1/coupon` (GET): Get a list of all coupon.
- `localhost:5000/api/v1/coupon` (post): add coupon.
- `localhost:5000/api/v1/coupon/id` (GET): get spcific coupon.
- `localhost:5000/api/v1/coupon/id` (put): update coupon.
- `localhost:5000/api/v1/coupon/id` (delete): delete coupon.

# cart 
- `localhost:5000/api/v1/cart` (post): add to cart.
- `localhost:5000/api/v1/cart/id` (delete): delete from cart.
- `localhost:5000/api/v1/cart/id` (post): set quantity.
- `localhost:5000/api/v1/cart/applyCouopn` (post): apply cioipon for discount.
- `localhost:5000/api/v1/cart` (get): get cart.

# order 

- `localhost:5000/api/v1/order/id` (post): cash order.
- `localhost:5000/api/v1/order/id` (get): get spcific order.
- `localhost:5000/api/v1/order` (get): get all order.
- `localhost:5000/api/v1/cart/applyCouopn` (post): apply cioipon for discount.
- `localhost:5000/api/v1/order/checkOutSession/id` (post): create checkout session.


## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes and push the branch to your forked repository.
5. Create a pull request, describing your changes in detail.








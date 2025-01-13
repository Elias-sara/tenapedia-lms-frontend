// src/pages/index.js
import React from "react";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

const HomePage = () => {
  return (
    <MainLayout>
      <section className="text-center mt-16">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Tenapedia!</h1>
        <p className="text-lg text-gray-600 mt-4">
          Your go-to platform for learning and growth.
        </p>
        <div className="mt-8">
          <Link href="/courses">
            <a className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Get Started
            </a>
          </Link>
        </div>
      </section>
      <section className="mt-16">
        <img src="/images/hero-image.jpg" alt="Learning" className="w-full h-auto object-cover" />
      </section>
    </MainLayout>
  );
};


export default HomePage;

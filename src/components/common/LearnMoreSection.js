// app/learn-more/page.js

const LearnMorePage = () => {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Learn More About Our Services
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          We provide comprehensive resources and support to help you excel in
          your medical education and professional exams. Explore the features
          and benefits we offer for healthcare professionals.
        </p>

        <div className="flex justify-center">
          <ul className="text-left max-w-2xl space-y-4">
            <li>
              ✅ Access to interactive practice questions and study guides
            </li>
            <li>
              ✅ Up-to-date resources tailored to medical and healthcare fields
            </li>
            <li>✅ Support from experienced professionals and educators</li>
            <li>✅ Personalized study recommendations and progress tracking</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LearnMorePage;

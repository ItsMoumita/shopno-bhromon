import React from "react";
import storyImg from "../../assets/travel-about.jpg"; 

const Story = () => {
  return (
    <section className="w-full bg-gray-50 dark:bg-[#19191e] py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 items-center gap-12">
        
        <div data-aos="fade-left" className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story ✨
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Founded in <span className="font-semibold text-[#4657F0]">2024</span>, 
            <span className="font-semibold text-[#4657F0]"> FlyPlane </span>
            was born from a simple idea: travel should be exciting, seamless, 
            and accessible to everyone. What started as a small, passionate 
            team quickly grew into a dedicated community of explorers, all 
            united by the love of adventure.
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            With years of experience in the travel industry, we’ve partnered 
            with global airlines, luxury resorts, and trusted local guides to 
            create journeys that go beyond ordinary vacations. From weekend 
            getaways to once-in-a-lifetime expeditions, our mission is to help 
            you discover the beauty of the world with confidence.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            At FlyPlane, travel isn’t just about reaching a destination—it’s 
            about the stories you collect, the people you meet, and the 
            memories you create along the way. Every trip we design is a 
            promise of fresh experiences, joy, and authenticity.
          </p>

          <button className="px-6 py-3 bg-[#4657F0] text-white rounded-md text-sm font-medium hover:bg-[#2f3fd9] transition">
            Discover More
          </button>
        </div>

        <div data-aos="fade-right" className="order-2 lg:order-1 h-[450px] overflow-hidden rounded-lg shadow-lg ">
          <img
            src={storyImg}
            alt="Our Story"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Story;
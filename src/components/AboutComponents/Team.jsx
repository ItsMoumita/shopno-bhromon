
import React from "react";

const teamMembers = [
  {
    name: "Abdul Karim",
    role: "Founder & CEO",
    img: "https://i.ibb.co.com/7fdS7LC/e692151bfc86c7d523697aa0dbd1a5d0.jpg", 
  },
  {
    name: "Sara Rahman",
    role: "COO",
    img: "https://i.ibb.co.com/sdCdJ9vc/24910f726e8e849d73ba395a584181f0.jpg",
  },
  {
    name: "Tanvir Hasan",
    role: "Travel Manager",
    img: "https://i.ibb.co.com/Xf8fLtV6/cc9435609bba31398e1cee1cbf611294.jpg",
  },
  {
    name: "Nusrat Jahan",
    role: "Marketing Lead",
    img: "https://i.ibb.co.com/Py9xDLb/6d98b0bc436d9db1bffc2ac80fb8a068.jpg",
  },
  {
    name: "Mehedi Alam",
    role: "Customer Support",
    img: "https://i.ibb.co.com/bgPVqGHF/44d11d9e2ffca9742460eaa51ace5d7e.jpg",
  },
];

const Team = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#12121c]">
      <div data-aos="zoom-in" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Meet the People Behind <span className="text-[#4657F0]">সপ্নভ্রমণ</span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate dreamers, travel enthusiasts, and dedicated professionals,
            working together to create unforgettable travel experiences for Bangladesh & the world 🌍
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:max-w-4xl lg:max-w-full mx-auto">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="block group">
              <div className="relative mb-6">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-40 h-40 rounded-full mx-auto object-cover border border-transparent group-hover:border-[#4657F0] dark:group-hover:border-[#2f3fd9] transition duration-500"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 text-center group-hover:text-[#4657F0] dark:group-hover:text-[#2f3fd9] transition duration-500">
                {member.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center block group-hover:text-gray-900 dark:group-hover:text-gray-100 transition duration-500">
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;


import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FancyButton from "../ExtraComponents/FancyButton";

export default function Contact() {
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      Swal.fire("Please fill all fields", "", "warning");
      return;
    }

    try {
      setSubmitting(true);
      // Try to post to your backend contact endpoint (create one if needed)
      await axiosSecure.post("/api/contact", {
        name: form.name,
        email: form.email,
        message: form.message,
      });

      Swal.fire("Message sent!", "We'll get back to you soon.", "success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      // If backend not available, still inform user (optional)
      Swal.fire("Failed to send message", "Please try again later.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-[#12121c] py-12 px-4">
         <h1 data-aos="zoom-in" className="text-4xl md:text-5xl text-center font-extrabold text-gray-900 dark:text-white mb-3">
                <span className="text-[#4657F0]">Contact</span> Us
              </h1>
              <p data-aos="zoom-in" className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Feel free to contact us any time. We will get back to you as soon
                as we can!
              </p>
      <div data-aos="zoom-in" className="max-w-6xl mx-auto relative">
      
        <div className="bg-white dark:bg-[#0b0b12] rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Form */}
            <div className="p-8 md:p-12">
             

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-0 placeholder-gray-400 resize-none"
                    placeholder="Write your message..."
                    required
                  />
                </div>

                {/* <button
                  type="submit"
                  disabled={submitting}
                  className="mt-4 inline-block w-full md:w-40 py-2 bg-gray-900 text-white rounded-md font-semibold hover:bg-[#111827] transition disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send"}
                </button> */}
                <FancyButton label= {submitting ? "Sending..." : "Send"}   onClick={handleSubmit} />
              </form>
            </div>

            {/* Right: Info card */}
            <div className="relative bg-gray-900 text-white p-8 md:p-12">

              <h3 className="text-2xl font-bold mb-4">Info</h3>

              <div className="space-y-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/10 rounded">
                    <AiOutlineMail className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-sm">Email</div>
                    <div className="font-medium">shopno@bhromon.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/10 rounded">
                    <AiOutlinePhone className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-sm">Phone</div>
                    <div className="font-medium">+880 1234 567890</div>
                  </div>
                </div>

                {/* <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/10 rounded">
                    <HiOutlineLocationMarker className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-sm">Address</div>
                    <div className="font-medium">14 Greenroad St., Dhaka</div>
                  </div>
                </div> */}

                <div className="flex items-center gap-3">
                  <span className="p-2 bg-white/10 rounded">
                    <AiOutlineClockCircle className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-sm">Hours</div>
                    <div className="font-medium">09:00 - 18:00 (Mon - Fri)</div>
                  </div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>  
    </section>
  );
}
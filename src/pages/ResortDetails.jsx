
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaStarHalfAlt } from "react-icons/fa";

import {
    FaMapMarkerAlt,
    FaStar,
    FaWifi,
    FaDumbbell,
    FaParking,
    FaUtensils,
    FaSwimmingPool,
} from "react-icons/fa";
import {
    MdBeachAccess,
    MdFreeBreakfast,
    MdSpa,
    MdOutlineAccessTime,
} from "react-icons/md";
import Loading from "../components/ExtraComponents/Loading";
import FancyButton from "../components/ExtraComponents/FancyButton";
import CustomButton from "../components/ExtraComponents/CustomButton";

// Map amenity names to icons (optional for badges)
const amenityIcon = (name) => {
    const map = {
        "Free WiFi": <FaWifi className="text-[#4657F0]" />,
        "Swimming Pool": <FaSwimmingPool className="text-[#4657F0]" />,
        Spa: <MdSpa className="text-[#4657F0]" />,
        "Breakfast Included": <MdFreeBreakfast className="text-[#4657F0]" />,
        "Fitness Center": <FaDumbbell className="text-[#4657F0]" />,
        "Beach Access": <MdBeachAccess className="text-[#4657F0]" />,
        Parking: <FaParking className="text-[#4657F0]" />,
        Restaurant: <FaUtensils className="text-[#4657F0]" />,
    };
    return map[name] || <FaUtensils className="text-[#4657F0]" />;
};

export default function ResortDetails() {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [resort, setResort] = useState(null);
    const [selectedImg, setSelectedImg] = useState("");

    useEffect(() => {
        const fetchResort = async () => {
            try {
                const res = await axiosSecure.get(`/api/resorts/${id}`);
                setResort(res.data);
                setSelectedImg(res.data?.coverImage || "");
            } catch (err) {
                console.error("Error fetching resort:", err);
            }
        };
        fetchResort();
    }, [axiosSecure, id]);

    if (!resort) {
        return <Loading></Loading>;
    }

    const {
        name,
        location,
        coverImage,
        gallery = [],
        pricePerNight,
        roomTypes = [],
        totalRooms,
        checkIn,
        checkOut,
        amenities = [],
        rating,
        availability,
        policies = {},
        description,
    } = resort;

    const images = [coverImage, ...gallery].filter(Boolean);
    const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
        location || ""
    )}&output=embed`;

    // Inline Animated Badge (Sera UI style), no external component
    const badgeColors = [
        "via-pink-500",
        "via-indigo-500",
        "via-emerald-500",
        "via-cyan-500",
        "via-amber-500",
        "via-purple-500",
    ];
    const AnimatedBadge = ({ text, icon, color = "via-sky-500" }) => (
        <div
            className={`rounded-full p-[1px] bg-gradient-to-r from-transparent ${color} to-transparent [background-size:400%_100%]`}
            style={{ animation: "move-bg 8s linear infinite" }}
        >
            <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0a091e] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent">
                {icon}
                <span>{text}</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] py-8 px-4">
            {/* Keyframes for animated gradient */}
            <style>
                {`
          @keyframes move-bg {
            to { background-position: 400% 0; }
          }
        `}
            </style>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Left: Main image + thumbnails */}
                <div>
                    <div className="rounded-xl overflow-hidden shadow-md bg-white dark:bg-[#1b1b2b]">
                        <img
                            src={selectedImg || coverImage}
                            alt={name}
                            className="w-full h-[360px] md:h-[500px] object-cover"
                        />
                    </div>
                    {images.length > 1 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImg(img)}
                                    className={`rounded-lg overflow-hidden border ${selectedImg === img ? "border-[#4657F0]" : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`thumb-${i}`}
                                        className="w-full h-20 object-cover hover:opacity-90"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Info card with Amenities badges & CTA */}
                <div className="bg-white dark:bg-[#1b1b2b] rounded-xl shadow-md p-6 flex flex-col gap-4">
                    <div className=" items-start space-y-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            {name}
                        </h1>
                        <div className="flex gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => {
                                if (rating >= i + 1) {
                                    return <FaStar key={i} />;
                                } else if (rating > i && rating < i + 1) {
                                    return <FaStarHalfAlt key={i} />;
                                } else {
                                    return <FaRegStar key={i} />;
                                }
                            })}
                        </div>

                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FaMapMarkerAlt className="text-[#4657F0]" />
                        <span>{location}</span>
                    </div>

                    <div className="flex items-end gap-2">
                        <p className="text-2xl font-extrabold text-[#4657F0]">
                            ৳{(pricePerNight || 0).toLocaleString()}
                        </p>
                        <span className="text-gray-500 dark:text-gray-400">/ night</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <MdOutlineAccessTime className="text-[#4657F0]" />
                            <span>
                                <strong>Check-in:</strong> {checkIn || "-"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MdOutlineAccessTime className="text-[#4657F0]" />
                            <span>
                                <strong>Check-out:</strong> {checkOut || "-"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${availability ? "bg-green-500" : "bg-red-500"}`} />
                            <span className="font-medium">
                                {availability ? "Available" : "Sold Out"}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[#4657F0] font-bold">Rooms:</span>
                            <span>{totalRooms || "-"}</span>
                        </div>
                    </div>

                    {/* Amenities as animated badges (inside right card) */}
                    {amenities.length > 0 && (
                        <div className="pt-2 mb-6 md:mb-12">
                            <h3 className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">
                                Amenities
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {amenities.map((a, i) => (
                                    <AnimatedBadge
                                        key={`${a}-${i}`}
                                        text={a}
                                        icon={amenityIcon(a)}
                                        color={badgeColors[i % badgeColors.length]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA button below badges */}
                    <CustomButton label="Book Resort" link="#" />
                </div>
            </div>

            {/* Below sections */}
            <div className="max-w-6xl mx-auto px-0 md:px-2 mt-10 space-y-8">
                {/* Overview (optional) */}
                {description && (
                    <section className="bg-white dark:bg-[#1b1b2b] p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Overview</h2>
                        <p className="text-gray-700 dark:text-gray-300">{description}</p>
                    </section>
                )}

                {/* Room Types */}
                {roomTypes.length > 0 && (
                    <section className="bg-white dark:bg-[#1b1b2b] p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-[#4657F0]">Room Types</h2>
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                            {roomTypes.map((room, idx) => (
                                <div
                                    key={idx}
                                    className="border border-[#4657F0] hover:shadow hover:shadow-[#4657F0] rounded-lg p-4 dark:border-gray-700 bg-gray-50 dark:bg-transparent"
                                >
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                        {room.type}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                                    </p>
                                    <p className="text-[#4657F0] font-bold mt-2 mb-6">
                                        ৳{Number(room.price || 0).toLocaleString()} / night
                                    </p>

                                    <CustomButton label="Reserve" link="#" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Policies styled like Itinerary (left accent list) */}
                <section className="bg-white dark:bg-[#1b1b2b] p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Policies</h2>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        {policies.cancellation && (
                            <li className="border-l-4 border-[#4657F0] pl-3">
                                <strong>Cancellation:</strong> {policies.cancellation}
                            </li>
                        )}
                        {policies.children && (
                            <li className="border-l-4 border-[#4657F0] pl-3">
                                <strong>Children:</strong> {policies.children}
                            </li>
                        )}
                        {policies.pets && (
                            <li className="border-l-4 border-[#4657F0] pl-3">
                                <strong>Pets:</strong> {policies.pets}
                            </li>
                        )}
                        {!policies.cancellation && !policies.children && !policies.pets && (
                            <li className="border-l-4 border-[#4657F0] pl-3">No policies provided.</li>
                        )}
                    </ul>
                </section>

                {/* Embedded Google Map (no external link button) */}
                <section className="bg-white dark:bg-[#1b1b2b] p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Location Map</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{location}</p>
                    <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden border border-[#4657F0]">
                        <iframe
                            src={mapsEmbed}
                            title="Resort Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
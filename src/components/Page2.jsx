import React, { useState } from 'react'

const CourseCard = ({ title, description, icon, duration, students, rating, price }) => {
    const [isHovered, setIsHovered] = useState(false)

    const getHeaderBackground = (title) => {
        if (title === "Web Development") {
            return {
                backgroundImage: 'url(/images/image.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        }
        return {
            background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))'
        }
    }

    return (
        <div
            className="relative rounded-2xl transition-all duration-300 h-[700px] w-full flex flex-col"
            style={{
                background: 'var(--glass-gradient)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Course Header */}
            <div className="relative h-52 rounded-t-2xl p-6 overflow-hidden flex-shrink-0"
                style={getHeaderBackground(title)}>
                {/* Decorative elements */}
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute right-0 top-0 h-full w-48 bg-white/5 transform skew-x-12"></div>
                <div className="absolute right-20 top-0 h-full w-32 bg-white/5 transform skew-x-12"></div>

                {/* Content */}
                <div className="relative flex justify-between items-start">
                    <div className="space-y-4">
                        <div className="relative inline-block">
                            <span className="text-6xl"
                            >
                                {icon}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="bg-black/30 px-3 py-1 rounded-full text-white text-sm">
                                {duration}
                            </div>
                            <div className="bg-black/30 px-3 py-1 rounded-full text-white text-sm flex items-center">
                                <span className="mr-1">⭐</span> {rating}
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl">
                        <div className="text-2xl font-bold text-white">{price}</div>
                        <div className="text-xs text-white/80">per month</div>
                    </div>
                </div>
            </div>

            {/* Rest of the card content remains unchanged */}
            <div className="p-8 flex-grow flex flex-col justify-between" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-color)' }}>
                        {title}
                    </h3>

                    <p className="mb-6 leading-relaxed line-clamp-3" style={{ color: 'var(--text-color-secondary)' }}>
                        {description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center justify-between mb-8 p-4 rounded-xl"
                        style={{ backgroundColor: 'var(--secondary-color)' }}>
                        <div className="flex items-center" style={{ color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                                </path>
                            </svg>
                            <span className="font-medium">{students}</span>
                            <span className="text-sm ml-1" style={{ color: 'var(--text-color-secondary)' }}>enrolled</span>
                        </div>
                        <div className="h-8 w-px" style={{ backgroundColor: 'var(--border-color)' }}></div>
                        <div className="flex items-center" style={{ color: 'var(--text-color)' }}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path>
                            </svg>
                            <span className="font-medium">{duration}</span>
                        </div>
                    </div>

                    {/* Course Features */}
                    <div className="space-y-3 mb-8">
                        {['Live Online Classes', 'Industry Expert Instructors', 'Certification Included'].map((feature, index) => (
                            <div key={index}
                                className="flex items-center p-3 rounded-lg transition-colors duration-300"
                                style={{
                                    backgroundColor: 'var(--secondary-color)',
                                    color: 'var(--text-color)'
                                }}>
                                <svg className="w-5 h-5 mr-3" style={{ color: 'var(--primary-glow)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <button
                        className="py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))',
                            color: 'var(--text-color)'
                        }}
                        data-magnetic data-strength="0.15">
                        Enroll Now
                    </button>
                    <button
                        className="py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                        style={{
                            backgroundColor: 'var(--secondary-color)',
                            color: 'var(--text-color)',
                            border: '1px solid var(--border-color)'
                        }}
                        data-magnetic data-strength="0.15">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

const Page2 = () => {
    const courses = [
        {
            title: "Web Development",
            description: "Master modern web development with hands-on experience in HTML, CSS, JavaScript, and React. Build real-world projects and launch your developer career.",
            icon: "💻",
            duration: "6 months",
            students: "2,543",
            rating: "4.9",
            price: "$99"
        },
        {
            title: "Graphics Design",
            description: "Learn professional graphic design skills using industry-standard tools. Create stunning visuals, master branding, and build a professional portfolio.",
            icon: "🎨",
            duration: "4 months",
            students: "1,876",
            rating: "4.8",
            price: "$89"
        },
        {
            title: "Professional Accounting",
            description: "Comprehensive accounting program covering financial statements, taxation, and business finance. Get ready for professional certification.",
            icon: "📊",
            duration: "8 months",
            students: "1,234",
            rating: "4.7",
            price: "$129"
        }
    ]

    return (
        <div className="min-h-screen py-16 page2">
            <div className="page2container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 anton">
                        Transform Your Career with
                        <span className="block" style={{ color: 'var(--text-color-secondary)' }}> Professional <span className='text-[var(--gradient-glow)]'>Courses</span></span>
                    </h1>
                    <p className="text-xl mb-8" style={{ color: 'var(--text-color-secondary)' }}>
                        Learn from industry experts and master the skills that matter in today's job market
                    </p>
                </div>

                {/* Course Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page2

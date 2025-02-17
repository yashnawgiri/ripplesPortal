/* eslint-disable max-len */

import "@/styles/home/dashboardCard.css";
import dashboardImage from "@/assets/images/benefitsSectionImage.png";
import dashboardData from "@/data/shopperLanding.json";

import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { BenefitSectionIcons } from './../icons';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, ease: "easeInOut" },
    },
};

const BenefitsSection = () => {
    return (
        <>
            <motion.div
                className="home-div2 md:py-8 py-2 px-4"
                id="about"
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 py-4 text-center text-3xl md:text-5xl font-bold">
                    {dashboardData.benefitsSection.heading}
                </h1>
            </motion.div>

            <div className="dashboardCardContainer flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:px-20">
                {/* Card Grid */}
                <motion.div
                    className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full flex-1"
                    initial="hidden"
                    variants={containerVariants}
                    viewport={{ once: false, amount: 0.2 }} // Trigger animation on scroll
                    whileInView="visible"
                >
                    {dashboardData.benefitsSection.data.map((item, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <Card item={item} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Image Section */}
                <motion.div
                    className="flex-1 home-img w-full md:w-full flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                >
                    <Image
                        disableSkeleton
                        className="my-4 rounded-lg shadow-lg hidden md:block"
                        height="fit"
                        src={dashboardImage}
                        width="w-1/2"
                        loading="lazy"
                        alt="GoRipples dashboard interface showcasing analytics and features"
                    />
                </motion.div>
            </div>
        </>
    );
}

type CardProps = {
    item: {
        icon: number;
        title: string;
        description: string;
    };
};

function Card({ item }: CardProps) {
    return (
        <motion.div
            key={item.icon}
            className="bg-primary shadow-lg rounded-lg p-6 flex flex-col items-center md:items-start text-center hover:shadow-2xl transform transition-all duration-300 ease-in-out"
            whileHover={{
                scale: 1.05,
                rotate: 1,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex flex-col items-center md:items-start mb-4">
                <BenefitSectionIcons icon={item.icon} aria-label={`Benefit Icon ${item.icon}`} />
                <h1 className="text-lg md:text-xl font-semibold md:text-start text-white mt-2">
                    {item.title}
                </h1>
            </div>
            <p className="cardDescription text-sm md:text-base text-gray-300 md:text-start">
                {item.description}
            </p>
        </motion.div>
    );
}

export default BenefitsSection;
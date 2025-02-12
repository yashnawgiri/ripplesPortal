/* eslint-disable max-len */
import { Image } from "@nextui-org/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import dashboardData from '@/data/shopperLanding.json';
import CustomButton from "@/components/CustomElements/CustomButton";
import { siteConfig } from "@/config/site";
import bottomSectionImage from "@/assets/images/bottomSectionImage.png";

// Preload LCP image
const preloadImage = () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = bottomSectionImage;
    document.head.appendChild(link);
};

function BottomSection() {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.05
    });
    const controls = useAnimation();

    useEffect(() => {
        preloadImage();
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    // Simplified animation variants for better performance
    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        },
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2, delay: 0.1 }
        },
    };

    const imageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
    };

    return (
        <div ref={ref} className="homeContainer" id="home">
            <motion.div
                animate={controls}
                className="home-div"
                initial="hidden"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                }}
            >
                <motion.h1 className="home-h1 home-heading" variants={headingVariants}>
                    {dashboardData.bottomSection.heading}
                </motion.h1>

                <motion.div
                    animate={controls}
                    className="home-img-mob md:hidden"
                    initial="hidden"
                    variants={imageVariants}
                    style={{
                        overflow: "hidden",
                        borderRadius: "24px",
                        boxShadow: "0 20px 70px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    <div className="mt-8">
                        <Image
                            alt="GoRipples dashboard interface showcasing analytics and features - mobile view"
                            className="blur-load"
                            height={300}
                            width={300}
                            loading="lazy"
                            src={bottomSectionImage}
                            srcSet={`${bottomSectionImage} 1x, ${bottomSectionImage.replace(".png", ".webp")} 2x`}
                            disableSkeleton={true}
                            style={{
                                objectFit: "contain",
                                objectPosition: "center",
                                maxWidth: "100%",
                                height: "auto",
                            }}
                            radius="lg"
                            aria-label="GoRipples dashboard interface showcasing analytics and features - mobile view"
                        />
                    </div>
                </motion.div>

                <motion.div className="home-demo-div" variants={descriptionVariants}>
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <CustomButton
                            className="font-bold bg-custom-gradient md:text-2xl text-xl"
                            onClick={() => navigate(siteConfig.path.signIn)}
                            ariaLabel="Sign-In"
                        >
                            {dashboardData.bottomSection.button}
                        </CustomButton>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                animate={controls}
                className="home-img hidden md:block"
                initial="hidden"
                variants={imageVariants}
                style={{
                    overflow: "hidden",
                    borderRadius: "32px",
                    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)"
                }}
            >
                <div className="mt-8">
                    <Image
                        alt="GoRipples dashboard interface showcasing analytics and features"
                        className="my-4"
                        height={1200}
                        width={1200}
                        loading="lazy"
                        style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            maxWidth: "100%",
                            height: "auto",
                            transform: "scale(1.15)"
                        }}
                        radius="lg"
                        src={bottomSectionImage}
                        aria-label="GoRipples dashboard interface showcasing analytics and features"
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default BottomSection;

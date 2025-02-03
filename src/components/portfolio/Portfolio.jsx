import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.png",
    title: "Award-Winning Website",
    desc: "I designed and developed an award-winning website utilizing React.js, Tailwind CSS, and GSAP to create a seamless, interactive user experience. Drawing inspiration from zentry.com, I delivered a visually stunning and highly functional site that effectively engages visitors and showcases the potential of modern web development technologies.",
    link: "https://award-winning-website-flame.vercel.app/",
  },
  {
    id: 2,
    img: "/p2.png",
    title: "Creative Hive",
    desc: "I developed and launched an interactive 3D art gallery from scratch, leveraging essential concepts such as scene creation, camera setup, renderer development, geometry, material and texture creation, meshing, animation, and controls. Additionally, I implemented real-time UI configuration using a GUI debugger, ensuring a dynamic and immersive user experience.",
    link: "https://creavtive-hive.vercel.app/",
  },
  {
    id: 3,
    img: "/p3.png",
    title: "3D Apple Iphone Landing Page",
    desc: "I designed a visually appealing landing page for the Apple iPhone 14 Pro Max, incorporating a 3D model rendered with Three.js and dynamic scrolling animations powered by GSAP. By utilizing various libraries within a React application, I created a unique and engaging user experience that showcases the product in an innovative way.",
    link: "https://3d-landing-page-for-iphone-psharnifv-wwylie-q.vercel.app/",
  },
  {
    id: 4,
    img: "/p4.png",
    title: "Reeces Creek 3D Pacman",
    desc: "3D recreation of the classic Pac-Man game, built using React.js and Three.js. This modern twist on the arcade classic brings Pac-Man to life in a dynamic, immersive environment, leveraging the power of Three.js for 3D rendering and React.js for smooth interactivity. Players navigate the maze, avoid ghosts, and collect pellets—all in a visually enhanced 3D space.",
    link: "https://reeces-creek-3d.vercel.app/",
  },
  {
    id: 5,
    img: "/p5.png",
    title: "Mojo Caster",
    desc: " I built and deployed an interactive 3D game utilizing React.js and Three.js. The project involved creating immersive environments, developing engaging gameplay mechanics, and ensuring smooth performance. By combining the strengths of these powerful technologies, I delivered a dynamic gaming experience that captivates and entertains users. ",
    link: "https://mojo-gules.vercel.app/",
  },
];

const imgVariants = {
  initial: {
    x: -500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  initial: {
    x: 500,
    y: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      staggerChildren: 0.05,
    },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();

  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt="" />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  const [containerDistance, setContainerDistance] = useState(0);
  const ref = useRef(null);

  // useEffect(() => {
  //   if (ref.current) {
  //     const rect = ref.current.getBoundingClientRect();
  //     setContainerDistance(rect.left);
  //   }
  // }, []);

  // FIX: Re-calculate when screen size changes
  useEffect(() => {
    const calculateDistance = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setContainerDistance(rect.left);
      }
    };

    calculateDistance();

    window.addEventListener("resize", calculateDistance);

    return () => {
      window.removeEventListener("resize", calculateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref });

  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={ref}>
      <motion.div className="pList" style={{ x: xTranslate }}>
        <div
          className="empty"
          style={{
            width: window.innerWidth - containerDistance,
            // backgroundColor: "pink",
          }}
        />
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>
      <section />
      <section />
      <section />
      <section />
      <section />
      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;

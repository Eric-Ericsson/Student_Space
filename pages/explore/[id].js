import LayoutCover from "@components/components/layout/LayoutCover";
import { useRouter } from "next/router";

const Expore = () => {
  const route = useRouter();

  const media = [
    {
      id: 'step-into-the-world-of-artificial-intelligence',
      title: "Artificial Intelligence",
      username: "Eric Ericsson",
      image: "/ai.jpg",
      data: "Step into the world of Artificial Intelligence!<p>Artificial Intelligence, or AI, is reshaping the way we interact with technology and revolutionizing industries across the globe. It's not just a concept from sci-fi movies anymore – it's a reality that is transforming our lives in profound ways.</p><p>At the forefront of innovation, AI is a powerful tool that enables machines to learn from experience, adapt to new inputs, and perform tasks that typically require human intelligence. From chatbots that engage in natural language conversations to recommendation systems that suggest personalized content, AI is enhancing our daily experiences in unimaginable ways.</p><p>One of the most exciting aspects of AI is its potential to revolutionize industries. In healthcare, AI is being used to diagnose diseases, analyze medical data, and improve patient outcomes. In finance, AI-powered algorithms are optimizing trading strategies and detecting fraudulent activities. The automotive industry is embracing self-driving cars, made possible by AI technologies. And in agriculture, AI is helping farmers optimize crop yield and manage resources more efficiently.</p><p>But AI is not just about advanced technologies – it's about solving real-world problems and making a positive impact on society. From addressing climate change to advancing scientific research, AI is playing a crucial role in tackling global challenges.</p><p>However, with great power comes great responsibility. As AI becomes more prevalent in our lives, ethical considerations become paramount. Ensuring that AI systems are transparent, fair, and unbiased is essential to build trust and ensure a responsible AI ecosystem.</p><p>As an AI enthusiast, I am passionate about exploring the vast possibilities that AI has to offer. Through continuous research and development, I strive to create AI models and applications that push the boundaries of innovation and make a positive difference in people's lives.</p><p>Join me on this journey into the world of AI. Discover how AI is transforming industries, empowering businesses, and enriching our lives. Explore my <a href='/' target='_blank' style='color: blue'>profile</a> to stay updated on the latest AI advancements and be a part of the AI revolution!</p>Embrace the future of Artificial Intelligence – a world of endless possibilities and limitless potential. Let's shape a brighter tomorrow together!",
      date: "28th February, 2023",
    },
    {
      id: 'i-am-thrilled-to-share-my-passion',
      title: "Fashionist",
      username: "Ruth Doe",
      image: "/fashion.jpg",
      data: "Hello, I'm a fashionistas! I'm thrilled to share my passion for all things style and trends. Fashion is an ever-evolving art form that allows us to express our individuality and creativity. From classic elegance to bold statements, fashion empowers us to be confident in who we are. <p>With the rise of sustainable fashion, we see a beautiful fusion of style and conscience. Ethical choices in the industry are becoming more prevalent, and eco-friendly materials are taking center stage. It's exciting to witness the transformation towards a more environmentally responsible fashion landscape.</p> <p>Moreover, technology and fashion are becoming fast friends. With the integration of wearable tech, our clothing now serves more than just aesthetic purposes. Smartwatches, fitness trackers, and even light-up fabrics are revolutionizing the way we interact with our clothes.</p><p>As a fashion enthusiast, I love to explore different cultures' fashion heritage and take inspiration from various eras. From the timeless elegance of vintage fashion to the futuristic designs on fashion runways, there's always something new and exciting to explore.</p> <p>If you're as passionate about fashion as I am, let's connect! Check out my <a href='/' target='_blank' style='color: blue'>profile</a> to see my latest fashion endeavors and let's stay in touch!</p>",
      date: "14th May, 2023",
    },
    {
      id: 'welcome-to-my-world-of-creativity-and-inspiration',
      title: "Art and Design",
      username: "Michael Smith",
      image: "/art_design.jpg",
      data: "Welcome to my world of creativity and inspiration. Art and design are the essence of human expression, allowing us to communicate emotions, ideas, and stories in captivating ways.<p>From mesmerizing paintings to innovative graphic designs, art touches our souls and sparks our imagination. It transports us to different dimensions and opens our minds to new possibilities. Each brushstroke, line, and color choice carries a profound meaning, making art a powerful reflection of the human experience.</p><p>Design, on the other hand, blends functionality and aesthetics seamlessly. Whether it's the sleek lines of modern architecture or the intuitive user interface of a website, design enhances our daily lives and experiences. It bridges the gap between beauty and practicality, creating spaces and products that bring joy and convenience to our routines.</p><p>Art and design are not confined to galleries and studios; they are an integral part of our surroundings. From the breathtaking sculptures in public spaces to the carefully curated book covers, creativity is all around us, inspiring us every day.</p><p>Moreover, technology is revolutionizing the art and design landscape, enabling artists and designers to experiment with new mediums and techniques. Virtual reality art exhibitions and interactive installations immerse us in novel artistic experiences like never before.</p><p>If you're as captivated by the world of art and design as I am, let's connect! Check out my <a href='/' target='_blank' style='color: blue'>profile</a> to explore my artistic journey and let's embark on a creative adventure together!</p>",
      date: "9th April, 2023",
    },
    {
      id: 'creative-writing-is-a-magical-journey-that-takes-us',
      title: "Creative Writing",
      username: "Patrick Akoto",
      image: "/creative_writing.jpg",
      data: "Hello, fellow wordsmiths and literary dreamers! Welcome to the world of boundless imagination and storytelling. Creative writing is a magical journey that takes us to places only our minds can conceive, where characters come alive, and emotions weave an enchanting tapestry.<p>In the realm of creative writing, we wield the power of words to paint vivid landscapes, evoke profound emotions, and ignite the spark of curiosity within our readers. Each sentence is carefully crafted, like a brush on a canvas, to create a symphony of thoughts and feelings that resonate with the human soul.</p><p>From poetry that dances with metaphors to prose that unfurls like an epic adventure, creative writing captures the essence of the human experience in all its complexities. It is a realm where dreams merge with reality, where the ordinary transforms into the extraordinary, and where the impossible becomes possible.</p><p>Through creative writing, we explore the depths of our hearts and minds, discovering our innermost thoughts and passions. It is a cathartic release that frees our imagination and allows us to express our deepest desires, fears, and joys.</p><p>Moreover, creative writing is a bridge that connects us across time and space. It unites generations, cultures, and languages, reminding us that the human experience is a shared tapestry of stories waiting to be told.</p><p>If you're as passionate about the art of creative writing as I am, let's embark on a literary adventure together! Explore my <a href='/' target='_blank' style='color: blue'>profile</a> to discover my world of storytelling and let's exchange tales that captivate the heart and mind.</p>",
      date: "23rd June, 2023",
    },
    {
      id: 'where-lines-of-code-build-bridges-between-imagination-and-reality',
      title: "Web Development",
      username: "Joe Quaye",
      image: "/web_development.jpg",
      data: "Greetings, fellow web developers and coding enthusiasts!<p>Welcome to the ever-evolving realm of web development, where lines of code build bridges between imagination and reality. In this digital landscape, we create the virtual wonders that power the modern world.</p><p>Web development is an art of its own, blending technical expertise with boundless creativity. It's a dance of HTML, CSS, and JavaScript, orchestrating stunning user interfaces and seamless interactions that captivate users.</p><p>With each keystroke, we shape the online experiences of millions, crafting intuitive websites, engaging applications, and immersive platforms. Web development is a journey of continuous learning, where we embrace new technologies and trends to stay at the forefront of innovation.</p><p>From responsive designs that adapt to every device to blazing-fast web applications that push the boundaries of performance, we breathe life into the digital canvas, making ideas come alive.</p><p>Web development is not merely a skill; it's a passion that drives us to build a better online world. We take pride in delivering seamless user experiences, accessible designs, and clean code that stands the test of time.</p><p>If you're as passionate about web development as I am, let's collaborate and create digital wonders together! Explore my <a href='/' target='_blank' style='color: blue'>profile</a> to discover my coding journey and let's connect to forge the future of the web.</p>Let's code and shape the digital landscape, one line at a time!",
      date: "10th March, 2023",
    },
    {
      id: 'data-science-about-understanding-the-context-and-painting-a-vivid-picture-with-data-driven',
      title: 'Data Science',
      data: "<p>Welcome to the captivating world of data science, where raw information transforms into valuable insights that shape decision-making and drive innovation. In this realm, we unlock the hidden patterns within data to unravel the secrets of the universe.</p><p>Data science is an alchemy of mathematics, statistics, and programming, blending analytical prowess with a creative spirit. It's a journey of discovery, where we extract knowledge from vast datasets and turn it into meaningful stories.</p><p>With each dataset we explore, we embark on a quest to uncover valuable trends, predict future outcomes, and solve complex problems. Data science is not just about numbers; it's about understanding the context and painting a vivid picture with data-driven storytelling.</p><p>From building predictive models that revolutionize industries to extracting insights that shape strategic decisions, we wield the power of data to drive change and make the world a better place.</p><p>Data science is an ever-evolving field, where we embrace challenges and constantly refine our skills to keep pace with the latest advancements. We are explorers of information, and curiosity fuels our quest for knowledge.</p><p>If you share the same passion for data science, let's embark on this thrilling journey together! Dive into my <a href='/' target='_blank' style='color: blue'>profile</a> to explore my data-driven endeavors and let's connect to unravel the mysteries hidden in the numbers.</p>Let's dive deep into the data ocean and unlock the power of insights!",
      username: "Mary Edger",
      image: "/data_science.jpg",
      date: "19th July, 2023",
    },
    {
      id: 'mobile-app-development-ideas-come-to-life-and-innovations',
      title: "Mobile App Development",
      username: "Kofi Asamoah",
      image: "/app_development.jpg",
      data: "Greetings, fellow mobile app enthusiasts!<p>Welcome to the dynamic world of mobile app development, where ideas come to life and innovations find their way into the palms of billions. In this vibrant landscape, we craft digital experiences that empower, entertain, and connect people around the globe.</p><p>Mobile apps have transformed the way we live, work, and play. From the moment we wake up to the minute we rest, these tiny yet powerful applications accompany us, making our lives more efficient, engaging, and enjoyable.</p><p>As mobile app developers, we are the architects of the digital era, shaping the future one line of code at a time. Whether it's crafting captivating user interfaces or building complex functionalities, we thrive on turning visions into reality.</p><p>With each app we create, we embark on a journey to revolutionize industries, disrupt traditional paradigms, and bring new possibilities to the fingertips of users. We are driven by a passion for innovation, constantly pushing boundaries and exploring the latest technologies.</p><p>Mobile app development is a harmonious symphony of creativity, problem-solving, and collaboration. We work hand-in-hand with designers, product managers, and stakeholders to create seamless and intuitive experiences that leave lasting impressions.</p><p>From iOS to Android, from native to cross-platform, we embrace the diversity of mobile platforms and languages. Our toolkit includes Java, Kotlin, Swift, React Native, Flutter, and more – all in pursuit of crafting exceptional apps that redefine user expectations.</p><p>If you share the same zeal for mobile app development, let's connect and embark on a journey of innovation. Explore my <a href='/' target='_blank' style='color: blue'>profile</a> to witness the magic of mobile apps and let's create digital wonders together!</p>Let's shape the mobile future and build experiences that touch lives across the globe!",
      date: "25th July, 2023",
    },
    {
      id: 'We-are-dedicated-to-providing-fast-efficient-and-reliable-solutions',
      title: "Delivery Service",
      username: "Ebenezer Annan",
      image: "/artist.png",
      data: "We are dedicated to providing fast, efficient, and reliable solutions to meet your delivery needs. Whether it's a last-minute gift for a loved one, essential groceries for your home, or important business documents, we've got you covered.</p><p>We understand the value of time and the importance of safe and prompt deliveries. That's why our team is committed to ensuring your packages reach their destination with care and precision. Our fleet of experienced delivery professionals is always on the move, ready to navigate through traffic and overcome any challenges to deliver your items on time.</p><p>With the rise of e-commerce and online shopping, the demand for delivery services has skyrocketed. Our goal is to streamline this process and make it hassle-free for both individuals and businesses. Whether you're a small business owner or a busy individual, we tailor our services to meet your unique requirements.</p><p>From the moment you entrust us with your package until it reaches its intended recipient, we take every step to ensure a seamless experience. Our state-of-the-art tracking system allows you to monitor the progress of your delivery in real-time, giving you peace of mind knowing exactly where your package is at any given moment.</p><p>Customer satisfaction is at the heart of our service. We go the extra mile to ensure that your delivery experience is not just smooth but also delightful. Our customer support team is available around the clock, ready to assist with any queries or concerns you may have.</p><p>With a focus on efficiency and reliability, we strive to set new standards in the delivery industry. As technology evolves, so do our services. We embrace innovation and leverage the latest advancements to optimize our operations and enhance the delivery process.</p><p>When you choose our delivery service, you're choosing more than just a service provider – you're choosing a partner in your delivery journey. Experience the convenience and efficiency of our delivery solutions today. Explore my <a href='/' target='_blank' style='color: blue'>profile</a> to learn more about how we're redefining delivery services.</p>Let's embark on a journey of prompt and secure deliveries, bringing convenience right to your doorstep!",
      date: '11th June, 2023',
    },
  ];
  return (
    <LayoutCover title={route.query.id}>
      {media.map(
        (slide, index) =>
          slide.id == route.query.id && (
            <div
              key={index}
              className="mx-[6%] md:mx-[10%] mb-24 md:mb-72 pt-28 text-center md:text-left"
            >
              <div className="mb-10 flex flex-col gap-2">
                <div>
                  <div
                    className="text-center md:text-left font-['playfair_Display'] text-[28px] font-black uppercase text-[#293a5a] sm:text-[32px] md:text-[40px] lg:text-[45px]"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                </div>
                <div>
                  <div
                    className="text-[20px] font-semibold text-gray-500"
                    dangerouslySetInnerHTML={{ __html: slide.date }}
                  />
                </div>
              </div>
                 <div
              className={`image-container mb-10`}>
                <img
                  src={slide.image}
                  alt="content-of-the-day"
                  className="imageClass"
                />
              </div>
              <div className="text-[18px] text-dark opacity-95">
                <div dangerouslySetInnerHTML={{ __html: slide.data }} />{" "}
              </div>
            </div>
          )
      )}
    </LayoutCover>
  );
};

export default Expore;

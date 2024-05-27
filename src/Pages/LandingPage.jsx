import { categoryOptions, quotesTopics } from "../StaticData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import blogImg from "../assets/books.png";
import jokeImg from "../assets/laughing.png";
import quoteImg from "../assets/fountain-pen.png";
import authorImg from "../assets/writer.png";
import { Link } from "react-router-dom";
import landingPageImg from "../assets/landingPageBanner.jpg";
import { Helmet } from "react-helmet";

const primaryFeatures = [
  {
    name: "Blogosphere",
    description:
      "Explore a diverse collection of thought-provoking blogs covering a wide range of topics. From technology to lifestyle, our blog page offers a blend of informative articles, personal reflections, and expert opinions to satisfy every reader's curiosity.",
    href: "#",
    icon: blogImg,
    path: "/blogs",
  },
  {
    name: "Quote Corner",
    description:
      "Seeking inspiration and motivation? Discover profound wisdom and timeless truths on our quotes page. Immerse yourself in a collection of insightful quotes from renowned thinkers, philosophers, and visionaries, empowering you to embrace life's journey with courage and optimism.",
    href: "#",
    icon: quoteImg,
    path: "/quotes",
  },
  {
    name: "Meet Our Authors",
    description:
      "Meet the brilliant minds behind our captivating content! Our authors page introduces you to a talented community of writers, each with a unique voice and perspective. From seasoned professionals to emerging talents, explore the diverse backgrounds and literary styles of our esteemed authors.",
    href: "#",
    icon: authorImg,
    path: "/authors",
  },
];

const LandingPage = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
    }),
    AutoScroll(),
  ]);
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
    }),
    AutoScroll(),
  ]);

  useEffect(() => {
    if (emblaApi) {
      // console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div>
      <Helmet>
        <title>Inspiration Avenue</title>
        <meta
          name="description"
          content="Discover diverse insights and motivation."
        />
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 lg:gap-x-24 py-4 sm:py-20 ">
        <div className="space-y-8">
          <h1 className="text-24size text-center sm:text-left font-bold tracking-tight text-gray-900 sm:text-4xl">
            InsightHub Your Gateway to Knowledge and Inspiration
          </h1>
          <img
            src={landingPageImg}
            loading="lazy"
            alt="banner"
            className="block lg:hidden rounded-md"
          />
          <p className="text-justify sm:text-pretty">
            <b className="text-5xl float-left text-gray-900">W</b>elcome to
            InsightHub, your comprehensive platform for discovering knowledge,
            inspiration, and entertainment. Explore a vibrant ecosystem of
            blogs, jokes, quotes, and talented authors, curated to enlighten,
            entertain, and enrich your life. Whether you're seeking insightful
            articles, humorous anecdotes, profound wisdom, or discovering new
            voices, InsightHub is your go-to destination. Join our community of
            curious minds and embark on a journey of learning, laughter, and
            discovery with InsightHub.
          </p>
        </div>
        <div className="hidden lg:block">
          <img src={landingPageImg} alt="banner" className=" rounded-md" />
        </div>
      </div>
      <div className="my-16 sm:my-24 space-y-2">
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl text-center">
          Explore Blogs by Category
        </h2>
        <div className="embla py-6" ref={emblaRef}>
          <div className="embla__container">
            {categoryOptions.map((category, index) => (
              <div
                className="embla__slide border rounded-md shadow-sm text-center py-4 group/slide hover:border-slate-200 bg-white flex items-center gap-3 justify-center"
                key={index}
              >
                <img
                  src={category.img}
                  alt=""
                  className="h-8 w-8 sm:h-12 sm:w-12"
                />
                <span className="text-gray-900 group-hover/slide:text-slate-900 group-hover/slide:scale-100 font-700 tracking-wide text-14size sm:text-24size">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6 discover full-bleed py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Discover Your Ideas & Creativity
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-800 text-justify sm:text-center">
            Discover diverse topics from sports to tech and beyond in our
            engaging <b className="text-indigo-600">blogs</b>, Inspiration
            awaits! Explore our curated{" "}
            <b className="text-indigo-600">quotes</b> for daily motivation.
          </p>
        </div>
        <div className="py-6">
          <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {primaryFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex flex-col shadow-sm border rounded-md p-3 bg-gray-50 space-y-3"
              >
                <dt className="text-20size font-semibold leading-7 text-slate-900">
                  <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-xl bg-slate-50">
                    <img
                      src={feature.icon}
                      alt="cover-img"
                      className="h-10 w-10"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-black">
                  <p className="flex-auto text-justify sm:text-pretty leading-6">
                    {feature.description}
                  </p>
                  <p className="mt-4">
                    <Link
                      to={feature.path}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="my-16 sm:my-24 space-y-2">
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl text-center">
          Explore Quotes by Topics
        </h2>
        <div className="embla py-6" ref={emblaRef2}>
          <div className="embla__container">
            {quotesTopics.map((category, index) => (
              <div
                className="embla__slide border rounded-md shadow-sm text-center py-4 group/slide hover:border-slate-200 bg-white flex items-center gap-3 justify-center"
                key={index}
              >
                <img
                  src={category.img}
                  alt=""
                  className="h-8 w-8 sm:h-12 sm:w-12"
                />
                <span className="text-gray-900 group-hover/slide:text-slate-900 group-hover/slide:scale-100 font-700 tracking-wide text-14size sm:text-24size">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import Social from "@components/Social";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";

const About = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title, image, social } = frontmatter;

  return (
    <section className="section">
      <div className="container text-center">
        <span className="flex">
          {image && (
            <div className="img-cover mb-6 ml-20">
              <Image
                src={image}
                width={214}
                height={214}
                alt={title}
                className="rounded-lg"
              />
            </div>
          )}
          <div>
            <div className="ml-20 mt-5 text-lg font-bold text-black">
              YURIY SHKRABA
            </div>
            <div className="ml-20 font-semibold  mt-2 text-gray-700">
              Senior Full Stack developer
            </div>
            <div className="ml-20 font-normal mt-2 text-gray-700">
              Romania, Suceava
            </div>

            <span className="flex ml-20 mt-3">
              <a className="ml-7 mr-5"
                href="https://www.github.com/Shkraba"
                target="_blank"
                rel="noreferrer"
              >
                <img className="ml-5"
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg"
                  width="32"
                  height="32"
                />{" "}
              </a>

              <a
                href="https://www.linkedin.com/in/yurii-shkraba/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg"
                  width="32"
                  height="32"
                />
              </a>
            </span>
          </div>
        </span>

        {markdownify(title, "h1", "h2")}

        <div className="content">
          <MDXRemote {...mdxContent} components={shortcodes} />
        </div>
      </div>
    </section>
  );
};

export default About;

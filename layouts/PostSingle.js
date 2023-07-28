import Share from "@components/Share";
import dateFormat from "@lib/utils/dateFormat";
import similerItems from "@lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@lib/utils/textConverter";
import SimilarPosts from "@partials/SimilarPosts";
import Image from "next/image";
import Link from "next/link";
import dark from "../syntaxTheme";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={dark} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};


const PostSingle = ({ post, posts,  slug }) => {
  const { frontmatter, content, mdxContent } = post;
  let { description, title, date, image, categories, tags } = frontmatter;
  description = description ? description : content.slice(0, 120);
  const similarPosts = similerItems(post, posts, slug);

  return (
    <>
      <section className="section">
        <div className="container">
          <article className="text-center">
            {/* Render the title */}
            {markdownify(title, "h1", "h2")}
            {/* Render the date and categories */}
            <ul className="mt-4 mb-8 flex flex-wrap items-center justify-center space-x-3 text-text">
              <li>{dateFormat(date)}</li>
              <li>
                <ul>
                  {categories.map((category, i) => (
                    <li className="inline-block" key={`category-${i}`}>
                      <Link
                        href={`/categories/${slugify(category)}`}
                        className="mr-3 hover:text-primary"
                      >
                        &#9635; {humanize(category)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {/* Render the image if available */}
            {image && (
              <Image
                src={image}
                height="500"
                width="1000"
                alt={title}
                className="rounded-lg"
              />
            )}
            <div className="content mb-16 text-left">
              {/* Render the Markdown content using react-markdown */}
              <ReactMarkdown renderers={{ code: CodeBlock }}>
                {content}
              </ReactMarkdown>
            </div>
            {/* Render the tags */}
            <div className="flex flex-wrap items-center justify-between">
              <ul className="mr-4 mb-4 space-x-3">
                {tags.map((tag, i) => (
                  <li className="inline-block" key={`tag-${i}`}>
                    <Link
                      href={`/tags/${slugify(tag)}`}
                      className="block rounded-lg bg-theme-light px-4 py-2 font-semibold text-dark hover:text-primary"
                    >
                      #{humanize(tag)}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Render the Share component */}
              <Share
                className="social-share mb-4"
                title={title}
                description={description}
                slug={slug}
              />
            </div>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {/* Render the SimilarPosts component */}
          {/* <h2 className="mb-8 text-center">Similar Posts</h2>
          <SimilarPosts posts={similarPosts.slice(0, 3)} /> */}
        </div>
      </section>
    </>
  );
};

export default PostSingle;

import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';

// mdx content parser
const parseMDX = async (content) => {
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug,  rehypeCodeTitles, rehypePrism],
      remarkPlugins: [remarkGfm],
    },
  };


  return await serialize(content, options);
};

export default parseMDX;

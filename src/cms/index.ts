import CMS from "netlify-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";

CMS.registerPreviewStyle("/output.css");

CMS.registerPreviewTemplate("blog", BlogPostPreview);

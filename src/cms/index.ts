import CMS from "netlify-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";
import "../styles/output.css";

CMS.init();

CMS.registerPreviewTemplate("blog", BlogPostPreview);

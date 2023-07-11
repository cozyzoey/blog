import CMS from "netlify-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";

CMS.registerPreviewStyle("/admin/tailwind.css");

CMS.registerPreviewTemplate("blog", BlogPostPreview);

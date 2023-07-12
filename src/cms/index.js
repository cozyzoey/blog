import CMS from "netlify-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";
import cloudinary from "netlify-cms-media-library-cloudinary";
import "../styles/output.css";

CMS.registerMediaLibrary(cloudinary);
CMS.registerPreviewTemplate("blog", BlogPostPreview);

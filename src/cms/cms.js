import CMS from "decap-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";
import cloudinary from "netlify-cms-media-library-cloudinary";
import "../styles/output.css";

CMS.init();

CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerMediaLibrary(cloudinary);

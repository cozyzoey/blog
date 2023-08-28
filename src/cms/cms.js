import CMS from "decap-cms-app";
import BlogPostPreview from "./preview-templates/blog-post-preview";
import cloudinary from "netlify-cms-media-library-cloudinary";

CMS.init();

CMS.registerPreviewStyle("preview.css");
CMS.registerPreviewTemplate("blog", BlogPostPreview);
CMS.registerMediaLibrary(cloudinary);

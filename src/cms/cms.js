import CMS from 'decap-cms-app'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import BlogPostPreview from './preview-templates/blog-post-preview'

CMS.init()

CMS.registerPreviewStyle('preview.css')
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerMediaLibrary(cloudinary)

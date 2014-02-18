# General
output_style = :compressed
relative_assets = true

# Source Directories
source_dir              = 'static/'
sass_dir                = source_dir + 'scss/'
images_dir              = source_dir + 'img/'
javascripts_dir         = source_dir + 'js/'
additional_import_paths = [source_dir + '/lib']

# Destination Directories
dest_dir             = 'deploy/static/'
css_dir              = '.temp/css/'
fonts_dir            = dest_dir + 'fonts/'
generated_images_dir = dest_dir + 'img/'

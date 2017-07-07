# http_path = "/"
project_path = "."
css_dir = "{ASSETS_DIR}/css"
sass_dir = "{ASSETS_DIR}/scss"
images_dir = "{ASSETS_DIR}/images"
javascripts_dir = "{ASSETS_DIR}/javascript"
relative_assets = true

environment = :development

output_style = (environment == :production) ? :compressed : :expanded
sourcemap = (environment == :production) ? false : true

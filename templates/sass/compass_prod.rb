# http_path = "/"
project_path = "."
css_dir = "{ASSETS_DIR}/bin"
target_dir = "{ASSETS_DIR}/css"
sass_dir = "{ASSETS_DIR}/scss"
images_dir = "{ASSETS_DIR}/images"
javascripts_dir = "{ASSETS_DIR}/javascript"
relative_assets = true

environment = :production

output_style = (environment == :production) ? :compressed : :expanded
sourcemap = (environment == :production) ? false : true

require "fileutils"

on_stylesheet_saved do |file|
  if File.exists?(file)
    filename = File.basename(file, File.extname(file))
    dir = File.dirname(file)
    File.rename(file, dir + "/" + filename + ".min" + File.extname(file))
    FileUtils.cp_r dir + "/" + filename + ".min" + File.extname(file), target_dir
  end
end
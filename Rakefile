require 'html-proofer'

task :test do
  sh "bundle exec jekyll build --baseurl="
  options = { :assume_extension => true }
  HTMLProofer.check_directory("./_site", options).run
end

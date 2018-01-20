require 'html-proofer'

task :test do
  sh "bundle exec jekyll build --baseurl="
  options = { :assume_extension => true, :http_status_ignore => [404, 0]}
  HTMLProofer.check_directory("./_site", options).run
end

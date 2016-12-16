#Nate's Blog

Uses Octopress 3. See docs here:

https://github.com/octopress/octopress

To run an Octopress command, do:

    set %MENTOS_TIMEOUT%=1000
    bundle exec octopress ...

To generate and deploy:

    bundle exec jekyll build (--watch doesn't work right now)
    bundle exec octopress deploy

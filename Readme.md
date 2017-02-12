#Nate's Blog

Uses Octopress 3. See docs here:

https://github.com/octopress/octopress

##Setup

* Install Ruby
* Install [Bundler](http://bundler.io/)
* run `bundler` in the project directory

##Running Octopress/Jekyl Commands

Octopress commands are listed [here](https://github.com/octopress/octopress) and Jekyll commands are listed [here](https://jekyllrb.com/docs/usage/). Run the commands with `bundle` like so:

    bundle exec octopress [command]
    bundle exec jekyll [command]

##Deploying:

    bundle exec jekyll build
    bundle exec octopress deploy

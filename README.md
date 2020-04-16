### To build all 3k+ people pages

1. [Install netlify CLI](https://docs.netlify.com/cli/get-started/#installation)
2. `jekyll build` locally
3. `netlify deploy`, which will push all contents of the `_site` folder to the server, on a draft deploy
4. If that looks good, use `netlify deploy --prod`, which should deploy to the live site.

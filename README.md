# Bootstrap plus additional Flexbox Grid

This is fork of [Bootstrap](http://getbootstrap.com) with additionally provided Flexbox Grid.

## How to use

For using Flebox Grid version just replace the normal class of Bootstrap Grid: `.col-xs-*`, `.container`, `.row`, `.col-md-pull`, etc. with additional letter 'f'.

**Example:** `.fcol-xs-*`, `.fcontainer`, `.frow`, `.fcol-md-pull`

## Documentation

Bootstrap's documentation, included in this repo in the root directory, is built with [Jekyll](http://jekyllrb.com). The docs may also be run locally.

### Running documentation locally

1. If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.5.x).
  - **Windows users:** Read [this unofficial guide](http://jekyll-windows.juthilo.com/) to get Jekyll up and running without problems.
2. Install the Ruby-based syntax highlighter, [Rouge](https://github.com/jneen/rouge), with `gem install rouge`.
3. From the root `/bootstrap` directory, run `jekyll serve` in the command line.
4. Open <http://localhost:9001> in your browser, and voilà.

Learn more about using Jekyll by reading its [documentation](http://jekyllrb.com/docs/home/).

**Important: If you want to run visual regression test (see the next section), then you should have jekyll installed.**

## Are there any tests of the flexbox grid?

For proving that flexbox grid works the same as normal version of Bootstrap Grid:

- Check if you have [install Jekyll](http://jekyllrb.com/docs/installation) & [Rouge](https://github.com/jneen/rouge) installed. Otherwise install them.
- Run: `npm install` (now you have all dependencies installed).
- Run: `grunt vr-test` (It will run visual regression tests with [CasperJs](http://casperjs.org) and [SlimerJS](http://slimerjs.org/).
- Everything is fine? That is good :)

A react component that shows replies to the fediverse post as comments

## Can I use this plugin?

You can do so under MIT license, but presumably you don't want to.
This package is so unstable that you may find it hard to use in production.

## TODO

- [ ] Refactor
- [ ] Allow build-time fetch of root post
- [ ] Allow passing root post url explicitly
- [ ] Refine default design
- [ ] Add error handling
- [ ] Support more fediverse systems (currently working on Pleroma, and maybe Mastodon)

## Usage

Insert `<FediverseCommentSection>` tag to your blog template with proper attributes. Import default stylesheet if you like.

## Acknowledgement

This work is inspired by (Carl's article Adding comments to your static blog with Mastodon)[https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/].

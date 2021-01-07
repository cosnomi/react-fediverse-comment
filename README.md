A react component that shows replies to the fediverse post as comments

## Can I use this plugin?

You can do so under MIT license, but presumably you don't want to.
This package is so unstable that you may find it hard to use in production.

## TODO

- Refactor
- Test
- Allow build-time fetch of root post
- Refine default design
- Add error handling
- Add documentation
- Support more fediverse systems (currently working on Pleroma, and maybe Mastodon)

## Usage

Insert `<FediverseCommentSection>` tag to your blog template with proper attributes. Import default stylesheet if you like.

<!-- (1) If you want to specify the root post url expilcitly (recommended) -->
Pass the root post API endpoint like this.
```
<FediverseCommentSection apiRootEndpoint="https://social.cosnomi.com/api/v1" rootPost="https://social.cosnomi.com/api/v1/statuses/A2rRxmPWzrYPouduO8">
```
- `rootPost` is an API endpoint url of the root status.
- `apiRootEndpoint` is a base url of the API endpoint.

Currently, this plugin only supports Pleroma (and probably Mastodon). Support for other fediverse systems is being considered.

I know these parameters are redundant. They will be updated soon.

## Acknowledgement

This work is inspired by [this Carl's article: Adding comments to your static blog with Mastodon](https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/).
I have wrote [a blog article about this plugin](https://blog.cosnomi.com/posts/fedi-comment/).

## Contribution

Contributions are highly appreciated.
- If you found a bug, raise an issue.
- Minor code changes and documentation updates should be basically suggested as PR.
- Major code changes (which typically includes breaking changes) should be first discussed in Issue.  

Thank you!

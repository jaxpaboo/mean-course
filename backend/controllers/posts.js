const Post = require('../models/posts');

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        // id: createdPost._id,
        // title: createdPost.title,
        // content: createdPost.content,
        // imagePath: createdPost.imagePath
        // CODE SHORTCUT
        ...createdPost,
        id: createdPost._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post failed!"
    })
  });
  // console.log(post);
}

exports.updatePost = (req, res, next) => {
  let imagepath = req.body.imagePath;
  // if req.file then there is a new file to upload... otherwise use old name from above line.
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  // Post.updateOne({_id: req.params.id}, post)
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
  .then(result => {
    //  console.log(result);
    if (result.n > 0) {
      res.status(200).json({
        message: 'Post updated successfully'
      });
    } else {
      res.status(401).json({
        message: 'Not Authorized'
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Updating a post failed!"
    })
  });
  console.log(post);
}

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  // NOTE: Even though we are passing back a subset of document...
  // all documents are initially returned.   Possible data hit if
  // very large amount.
  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  // daisy change request, first get documents, then get count.
  // can't return 'documents' in 2nd next so save in temporary
  // variable.
  postQuery
    .then((documents) => { // Post.find().then((documents) => {
    // res.status(200).json({
    //   message: 'Posts fetched successfully!',
    //   posts: documents
    // });
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      })
    });
}

exports.getPost = (req, res, next) => {
  console.log(req);
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found'});
    };
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching a post failed!"
    })
  });
}

exports.deletePost = (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then((result) => {
      // console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: 'Post deleted!'
        });
      } else {
        res.status(401).json({
          message: 'Not Authorized'
        })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting a post failed!"
      })
    })
}

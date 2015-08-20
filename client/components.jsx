
Meteor.subscribe('allPosts');

MainLayout = React.createClass({
  render() {
    return <div>
      <header><h1>Kadira Blog</h1></header>
      <main>{this.props.content}</main>
      <footer>We love Meteor</footer>
    </div>;
  }
});

BlogHome = React.createClass({
  render() {
    return <div>
      <p>This is the home page of our blog</p>
      <ul>
        <li><a href="/hello-world">See Hello World Post</a></li>
        <li><a href="/hello-world2">See Hello World Post2</a></li>
      </ul>
    </div>;
  }
});

BlogPost = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var postId = this.props.postId;
    var handle = Meteor.subscribe('singlePost', postId);
    if(handle.ready()) {
      this.render()
    }
    return data;
  },
  render() {
    return <div>
      <a href="/">Back</a>
      {Posts.findOne({_id: this.props.postId})}
    </div>
  }
});

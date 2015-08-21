PostSubs = new SubsManager();

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



PostRow = React.createClass({
  render() {
    return <li>
      <a href={"/" + this.props.post._id}>{this.props.post.title}</a></li>
  }
});

BlogHome = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState: function() {
      return {
          filterText: 'a'
      };
  },
  handleUserInput: function(filterText) {
      this.setState({
          filterText: filterText
      });
  },
  getMeteorData() {
    searchString = new RegExp('^title[0-9]* ' + this.state.filterText); 
    return {
      count: Posts.find({}).count(),
      posts: Posts.find({
        title:{$regex:searchString}
      },{
        limit: 10,
        sort: {createdAt:-1}
      }).fetch()
    };
  },
  renderPosts() {
    return this.data.posts.map((post) => {
      return <PostRow key={post._id} post={post} />;
    });
  },
  render() {
    return <div>
        <p>Postes, subscribed: ({this.data.count})</p>
        <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
        <ul>
          {this.data.posts? this.renderPosts():<p>Loading...</p>}
        </ul>
      </div>;
  }
});



BlogPost = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var data = {};
    var postId = this.props.postId;
    var handle = PostSubs.subscribe('singlePost', postId);
    data.post = Posts.findOne({_id: postId});
    if (!handle.ready()) {
      if (data.post){
        if (!data.post.content){
          data.post.content = 'Loading...'}
        }
    }
    return data;
  },
  getContent() {
    return <div>
      <h3>{this.data.post.title}</h3>
      by <h4>{this.data.post.user}</h4>
      <p>{this.data.post.content}</p>
    </div>;
  },
  render() {
    return <div>
      <a href="/">Back</a>
      {this.data.post? this.getContent() : <p>Loading...</p>}
    </div>

  }
});


var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                />
            </form>
        );
    }
});
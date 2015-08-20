Posts.remove({});
Posts.insert({
  _id: "hello-world",
  title: "Hello World Post",
  content: "This is the content of hello1 "
});

Posts.insert({
  _id: "hello-world2",
  title: "Hello World Post",
  content: "This is the content of hello2 "
});

Meteor.publish('singlePost', function(id) {
  check(id, String);
  // Make a delay manually to show the loading state
  Meteor._sleepForMs(1000);
  return Posts.find({_id: id});
});

Meteor.publish('allPosts', function() {
  return Posts.find({},{'fields':{'title':1}});
}); 
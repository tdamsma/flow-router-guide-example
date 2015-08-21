Meteor.startup(function() {
    // Posts.remove({});
    for (i = Posts.find().count(); i < 10000; i++) {
        Posts.insert({
            _id: 'p' + i,
            user: 'user' + i + ' ' + faker.internet.userName(),
            title: 'title' + i + ' ' + faker.lorem.sentence(),
            content: 'content' + i + ' ' + faker.lorem.paragraphs() + ' ' + faker.lorem.paragraphs() + ' ' + faker.lorem.paragraphs(),
            createdAt: Date.now()
        });
    }
});


Meteor.publish('singlePost', function(id) {
    check(id, String);
    // Make a delay manually to show the loading state
    Meteor._sleepForMs(1000);
    return Posts.find({
        _id: id
    });
});

Meteor.publish('allPosts', function(id) {
    // Make a delay manually to show the loading state
    console.log('waiting... ')
    Meteor._sleepForMs(2500);
    console.log('subscribed to all posts')
    return Posts.find({}, {
        fields: {
            title: 1,
            createdAt: 1
        }
    });
});

import { Template } from 'meteor/templating';

Template.viewStory.onCreated(function() {
  let self = this;
  const id = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('story');
    self.subscribe('contentGenre');
    self.subscribe('contentTags');
    self.subscribe('contentLanguage');
    self.subscribe('categories');
    self.subscribe('tags');
    self.subscribe('languages');
    Meteor.subscribe('TempStory', id);
  });
});

Template.viewStory.helpers({
  viewStoryById() {
    const cat = [],
      tag = [],
      story = [],
      lang = [];
    const id = FlowRouter.getParam('id');
    const storyArr = TempStory.find({ story_id: id }).fetch();
    story.push(storyArr[0]);
    story[0].MasterCat.forEach(e => {
      cat.push(e.Category_name);
    });
    story[0].MasterTag.forEach(e => {
      tag.push(e.hash_tag);
    });
    story[0].MasterLang.forEach(e => {
      lang.push(e.language);
    });
    story[0]['cat'] = cat;
    story[0]['tag'] = tag;
    story[0]['lang'] = lang;
    return story;
  }
});

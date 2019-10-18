import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import multiSelectArray from './../../../../utils/multiselectArr';
import Loader from './../../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.addStory.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('languages');
    self.subscribe('tags');
    self.subscribe('categories');
    self.subscribe('story');
    // self.subscribe('StoryImages');
  });
});

Template.addStory.events({
  'submit .addStoryForm': function(e) {
    e.preventDefault();
    const For = e.target.querySelector('#userType').value,
      Title = e.target.querySelector('#contentTitle').value,
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      Genre = multiSelectArray('story-genre'),
      Language = multiSelectArray('story-language'),
      Tags = multiSelectArray('story-tags'),
      city = $('#storycity').val(),
      state = $('#storystate').val(),
      country = $('#storycountry').val(),
      lat = $('#storylat').val(),
      lng = $('#storylng').val(),
      formatted_address = $('#storyformatted_address').val(),
      place_id = $('#storyplace_id').val(),
      removeStylesArr = [
        'checkAddedStoryTitleInput',
        'checkAddedStoryTitleInvalidMessage',
        'checkAddedStoryTitleLengthMessage',
        'checkAddedStoryTitleNumberMessage',
        'checkAddedStoryDescInput',
        'checkAddedStoryDescMessage',
        'checkAddedStoryDescNumberMessage'
      ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (Title.length >= 100) {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleLengthMessage');
      }, 2000);
    } else if (Title.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(Title)) {
      addErrOutline('checkAddedStoryTitleInput');
      addErrClass('checkAddedStoryTitleNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryTitleInput');
        removeStyles('checkAddedStoryTitleNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedStoryDescInput');
      addErrClass('checkAddedStoryDescMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryDescInput');
        removeStyles('checkAddedStoryDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkAddedStoryDescInput');
      addErrClass('checkAddedStoryDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedStoryDescInput');
        removeStyles('checkAddedStoryDescNumberMessage');
      }, 2000);
    } else {
      addLoader('addStoryLineLoader');
      Meteor.call(
        'addStoryMethod',
        For,
        Title,
        editorHtml,
        Genre,
        Language,
        Tags,
        city,
        state,
        country,
        lat,
        lng,
        formatted_address,
        place_id
      );
      window.location = '/storymanagement';
    }
  }
});

Template.addStory.helpers({
  tags() {
    return tags.find({}).fetch();
  },

  categories() {
    return categories.find({}).fetch();
  },

  languages() {
    return languages.find({}).fetch();
  }
});

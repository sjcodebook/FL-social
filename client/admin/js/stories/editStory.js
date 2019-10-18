import { Template } from 'meteor/templating';
import multiSelectArray from './../../../../utils/multiselectArr';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.editStory.onCreated(function() {
  let self = this;
  const id = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('languages');
    self.subscribe('tags');
    self.subscribe('categories');
    self.subscribe('story');
    Meteor.subscribe('editTempStory', id);
  });
});

Template.editStory.helpers({
  editStoryById() {
    const cat = [],
      tag = [],
      story = [],
      lang = [];
    const id = FlowRouter.getParam('id');
    const storyArr = editTempStory.find({ story_id: id }).fetch();
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
    $(document).ready(function() {
      $(`#${story[0].For}`).attr('selected', 'selected');
    });
    return story;
  },

  tags() {
    const id = FlowRouter.getParam('id');
    let MasterTag = [],
      objArr = [],
      story = [],
      tagArr = [];
    const tag = tags.find({ is_active: true }).fetch();
    const storyArr = editTempStory.find({ story_id: id }).fetch();
    story.push(storyArr[0]);
    story[0].MasterTag.forEach(e => {
      MasterTag.push(e.hash_tag);
    });

    tag.forEach(e => {
      tagArr.push(e.hash_tag);
    });

    tagArr = tagArr.filter(val => !MasterTag.includes(val));

    let obj = tagArr.reduce(function(o, val) {
      o[val] = val;
      return o;
    }, {});

    tagArr.forEach(e => {
      let ob = {};
      ob[obj[e]] = obj[e];
      objArr.push(ob);
    });

    return objArr;
  },

  categories() {
    const id = FlowRouter.getParam('id');
    let MasterCat = [],
      objArr = [],
      story = [],
      catArr = [];
    const cat = categories.find({ is_active: true }).fetch();
    const storyArr = editTempStory.find({ story_id: id }).fetch();
    story.push(storyArr[0]);
    story[0].MasterCat.forEach(e => {
      MasterCat.push(e.Category_name);
    });

    cat.forEach(e => {
      catArr.push(e.Category_name);
    });

    catArr = catArr.filter(val => !MasterCat.includes(val));

    let obj = catArr.reduce(function(o, val) {
      o[val] = val;
      return o;
    }, {});

    catArr.forEach(e => {
      let ob = {};
      ob[obj[e]] = obj[e];
      objArr.push(ob);
    });

    return objArr;
  },
  languages() {
    const id = FlowRouter.getParam('id');
    let MasterLang = [],
      objArr = [],
      story = [],
      langArr = [];
    const lang = languages.find({ is_active: true }).fetch();
    const storyArr = editTempStory.find({ story_id: id }).fetch();
    story.push(storyArr[0]);
    story[0].MasterLang.forEach(e => {
      MasterLang.push(e.language);
    });

    lang.forEach(e => {
      langArr.push(e.language);
    });

    langArr = langArr.filter(val => !MasterLang.includes(val));

    let obj = langArr.reduce(function(o, val) {
      o[val] = val;
      return o;
    }, {});

    langArr.forEach(e => {
      let ob = {};
      ob[obj[e]] = obj[e];
      objArr.push(ob);
    });

    return objArr;
  }
});

Template.editStory.events({
  'submit .editStoryForm': function(e) {
    e.preventDefault();
    const For = e.target.querySelector('#editUserType').value,
      id = FlowRouter.getParam('id'),
      Title = e.target.querySelector('#editContentTitle').value,
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      Genre = multiSelectArray('editStory-genre'),
      Language = multiSelectArray('editStory-language'),
      Tags = multiSelectArray('editStory-tags'),
      city = $('#storyEditcity').val(),
      state = $('#storyEditstate').val(),
      country = $('#storyEditcountry').val(),
      lat = $('#storyEditlat').val(),
      lng = $('#storyEditlng').val(),
      formatted_address = $('#storyEditformatted_address').val(),
      place_id = $('#storyEditplace_id').val(),
      GenreArr = [],
      LanguageArr = [],
      TagsArr = [],
      removeStylesArr = [
        'checkEditStoryTitleInput',
        'checkEditStoryTitleInvalidMessage',
        'checkEditStoryTitleLengthMessage',
        'checkEditStoryTitleNumberMessage',
        'checkEditStoryDescInput',
        'checkEditStoryDescMessage',
        'checkEditStoryDescNumberMessage'
      ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    Genre.forEach(e => {
      let cat = categories.find({ Category_name: e }).fetch();
      cat = cat[0].Category_id;
      GenreArr.push(cat);
    });

    Language.forEach(e => {
      let lang = languages.find({ language: e }).fetch();
      lang = lang[0].language_id;
      LanguageArr.push(lang);
    });

    Tags.forEach(e => {
      let tag = tags.find({ hash_tag: e }).fetch();
      tag = tag[0].hash_tag_id;
      TagsArr.push(tag);
    });

    if (Title.length >= 100) {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStoryTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStoryTitleLengthMessage');
      }, 2000);
    } else if (Title.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStoryTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStoryTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(Title)) {
      addErrOutline('checkEditStoryTitleInput');
      addErrClass('checkEditStoryTitleNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryTitleInput');
        removeStyles('checkEditStoryTitleNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditStoryDescInput');
      addErrClass('checkEditStoryDescMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryDescInput');
        removeStyles('checkEditStoryDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkEditStoryDescInput');
      addErrClass('checkEditStoryDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditStoryDescInput');
        removeStyles('checkEditStoryDescNumberMessage');
      }, 2000);
    } else {
      addLoader('editStoryLineLoader');
      Meteor.call(
        'editStoryMethod',
        id,
        For,
        Title,
        editorHtml,
        GenreArr,
        LanguageArr,
        TagsArr,
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

import { Template } from 'meteor/templating';
import ErrorStyles from './../../../../utils/errorStyles';
import Loader from './../../../../utils/loader';
import moment from 'moment';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.audiovideoManagement.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Media');
    self.subscribe('contentGenre');
    self.subscribe('contentLanguage');
    self.subscribe('contentTags');
    self.subscribe('categories');
    self.subscribe('languages');
  });
});

Template.audiovideoManagement.helpers({
  allAV() {
    let mediaTable = Media.find({}).fetch();
    mediaTable.forEach(e => {
      e.created_at = moment(e.created_at).format('ll');
    });
    return mediaTable;
  },

  increment(i) {
    return i + 1;
  },

  contentType(type) {
    if (type === 'Video') {
      return true;
    } else {
      return false;
    }
  },

  contentGenre(id) {
    const contentGenreArr = [];
    let contentGenreView = contentGenre.find({ media_id: id }).fetch();
    contentGenreView.forEach(e => {
      let cat = categories.find({ Category_id: e.Category_id }).fetch();
      cat.forEach(e => {
        contentGenreArr.push(e.Category_name);
      });
    });
    return contentGenreArr;
  },

  contentLanguage(id) {
    const contentLanguageArr = [];
    let contentLanguageView = contentLanguage.find({ media_id: id }).fetch();
    contentLanguageView.forEach(e => {
      let lang = languages.find({ language_id: e.Language_id }).fetch();
      lang.forEach(e => {
        contentLanguageArr.push(e.language);
      });
    });
    return contentLanguageArr;
  }
});

Template.audiovideoManagement.events({
  'click .changeStatus': function(e) {
    const id = e.currentTarget.id;
    addLoader(`${id}mediaStatus`);
    Meteor.call('MediaStatusMethod', id);
  }
});

import { Template } from 'meteor/templating';
import multiSelectArray from './../../../../utils/multiselectArr';
import Loader from './../../../../utils/loader';
import ErrorStyles from './../../../../utils/errorStyles';
import YouTubeGetID from './../../../../utils/youtubeURL';
import urlMetadata from 'url-metadata';
import validUrl from 'valid-url';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.editMedia.onCreated(function() {
  let self = this;
  const id = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('languages');
    self.subscribe('tags');
    self.subscribe('categories');
    self.subscribe('story');
    Meteor.subscribe('editTempMedia', id);
  });
});

Template.editMedia.helpers({
  editMediaById() {
    const cat = [],
      tag = [],
      story = [],
      lang = [];
    const id = FlowRouter.getParam('id');
    const storyArr = editTempMedia.find({ media_id: id }).fetch();
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
    $(document).ready(function() {
      $(`#${story[0].Type}`).attr('selected', 'selected');
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
    const storyArr = editTempMedia.find({ media_id: id }).fetch();
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
    const storyArr = editTempMedia.find({ media_id: id }).fetch();
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
    const storyArr = editTempMedia.find({ media_id: id }).fetch();
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

Template.editMedia.events({
  'change #editSourceURL': function(e) {
    $('#downeditMediaPrev').empty();
    $(document).ready(function() {
      const Source = $('#editSourceURL').val();

      if (!validUrl.isUri(Source)) {
        $('#downeditMediaPrev').empty();
        addErrOutline('checkEditMediaURLInput');
        addErrClass('checkEditMediaURLInvalidMessage');
        setTimeout(() => {
          removeStyles('checkEditMediaURLInput');
          removeStyles('checkEditMediaURLInvalidMessage');
        }, 2000);
      } else {
        $('#downeditMediaPrev').empty();
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');

        if (Source.includes('youtube') || Source.includes('YouTube')) {
          const id = YouTubeGetID(Source);
          const url = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

          $('#downeditMediaPrev').empty();
          document.getElementById('downeditMediaPrev').insertAdjacentHTML(
            'afterbegin',
            `<div class="card-body" >
              ${url}
            </div>
           `
          );
        } else {
          urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
            function(metadata) {
              removeLoader('ViewEditMediaDownContentLoader');
              const title = metadata['og:title'];
              const desc = metadata['og:description'];
              const img = metadata['og:image'];
              const url = metadata['og:url'];

              document
                .getElementById('downEditMediaImg')
                .insertAdjacentHTML(
                  'afterbegin',
                  `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
                );

              $('#downEditMediakw').html(
                `<a href='${url}' target="_blank">${desc}</a>` ||
                  'no keywords found'
              );
              $('#downEditMediades').html(
                `<a href='${url}' target="_blank">${title}</a>` ||
                  'no description found'
              );
            },
            function(error) {
              $('#downEditMediakw').html('Something Went Wrong!');
            }
          );

          document.getElementById('downeditMediaPrev').insertAdjacentHTML(
            'afterbegin',
            ` <div class="card mb-3 mt-2">
              <div class="row no-gutters">
                <i
                  id="ViewEditMediaDownContentLoader"
                  class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
                  style="font-size:2em;"
                ></i>
                <div class="col-md-4">
                  <div><div id="downEditMediaImg"></div></div>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title" id="downEditMediakw"></h5>
                    <p class="card-text" id="downEditMediades"></p>
                  </div>
                </div>
              </div>
            </div>`
          );
          addLoader('ViewEditMediaDownContentLoader');
        }
      }
    });
  },

  'click #ViewEditMediaBtn': function(e) {
    $('#downeditMediaPrev').empty();
    const Source = $('#editSourceURL').val();

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkEditMediaURLInput');
      addErrClass('checkEditMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');
      }, 2000);
    } else if (Source.includes('youtube') || Source.includes('YouTube')) {
      const id = YouTubeGetID(Source);
      const url = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

      $('#ViewEditMediaModalContent').empty();
      document.getElementById('ViewEditMediaModalContent').insertAdjacentHTML(
        'afterbegin',
        `  <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">PREVIEW MEDIA</h5>
        <button
          type="button"
          class="close"
          aria-label="Close"
          data-dismiss="modal"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

        <div class="modal-body">
      ${url}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="mb-2 mr-2 mt-3 btn btn-secondary"
            data-dismiss="modal"
          >Close
          </button>
        </div>`
      );
      $('#ViewEditMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewEditMediaModal'
      });
      $('#ViewEditMediaModal').click();
    } else {
      $('#ViewEditMediaModalContent').empty();
      urlMetadata('https://cors-anywhere.herokuapp.com/' + Source).then(
        function(metadata) {
          removeLoader('ViewEditMediaModalContentLoader');
          const title = metadata['og:title'];
          const desc = metadata['og:description'];
          const img = metadata['og:image'];
          const url = metadata['og:url'];

          document
            .getElementById('editMediaImg')
            .insertAdjacentHTML(
              'afterbegin',
              `<img src="${img}" alt="no image found" style='width:100%; height: 100%'>`
            );

          $('#EditMediakw').html(
            `<a href='${url}' target="_blank">${desc}</a>` ||
              'no keywords found'
          );
          $('#EditMediades').html(
            `<a href='${url}' target="_blank">${title}</a>` ||
              'no description found'
          );
        },
        function(error) {
          $('#EditMediakw').html('Something Went Wrong!');
        }
      );
      document.getElementById('ViewEditMediaModalContent').insertAdjacentHTML(
        'afterbegin',
        `<div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">PREVIEW MEDIA</h5>
        <button type="button" class="close" aria-label="Close" data-dismiss="modal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <i
              id="ViewEditMediaModalContentLoader"
              class="spinner fas fa-spinner ml-3 mb-3 mt-3 "
              style="font-size:2em;"
            ></i>
            <div class="col-md-4">
              <div><div id="editMediaImg"></div></div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" id="EditMediakw"></h5>
                <p class="card-text" id="EditMediades"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="mb-2 mr-2 mt-3 btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
      </div>`
      );
      addLoader('ViewEditMediaModalContentLoader');
      $('#ViewEditMediaModal').attr({
        'data-toggle': 'modal',
        'data-target': '#ViewEditMediaModal'
      });
      $('#ViewEditMediaModal').click();
    }
  },

  'submit .editMediaForm': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id'),
      Type = e.target.querySelector('#editMediaType').value,
      Source = e.target.querySelector('#editSourceURL').value,
      For = e.target.querySelector('#editMediaUserType').value,
      Title = e.target.querySelector('#editMediaContentTitle').value,
      editorHtml = e.target.querySelector('.ql-editor').innerHTML,
      editorText = e.target.querySelector('.ql-editor').innerText,
      Genre = multiSelectArray('editMedia-genre'),
      Language = multiSelectArray('editMedia-language'),
      Tags = multiSelectArray('editMedia-tags'),
      city = $('#mediaEditcity').val(),
      state = $('#mediaEditstate').val(),
      country = $('#mediaEditcountry').val(),
      lat = $('#mediaEditlat').val(),
      lng = $('#mediaEditlng').val(),
      formatted_address = $('#mediaEditformatted_address').val(),
      place_id = $('#mediaEditplace_id').val(),
      GenreArr = [],
      LanguageArr = [],
      TagsArr = [],
      removeStylesArr = [
        'checkEditMediaTitleInput',
        'checkEditMediaTitleInvalidMessage',
        'checkEditMediaTitleLengthMessage',
        'checkEditMediaTitleNumberMessage',
        'checkEditMediaDescInput',
        'checkEditMediaDescMessage',
        'checkEditMediaDescNumberMessage'
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

    if (!validUrl.isUri(Source)) {
      addErrOutline('checkEditMediaURLInput');
      addErrClass('checkEditMediaURLInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaURLInput');
        removeStyles('checkEditMediaURLInvalidMessage');
      }, 2000);
    } else if (Title.length >= 100) {
      addErrOutline('checkEditMediaTitleInput');
      addErrClass('checkEditMediaTitleLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaTitleInput');
        removeStyles('checkEditMediaTitleLengthMessage');
      }, 2000);
    } else if (Title.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditMediaTitleInput');
      addErrClass('checkEditMediaTitleInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaTitleInput');
        removeStyles('checkEditMediaTitleInvalidMessage');
      }, 2000);
    } else if (!isNaN(Title)) {
      addErrOutline('checkEditMediaTitleInput');
      addErrClass('checkEditMediaTitleNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaTitleInput');
        removeStyles('checkEditMediaTitleNumberMessage');
      }, 2000);
    } else if (editorText.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditMediaDescInput');
      addErrClass('checkEditMediaDescMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaDescInput');
        removeStyles('checkEditMediaDescMessage');
      }, 2000);
    } else if (!isNaN(editorText.replace(/[^\w]/g, ''))) {
      addErrOutline('checkEditMediaDescInput');
      addErrClass('checkEditMediaDescNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditMediaDescInput');
        removeStyles('checkEditMediaDescNumberMessage');
      }, 2000);
    } else {
      addLoader('editMediaLineLoader');
      Meteor.call(
        'editMediaMethod',
        id,
        Type,
        Source,
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
      window.location = '/audiovideomanagement';
    }
  }
});

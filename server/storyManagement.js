import { Meteor } from 'meteor/meteor';
import story from '../collections/storyCollection/storyCollection';
import contentGenre from '../collections/contentGenreCollection/contentGenreCollection';
import contentTags from '../collections/contentTagsCollection/contentTagsCollection';
import contentLanguage from '../collections/contentLanguagesCollection/contentLanguagesCollection';
import categories from '../collections/masterSettings/categoriesCollection';
import tags from '../collections/masterSettings/tagsCollection';
import languages from '../collections/masterSettings/languageCollection';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  StoryStatusMethod: function(id) {
    let status = story.find({ story_id: id }).fetch();

    status = status[0].Is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    story.update(
      { story_id: id },
      {
        $set: {
          Is_active: status
        }
      }
    );
    return true;
  },

  addStoryMethod: function(
    For,
    Title,
    editorHtml,
    Genre,
    Languages,
    Tags,
    city,
    state,
    country,
    lat,
    lng,
    formatted_address,
    place_id
  ) {
    const story_id = uuidv4();
    const contentTag_id = uuidv4();
    const contentGenre_id = uuidv4();
    const contentLanguage_id = uuidv4();

    Genre.forEach(e => {
      contentGenre.insert({
        contentGenre_id: contentGenre_id,
        story_id: story_id,
        Category_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Tags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        story_id: story_id,
        Tag_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Languages.forEach(e => {
      contentLanguage.insert({
        contentLanguage_id: contentLanguage_id,
        story_id: story_id,
        Language_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Title = Title.trim();
    story.insert({
      story_id: story_id,
      Title: Title,
      Image: 'https://picsum.photos/820/312',
      Description: editorHtml,
      Tags: contentTag_id,
      For: For,
      Genre: contentGenre_id,
      Language: contentLanguage_id,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      formatted_address: formatted_address,
      place_id: place_id,
      created_at: new Date(),
      updated_at: new Date(),
      Is_active: true
    });
    return true;
  },

  editStoryMethod: function(
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
  ) {
    const contentTag_id = uuidv4(),
      contentGenre_id = uuidv4(),
      contentLanguage_id = uuidv4();

    contentGenre
      .find({ story_id: id })
      .fetch()
      .forEach(e => {
        contentGenre.remove({ story_id: id });
      });

    contentTags
      .find({ story_id: id })
      .fetch()
      .forEach(e => {
        contentTags.remove({ story_id: id });
      });

    contentLanguage
      .find({ story_id: id })
      .fetch()
      .forEach(e => {
        contentLanguage.remove({ story_id: id });
      });

    GenreArr.forEach(e => {
      contentGenre.insert({
        contentGenre_id: contentGenre_id,
        story_id: id,
        Category_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    TagsArr.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        story_id: id,
        Tag_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    LanguageArr.forEach(e => {
      contentLanguage.insert({
        contentLanguage_id: contentLanguage_id,
        story_id: id,
        Language_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Title = Title.trim();
    if (!city) {
      story.update(
        { story_id: id },
        {
          $set: {
            Title: Title,
            Image: 'https://picsum.photos/820/312',
            Description: editorHtml,
            Tags: contentTag_id,
            For: For,
            Genre: contentGenre_id,
            Language: contentLanguage_id,
            updated_at: new Date()
          }
        }
      );
    } else {
      story.update(
        { story_id: id },
        {
          $set: {
            Title: Title,
            Image: 'https://picsum.photos/820/312',
            Description: editorHtml,
            Tags: contentTag_id,
            For: For,
            Genre: contentGenre_id,
            Language: contentLanguage_id,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            formatted_address: formatted_address,
            place_id: place_id,
            updated_at: new Date()
          }
        }
      );
    }

    return true;
  }
});

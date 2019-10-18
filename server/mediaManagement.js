import { Meteor } from 'meteor/meteor';
import Media from '../collections/mediaCollection/mediaCollection';
import contentGenre from '../collections/contentGenreCollection/contentGenreCollection';
import contentTags from '../collections/contentTagsCollection/contentTagsCollection';
import contentLanguage from '../collections/contentLanguagesCollection/contentLanguagesCollection';
import categories from '../collections/masterSettings/categoriesCollection';
import tags from '../collections/masterSettings/tagsCollection';
import languages from '../collections/masterSettings/languageCollection';
import uuidv4 from 'uuid/v4';

Meteor.methods({
  MediaStatusMethod: function(id) {
    let status = Media.find({ media_id: id }).fetch();

    status = status[0].Is_active;

    if (status === true) {
      status = false;
    } else {
      status = true;
    }

    Media.update(
      { media_id: id },
      {
        $set: {
          Is_active: status
        }
      }
    );
    return true;
  },

  addMediaMethod: function(
    Type,
    Source,
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
    const media_id = uuidv4();
    const contentTag_id = uuidv4();
    const contentGenre_id = uuidv4();
    const contentLanguage_id = uuidv4();

    Genre.forEach(e => {
      contentGenre.insert({
        contentGenre_id: contentGenre_id,
        media_id: media_id,
        Category_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Tags.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        media_id: media_id,
        Tag_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Languages.forEach(e => {
      contentLanguage.insert({
        contentLanguage_id: contentLanguage_id,
        media_id: media_id,
        Language_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Title = Title.trim();
    Media.insert({
      media_id: media_id,
      Type: Type,
      Source: Source,
      Title: Title,
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

  editMediaMethod: function(
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
  ) {
    const contentTag_id = uuidv4(),
      contentGenre_id = uuidv4(),
      contentLanguage_id = uuidv4();

    contentGenre
      .find({ media_id: id })
      .fetch()
      .forEach(e => {
        contentGenre.remove({ media_id: id });
      });

    contentTags
      .find({ media_id: id })
      .fetch()
      .forEach(e => {
        contentTags.remove({ media_id: id });
      });

    contentLanguage
      .find({ media_id: id })
      .fetch()
      .forEach(e => {
        contentLanguage.remove({ media_id: id });
      });

    GenreArr.forEach(e => {
      contentGenre.insert({
        contentGenre_id: contentGenre_id,
        media_id: id,
        Category_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    TagsArr.forEach(e => {
      contentTags.insert({
        contentTag_id: contentTag_id,
        media_id: id,
        Tag_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    LanguageArr.forEach(e => {
      contentLanguage.insert({
        contentLanguage_id: contentLanguage_id,
        media_id: id,
        Language_id: e,
        created_at: new Date(),
        Is_active: true
      });
    });

    Title = Title.trim();
    if (!city) {
      Media.update(
        { media_id: id },
        {
          $set: {
            Type: Type,
            Source: Source,
            Title: Title,
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
      Media.update(
        { media_id: id },
        {
          $set: {
            Type: Type,
            Source: Source,
            Title: Title,
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

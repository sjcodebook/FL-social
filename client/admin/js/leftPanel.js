import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import ErrorStyles from './../../../utils/errorStyles';
import Loader from './../../../utils/loader';
import * as EmailValidator from 'email-validator';
import uuidv4 from 'uuid/v4';

const { addLoader, removeLoader } = new Loader();

const {
  removeStyles,
  addErrOutline,
  addErrClass,
  addSuccessOutline,
  addSuccessClass
} = new ErrorStyles();

Template.leftPanel.onCreated(function() {
  let self = this;
  self.autorun(function() {
    self.subscribe('Meteor.users');
    self.subscribe('mainMenu');
    self.subscribe('roles');
  });
});

Template.leftPanel.helpers({
  is_subadmin() {
    const id = Meteor.userId();
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].is_subadmin;

    if (user === true) {
      return true;
    } else {
      return false;
    }
  },

  menuItems() {
    const id = Meteor.userId();
    const Arr = [];
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].user_id;
    let rolesArr = roles.find({ user_id: user }).fetch();

    rolesArr.forEach(e => {
      let menu = mainMenu.find({ menu_id: e.menuId }).fetch();
      Arr.push(menu[0]);
    });
    return Arr;
  },

  isMS(name) {
    if (name === 'Master Settings') {
      return true;
    } else {
      return false;
    }
  },

  is_active() {
    const id = Meteor.userId();
    let user = Meteor.users.find({ _id: id }).fetch();
    user = user[0].is_active;

    if (user === true) {
      return true;
    } else {
      return false;
    }
  }
});

//
// ─── MASTER SETTINGS ────────────────────────────────────────────────────────────
//
Template.leftPanel.events({
  'submit .addCatForm': function(e) {
    e.preventDefault();
    const catName = e.target.querySelector('#addCat').value;

    const removeStylesArr = [
      'checkAddedCatInput',
      'checkAddedCatMessage',
      'checkAddedCatInvalidMessage',
      'checkAddedCatLengthMessage',
      'checkAddedCatNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (catName.length >= 30) {
      addErrOutline('checkAddedCatInput');
      addErrClass('checkAddedCatLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedCatInput');
        removeStyles('checkAddedCatLengthMessage');
      }, 2000);
    } else if (catName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedCatInput');
      addErrClass('checkAddedCatInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedCatInput');
        removeStyles('checkAddedCatInvalidMessage');
      }, 2000);
    } else if (!isNaN(catName)) {
      addErrOutline('checkAddedCatInput');
      addErrClass('checkAddedCatNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedCatInput');
        removeStyles('checkAddedCatNumberMessage');
      }, 2000);
    } else {
      addLoader('submitCatBtn');
      Meteor.call('addCatMethod', catName, function(err, result) {
        removeLoader('submitCatBtn');
        if (err) {
          addErrOutline('checkAddedCatInput');
          addErrClass('checkAddedCatMessage');
          setTimeout(() => {
            removeStyles('checkAddedCatInput');
            removeStyles('checkAddedCatMessage');
          }, 2000);
        } else {
          $('#allCatTable')
            .DataTable()
            .destroy();

          addSuccessOutline('checkAddedCatInput');
          addSuccessClass('checkAddedCatMessage');
          setTimeout(() => {
            removeStyles('checkAddedCatInput');
            removeStyles('checkAddedCatMessage');
            $('#ManageCatModal .close').click();
          }, 300);
        }
      });
    }
  },

  'submit .addTagForm': function(e) {
    e.preventDefault();
    const tagName = e.target.querySelector('#addTag').value;

    const removeStylesArr = [
      'checkAddedTagInput',
      'checkAddedTagMessage',
      'checkAddedTagInvalidMessage',
      'checkAddedTagLengthMessage',
      'checkAddedTagNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (tagName.length >= 30) {
      addErrOutline('checkAddedTagInput');
      addErrClass('checkAddedTagLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedTagInput');
        removeStyles('checkAddedTagLengthMessage');
      }, 2000);
    } else if (tagName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedTagInput');
      addErrClass('checkAddedTagInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedTagInput');
        removeStyles('checkAddedTagInvalidMessage');
      }, 2000);
    } else if (!isNaN(tagName)) {
      addErrOutline('checkAddedTagInput');
      addErrClass('checkAddedTagNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedTagInput');
        removeStyles('checkAddedTagNumberMessage');
      }, 2000);
    } else {
      addLoader('submitTagBtn');
      Meteor.call('addTagMethod', tagName, function(err, result) {
        removeLoader('submitTagBtn');
        if (err) {
          addErrOutline('checkAddedTagInput');
          addErrClass('checkAddedTagMessage');
          setTimeout(() => {
            removeStyles('checkAddedTagInput');
            removeStyles('checkAddedTagMessage');
          }, 2000);
        } else {
          $('#allTagTable')
            .DataTable()
            .destroy();

          addSuccessOutline('checkAddedTagInput');
          addSuccessClass('checkAddedTagMessage');
          setTimeout(() => {
            removeStyles('checkAddedTagInput');
            removeStyles('checkAddedTagMessage');
            $('#ManageTagModal .close').click();
          }, 300);
        }
      });
    }
  },

  'submit .addLangForm': function(e) {
    e.preventDefault();
    const langName = e.target.querySelector('#addLang').value;

    const removeStylesArr = [
      'checkAddedLangInput',
      'checkAddedLangMessage',
      'checkAddedLangInvalidMessage',
      'checkAddedLangLengthMessage',
      'checkAddedLangNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (langName.length >= 30) {
      addErrOutline('checkAddedLangInput');
      addErrClass('checkAddedLangLengthMessage');
      setTimeout(() => {
        removeStyles('checkAddedLangInput');
        removeStyles('checkAddedLangLengthMessage');
      }, 2000);
    } else if (langName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddedLangInput');
      addErrClass('checkAddedLangInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddedLangInput');
        removeStyles('checkAddedLangInvalidMessage');
      }, 2000);
    } else if (!isNaN(langName)) {
      addErrOutline('checkAddedLangInput');
      addErrClass('checkAddedLangNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddedLangInput');
        removeStyles('checkAddedLangNumberMessage');
      }, 2000);
    } else {
      addLoader('submitLangBtn');
      Meteor.call('addLangMethod', langName, function(err, result) {
        removeLoader('submitLangBtn');
        if (err) {
          addErrOutline('checkAddedLangInput');
          addErrClass('checkAddedLangMessage');
          setTimeout(() => {
            removeStyles('checkAddedLangInput');
            removeStyles('checkAddedLangMessage');
          }, 2000);
        } else {
          $('#allLangTable')
            .DataTable()
            .destroy();

          addSuccessOutline('checkAddedLangInput');
          addSuccessClass('checkAddedLangMessage');
          setTimeout(() => {
            removeStyles('checkAddedLangInput');
            removeStyles('checkAddedLangMessage');
            $('#ManageLangModal .close').click();
          }, 300);
        }
      });
    }
  },

  'submit .editCatNameForm': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id');
    const editCatName = e.target.querySelector('#editCatName').value;

    const removeStylesArr = [
      'checkEditCatInput',
      'checkEditCatMessage',
      'checkEditCatInvalidMessage',
      'checkEditCatLengthMessage',
      'checkEditCatNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (editCatName.length >= 30) {
      addErrOutline('checkEditCatInput');
      addErrClass('checkEditCatLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditCatInput');
        removeStyles('checkEditCatLengthMessage');
      }, 2000);
    } else if (editCatName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditCatInput');
      addErrClass('checkEditCatInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditCatInput');
        removeStyles('checkEditCatInvalidMessage');
      }, 2000);
    } else if (!isNaN(editCatName)) {
      addErrOutline('checkEditCatInput');
      addErrClass('checkEditCatNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditCatInput');
        removeStyles('checkEditCatNumberMessage');
      }, 2000);
    } else {
      addLoader('submitEditCatBtn');
      Meteor.call('editCatMethod', editCatName, id, function(err, result) {
        removeLoader('submitEditCatBtn');
        if (err) {
          addErrOutline('checkEditCatInput');
          addErrClass('checkEditCatMessage');
          setTimeout(() => {
            removeStyles('checkEditCatInput');
            removeStyles('checkEditCatMessage');
          }, 2000);
        } else {
          document.getElementById('editCatName').value = '';
          addSuccessOutline('checkEditCatInput');
          addSuccessClass('checkEditCatMessage');
          setTimeout(() => {
            removeStyles('checkEditCatInput');
            removeStyles('checkEditCatMessage');
            $('#EditCatModal .close').click();
          }, 300);
        }
      });
    }
  },

  'submit .editTagNameForm': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id');
    const editTagName = e.target.querySelector('#editTagName').value;

    const removeStylesArr = [
      'checkEditTagInput',
      'checkEditTagMessage',
      'checkEditTagLengthMessage',
      'checkEditTagNumberMessage',
      'checkEditTagInvalidMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (editTagName.length >= 30) {
      addErrOutline('checkEditTagInput');
      addErrClass('checkEditTagLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditTagInput');
        removeStyles('checkEditTagLengthMessage');
      }, 2000);
    } else if (editTagName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditTagInput');
      addErrClass('checkEditTagInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditTagInput');
        removeStyles('checkEditTagInvalidMessage');
      }, 2000);
    } else if (!isNaN(editTagName)) {
      addErrOutline('checkEditTagInput');
      addErrClass('checkEditTagNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditTagInput');
        removeStyles('checkEditTagNumberMessage');
      }, 2000);
    } else {
      addLoader('submitEditTagBtn');
      Meteor.call('editTagMethod', editTagName, id, function(err, result) {
        removeLoader('submitEditTagBtn');
        if (err) {
          addErrOutline('checkEditTagInput');
          addErrClass('checkEditTagMessage');
          setTimeout(() => {
            removeStyles('checkEditTagInput');
            removeStyles('checkEditTagMessage');
          }, 2000);
        } else {
          document.getElementById('editTagName').value = '';
          addSuccessOutline('checkEditTagInput');
          addSuccessClass('checkEditTagMessage');
          setTimeout(() => {
            removeStyles('checkEditTagInput');
            removeStyles('checkEditTagMessage');
            $('#EditTagModal .close').click();
          }, 300);
        }
      });
    }
  },

  'submit .editLangNameForm': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id');
    const editLangName = e.target.querySelector('#editLangName').value;
    const removeStylesArr = [
      'checkEditLangInput',
      'checkEditLangMessage',
      'checkEditLangLengthMessage',
      'checkEditLangNumberMessage',
      'checkEditLangInvalidMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (editLangName.length >= 30) {
      addErrOutline('checkEditLangInput');
      addErrClass('checkEditLangLengthMessage');
      setTimeout(() => {
        removeStyles('checkEditLangInput');
        removeStyles('checkEditLangLengthMessage');
      }, 2000);
    } else if (editLangName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditLangInput');
      addErrClass('checkEditLangInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditLangInput');
        removeStyles('checkEditLangInvalidMessage');
      }, 2000);
    } else if (!isNaN(editLangName)) {
      addErrOutline('checkEditLangInput');
      addErrClass('checkEditLangNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditLangInput');
        removeStyles('checkEditLangNumberMessage');
      }, 2000);
    } else {
      addLoader('submitEditLangBtn');
      Meteor.call('editLangMethod', editLangName, id, function(err, result) {
        removeLoader('submitEditLangBtn');
        if (err) {
          addErrOutline('checkEditLangInput');
          addErrClass('checkEditLangMessage');
          setTimeout(() => {
            removeStyles('checkEditLangInput');
            removeStyles('checkEditLangMessage');
          }, 2000);
        } else {
          document.getElementById('editLangName').value = '';
          addSuccessOutline('checkEditLangInput');
          addSuccessClass('checkEditLangMessage');
          setTimeout(() => {
            removeStyles('checkEditLangInput');
            removeStyles('checkEditLangMessage');
            $('#EditLangModal .close').click();
          }, 300);
        }
      });
    }
  }
});

Template.leftPanel.helpers({
  getCurrentCat() {
    const id = FlowRouter.getParam('id');
    return categories.find({ Category_id: id }).fetch();
  },
  getCurrentTag() {
    const id = FlowRouter.getParam('id');
    return tags.find({ hash_tag_id: id }).fetch();
  },
  getCurrentLang() {
    const id = FlowRouter.getParam('id');
    return languages.find({ language_id: id }).fetch();
  }
});

//
// ─── USER MANAGEMENT ────────────────────────────────────────────────────────────
//

Template.leftPanel.helpers({
  getCurrentUser() {
    const id = FlowRouter.getParam('id');
    return Meteor.users.find({ user_id: id }).fetch();
  }
});

Template.leftPanel.events({
  'submit .deleteUserForm': function(e) {
    e.preventDefault();
    removeStyles('checkDeleteUserMessage');
    addLoader('submitDeleteUserBtn');
    const id = FlowRouter.getParam('id');
    Meteor.call('deleteUserMethod', id, function(err, result) {
      removeLoader('submitDeleteUserBtn');
      if (err) {
        addErrClass('checkDeleteUserMessage');
        setTimeout(() => {
          removeStyles('checkDeleteUserMessage');
        }, 2000);
      } else {
        $('#allUsersTable')
          .DataTable()
          .row('#' + id)
          .remove()
          .draw();
        addSuccessClass('checkDeleteUserMessage');
        setTimeout(() => {
          removeStyles('checkDeleteUserMessage');
          $('#deleteUserModal .close').click();
        }, 300);
      }
    });
  },

  'submit .editUserForm': function(e) {
    e.preventDefault();
    const id = FlowRouter.getParam('id');
    const userName = e.target.querySelector('#userName').value;
    const mobile_number = e.target.querySelector('#mobile_number').value;
    const city = $('#newcity').val();
    const state = $('#newstate').val();
    const country = $('#newcountry').val();
    const lat = $('#newlat').val();
    const lng = $('#newlng').val();
    const formatted_address = $('#newformatted_address').val();
    const place_id = $('#newplace_id').val();
    const removeStylesArr = [
      'checkEditUserInput',
      'checkEditUserMessage',
      'checkEditUserNameInvalidMessage',
      'checkEditUserNameNumberMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (userName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserNameInput');
      addErrClass('checkEditUserNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserNameInput');
        removeStyles('checkEditUserNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkEditUserNameInput');
      addErrClass('checkEditUserNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditUserNameInput');
        removeStyles('checkEditUserNameNumberMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkEditUserPhoneInput');
      addErrClass('checkEditUserPhoneNumberMessage');
      setTimeout(() => {
        removeStyles('checkEditUserPhoneInput');
        removeStyles('checkEditUserPhoneNumberMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkEditUserPhoneInput');
      addErrClass('checkEditUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkEditUserPhoneInput');
        removeStyles('checkEditUserPhoneInvalidMessage');
      }, 2000);
    } else {
      addLoader('submitEditUserBtn');
      Meteor.call(
        'editUserMethod',
        userName,
        mobile_number,
        id,
        city,
        state,
        country,
        lat,
        lng,
        formatted_address,
        place_id,
        function(err, result) {
          removeLoader('submitEditUserBtn');
          if (err) {
            addErrOutline('checkEditUserPhoneInput');
            addErrClass('checkEditUserMessage');
            setTimeout(() => {
              removeStyles('checkEditUserPhoneInput');
              removeStyles('checkEditUserMessage');
            }, 2000);
          } else {
            addSuccessOutline('checkEditUserInput');
            addSuccessClass('checkEditUserMessage');
            setTimeout(() => {
              removeStyles('checkEditUserInput');
              removeStyles('checkEditUserMessage');
              $('#editUserModal .close').click();
            }, 300);
          }
        }
      );
    }
  },

  'submit .addUserForm': function(e) {
    e.preventDefault();

    const userName = e.target.querySelector('#newUserName').value;
    let email = e.target.querySelector('#newEmail').value;
    const mobile_number = e.target.querySelector('#newMobile_number').value;
    const city = $('#city').val();
    const state = $('#state').val();
    const country = $('#country').val();
    const lat = $('#lat').val();
    const lng = $('#lng').val();
    const formatted_address = $('#formatted_address').val();
    const place_id = $('#place_id').val();

    email = email.trim().toLowerCase();

    const removeStylesArr = [
      'checkAddUserInput',
      'checkAddUserNameInput',
      'checkAddUserEmailInput',
      'checkAddUserPhoneInput',
      'checkAddUserMessage',
      'checkAddUserEmailMessage',
      'checkAddUserPhoneMessage',
      'checkAddUserPhoneInvalidMessage',
      'checkAddUserEmailInvalidMessage',
      'checkAddUserNameNumberMessage',
      'checkAddUserNameInvalidMessage'
    ];

    removeStylesArr.forEach(e => {
      removeStyles(e);
    });

    if (userName.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserNameInput');
      addErrClass('checkAddUserNameInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserNameInput');
        removeStyles('checkAddUserNameInvalidMessage');
      }, 2000);
    } else if (!isNaN(userName)) {
      addErrOutline('checkAddUserNameInput');
      addErrClass('checkAddUserNameNumberMessage');
      setTimeout(() => {
        removeStyles('checkAddUserNameInput');
        removeStyles('checkAddUserNameNumberMessage');
      }, 2000);
    } else if (!EmailValidator.validate(email)) {
      addErrOutline('checkAddUserEmailInput');
      addErrClass('checkAddUserEmailInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserEmailInput');
        removeStyles('checkAddUserEmailInvalidMessage');
      }, 2000);
    } else if (isNaN(mobile_number)) {
      addErrOutline('checkAddUserPhoneInput');
      addErrClass('checkAddUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserPhoneInput');
        removeStyles('checkAddUserPhoneInvalidMessage');
      }, 2000);
    } else if (mobile_number.replace(/[^\w]/g, '') === '') {
      addErrOutline('checkAddUserPhoneInput');
      addErrClass('checkAddUserPhoneInvalidMessage');
      setTimeout(() => {
        removeStyles('checkAddUserPhoneInput');
        removeStyles('checkAddUserPhoneInvalidMessage');
      }, 2000);
    } else {
      addLoader('submitAddUserBtn');
      const id = uuidv4();
      Meteor.call(
        'addUserMethod',
        id,
        userName,
        email,
        mobile_number,
        city,
        state,
        country,
        lat,
        lng,
        formatted_address,
        place_id,
        function(err, result) {
          removeLoader('submitAddUserBtn');
          if (err) {
            if (err.details === 'email error') {
              addErrOutline('checkAddUserEmailInput');
              addErrClass('checkAddUserEmailMessage');
              setTimeout(() => {
                removeStyles('checkAddUserEmailInput');
                removeStyles('checkAddUserEmailMessage');
              }, 2000);
            } else if (err.details === 'mob error') {
              addErrOutline('checkAddUserPhoneInput');
              addErrClass('checkAddUserPhoneMessage');
              setTimeout(() => {
                removeStyles('checkAddUserPhoneInput');
                removeStyles('checkAddUserPhoneMessage');
              }, 2000);
            }
          } else {
            $('#allUsersTable')
              .DataTable()
              .destroy();
            removeStyles('checkAddUserEmailMessage');
            addSuccessOutline('checkAddUserInput');
            addSuccessClass('checkAddUserMessage');
            setTimeout(() => {
              removeStyles('checkAddUserInput');
              removeStyles('checkAddUserMessage');
              $('#AddUserModal .close').click();
            }, 100);
            window.location = '/usermanagement';
          }
        }
      );
    }
  }
});

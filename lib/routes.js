import { FlowRouterTitle } from 'meteor/ostrio:flow-router-title';
import { Meteor } from 'meteor/meteor';
import { Blaze } from 'meteor/blaze';

// Login and logout routes
FlowRouter.route('/', {
  name: 'dashboard',
  title: 'FolkLog-DashBoard',
  action() {
    Blaze._allowJavascriptUrls();
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Master settings routes
FlowRouter.route('/mastersettings/categories', {
  name: 'categories',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'categories' });
  }
});

FlowRouter.route('/mastersettings/tags', {
  name: 'tags',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'tags' });
  }
});

FlowRouter.route('/mastersettings/languages', {
  name: 'languages',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'languages' });
  }
});

FlowRouter.route('/mastersettings/categories/:id', {
  name: 'categories',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'categories' });
  }
});

FlowRouter.route('/mastersettings/tags/:id', {
  name: 'tags',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'tags' });
  }
});

FlowRouter.route('/mastersettings/languages/:id', {
  name: 'languages',
  title: 'FolkLog-Master Settings',
  action() {
    BlazeLayout.render('leftPanel', { main: 'languages' });
  }
});

// CMS routes
FlowRouter.route('/cms', {
  name: 'cms',
  title: 'FolkLog-CMS',
  action() {
    BlazeLayout.render('leftPanel', { main: 'cms' });
  }
});

FlowRouter.route('/cms/pages/:name', {
  name: 'cms',
  title: 'FolkLog-CMS PAGES',
  action() {
    BlazeLayout.render('CMSlayout');
  }
});

FlowRouter.route('/cms/edit-cms/:id', {
  name: 'cms',
  title: 'FolkLog-Edit CMS',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editCms' });
  }
});

// User management routes
FlowRouter.route('/usermanagement', {
  name: 'usermanagement',
  title: 'FolkLog-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/view/:id', {
  name: 'usermanagement',
  title: 'FolkLog-View User',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewUser' });
  }
});

FlowRouter.route('/usermanagement/edit/:id', {
  name: 'usermanagement',
  title: 'FolkLog-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/delete/:id', {
  name: 'usermanagement',
  title: 'FolkLog-User Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'userManagement' });
  }
});

FlowRouter.route('/usermanagement/filter-users', {
  name: 'usermanagement',
  title: 'FolkLog-Filter Users',
  action() {
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Story management routes
FlowRouter.route('/storymanagement', {
  name: 'storymanagement',
  title: 'FolkLog-Story Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'storyManagement' });
  }
});

FlowRouter.route('/storymanagement/view/:id', {
  name: 'storymanagement',
  title: 'FolkLog-View Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewStory' });
  }
});

FlowRouter.route('/storymanagement/edit/:id', {
  name: 'storymanagement',
  title: 'FolkLog-Edit Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editStory' });
  }
});

FlowRouter.route('/storymanagement/addstory', {
  name: 'storymanagement',
  title: 'FolkLog-Add Story',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addStory' });
  }
});

// A/V management routes
FlowRouter.route('/audiovideomanagement', {
  name: 'audiovideomanagement',
  title: 'FolkLog-Media Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'audiovideoManagement' });
  }
});

FlowRouter.route('/audiovideomanagement/view/:id', {
  name: 'audiovideomanagement',
  title: 'FolkLog-View Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewMedia' });
  }
});

FlowRouter.route('/audiovideomanagement/edit/:id', {
  name: 'audiovideomanagement',
  title: 'FolkLog-Edit Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editMedia' });
  }
});

FlowRouter.route('/audiovideomanagement/addmedia', {
  name: 'audiovideomanagement',
  title: 'FolkLog-Add Media',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addMedia' });
  }
});

// User Submission
FlowRouter.route('/usersubmission', {
  name: 'usersubmission',
  title: 'FolkLog-User Submission',
  action() {
    BlazeLayout.render('leftPanel', { main: 'usersubmission' });
  }
});

FlowRouter.route('/usersubmission/view/:id', {
  name: 'usersubmission',
  title: 'FolkLog-View User Submission',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewUsersubmission' });
  }
});

FlowRouter.route('/submitStory', {
  name: 'submissionForm',
  title: 'FolkLog-User Submission',
  action() {
    BlazeLayout.render('submissionForm');
  }
});

// Staff Management
FlowRouter.route('/staffmanagement', {
  name: 'staffmanagement',
  title: 'FolkLog-Staff Management',
  action() {
    BlazeLayout.render('leftPanel', { main: 'staffManagement' });
  }
});

FlowRouter.route('/staffmanagement/view/:id', {
  name: 'staffmanagement',
  title: 'FolkLog-View Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'viewStaff' });
  }
});

FlowRouter.route('/staffmanagement/edit/:id', {
  name: 'staffmanagement',
  title: 'FolkLog-Edit Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'editStaff' });
  }
});

FlowRouter.route('/staffmanagement/addstaff', {
  name: 'staffmanagement',
  title: 'FolkLog-Add Staff',
  action() {
    BlazeLayout.render('leftPanel', { main: 'addStaff' });
  }
});

// 404 Error
FlowRouter.notFound = {
  name: '404',
  title: 'FolkLog-Not Found',
  action() {
    BlazeLayout.render('notFound');
  }
};

// Under Construction Route
FlowRouter.route('/uc', {
  name: 'uc',
  title: 'FolkLog-Under Construction',
  action() {
    BlazeLayout.render('leftPanel', { main: 'underCons' });
  }
});

// Misc
if (Meteor.isClient) {
  new FlowRouterTitle(FlowRouter);
}

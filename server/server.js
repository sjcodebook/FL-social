import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
// import { image, helpers, internet, lorem } from 'faker';
import cms from '../collections/CMS/cmsCollection';
import mainMenu from '../collections/mainMenuCollection/mainMenuCollection';
import roles from '../collections/roleCollection/roleCollection';
import uuidv4 from 'uuid/v4';

Meteor.startup(() => {
  require('dotenv').config();
  // CMS collection
  const content = cms.find({}).fetch();

  if (content.length === 0) {
    cms.insert({
      cms_id: '2345',
      cms_type: 'aboutus',
      page_title: 'About Us',
      is_active: true,
      created_at: new Date()
    });
    cms.insert({
      cms_id: '2346',
      cms_type: 'termsandconditions',
      page_title: 'Terms and Conditions',
      is_active: true,
      created_at: new Date()
    });
    cms.insert({
      cms_id: '2347',
      cms_type: 'privacypolicy',
      page_title: 'Privacy Policy',
      is_active: true,
      created_at: new Date()
    });
    cms.insert({
      cms_id: '2348',
      cms_type: 'contactus',
      page_title: 'Contact Us',
      is_active: true,
      created_at: new Date()
    });
  }

  // Menu collection
  const menu = mainMenu.find({}).fetch();

  if (menu.length === 0) {
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'User Management',
      menu_url: 'usermanagement',
      menu_icon: 'fas fa-users'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Media Management',
      menu_url: 'audiovideomanagement',
      menu_icon: 'fas fa-photo-video'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Story Management',
      menu_url: 'storymanagement',
      menu_icon: 'fas fa-box-open'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'User Submissions',
      menu_url: 'usersubmission',
      menu_icon: 'fas fa-mail-bulk'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Staff Management',
      menu_url: 'staffmanagement',
      menu_icon: 'fas fa-users-cog'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'CMS Management',
      menu_url: 'cms',
      menu_icon: 'fas fa-file-alt'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Master Settings'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Notifications',
      menu_url: 'uc',
      menu_icon: 'fas fa-bell'
    });
    mainMenu.insert({
      menu_id: uuidv4(),
      menu_name: 'Report Abuse',
      menu_url: 'uc',
      menu_icon: 'fas fa-user-times'
    });
  }

  // Roles
  const adminRolesArr = roles
    .find({
      user_id:
        '8327328-23873ddsds-sddskh3433434-98988sjhsddhgs-191921j-74545gdsvddfsdgjaskssdy-329328hase'
    })
    .fetch();

  if (adminRolesArr.length === 0) {
    const allMenuArr = mainMenu.find({}).fetch(),
      allMenuIdArr = [];
    allMenuArr.forEach(e => {
      allMenuIdArr.push(e.menu_id);
    });

    allMenuIdArr.forEach(e => {
      roles.insert({
        roles_id: uuidv4(),
        user_id:
          '8327328-23873ddsds-sddskh3433434-98988sjhsddhgs-191921j-74545gdsvddfsdgjaskssdy-329328hase',
        menuId: e
      });
    });
  }
});

import Dashboard from 'views/Dashboard.js';
import Laundry from 'views/Laundry.js';
import Departure from 'views/Departure.js';
import Posts from 'views/Posts.js';
import Maintenance from 'views/Maintenance';
import Mess from 'views/Mess.js';
import UserPage from 'views/User.js';
import Complaint from 'views/Complaint';
import AComplaint from 'views/Complaint#';
import ALaundry from 'views/Laundry#';

var routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-bank',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/departure',
    name: 'Departure',
    icon: 'nc-icon nc-send',
    component: Departure,
    layout: '/admin',
  },
  {
    path: '/mess',
    name: 'Mess Menu',
    icon: 'nc-icon nc-basket',
    component: Mess,
    layout: '/admin',
  },
  {
    path: '/laundry',
    name: 'Laundry',
    icon: 'nc-icon nc-single-copy-04',
    component: Laundry,
    layout: '/admin',
  },
  {
    path: '/admin-laundry',
    name: 'ALaundry',
    icon: 'nc-icon nc-single-copy-04',
    component: ALaundry,
    layout: '/admin',
  },
  {
    path: '/posts',
    name: 'Posts',
    icon: 'nc-icon nc-chat-33',
    component: Posts,
    layout: '/admin',
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    icon: 'nc-icon nc-settings',
    component: Maintenance,
    layout: '/admin',
  },
  {
    path: '/complaint',
    name: 'Complaints',
    icon: 'nc-icon nc-settings-gear-65',
    component: Complaint,
    layout: '/admin',
  },
  {
    path: '/admin-complaint',
    name: 'AComplaints',
    icon: 'nc-icon nc-settings-gear-65',
    component: AComplaint,
    layout: '/admin',
  },
  {
    path: '/user-page',
    name: 'User Profile',
    icon: 'nc-icon nc-single-02',
    component: UserPage,
    layout: '/admin',
  },
];
export default routes;

<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'Welcome';
$route['addtion']='Welcome/addtion';
$route['subb']='Welcome/sub';
$route['insert'] = 'Signin/add';
$route['sigin'] = 'Signin/login';
$route['find']['get']='Product/find_all';
$route['create'] = 'Product/create';
$route['findbyid/(:num)'] = 'Product/find/$1';
$route['update'] = 'Product/update';
$route['delete/(:num)'] = 'Product/delete/$1';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;


$route['register'] ='RegisterController/registration';
$route['login']='registerController/login';


$route['forgot']='registerController/forgot';
$route['fetchemail'] = 'registerController/fetchemail';
$route['reset'] = 'registerController/resetpassword'; 
$route['dashboard']='notes/dashboard';

$route['createnotes'] = 'Notes/createNotes';
$route['fetchnotes'] = 'Notes/getNotes';
$route['changeColor'] = 'Notes/changeColor';
$route['updateNotes']='Notes/updateNotes';
$route['deleteNotes']='Notes/deleteNotes';
$route['reminder']='reminder/dashboard';

//$route['editlablels']='editlables/dashboard';
$route['setlabel'] ='Labels/addLabel';
$route['getlabel'] ='Labels/getLabel';
$route['deleteLabel']='Labels/deleteLabel';
$route['updateLabel']='Labels/updateLabel';
$route['getAllLabeledNotes']='Labels/getAllLabeledNotes';
$route['archived']='Notes/archive';

$route['getarchive'] = 'Archive/fetchArchive';
$route['unarchive'] = 'Archive/unarchive';

$route['getreminder'] = 'Reminder/ReminderNotes';

$route['socialLogin'] = 'RegisterController/socialLogin';

$route['noteTrash']='Notes/noteTrash';
$route['restoreDeletedNote']='Notes/restoreDeletedNote';
$route ['deleteNotes']='Notes/deleteNotes';
$route ['getnote'] ='Notes/notefetch';

$route ['noteimage']='Notes/noteimage';

$route['addUImage'] = 'RegisterController/addUImage';
$route['getImage'] = 'RegisterController/getImage';

$route['dragAndDropData']= 'Notes/dragDrop';

//$route['addUImageNote'] = 'Note/addUImageNote';
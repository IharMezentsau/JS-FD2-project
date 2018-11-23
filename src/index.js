"use strict";

import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import materialDesignLite from 'material-design-lite/material.min.js';
import MessageModel from './app/MessageModel.js';
import MessageView from './app/MessageView.js';
import MessageController from './app/MessageController';

import NameController from './app/NameController.js';
import NameModel from './app/NameModel.js';
import NameView from './app/NameView';

import AuthController from './app/AuthController.js';
import AuthModel from './app/AuthModel.js';
import AuthView from './app/AuthView';

import ChanelController from './app/ChanelController.js';
import ChanelModel from './app/ChanelModel.js';
import ChanelView from './app/ChanelView';
import ChanelService from './app/ChanelService';

import MessageService from './app/MessageService';
import Router from './app/Router';

//error page
import ErrorController from "./app/ErrorController";
import ErrorModel from "./app/ErrorModel";
import ErrorView from "./app/ErrorView";

//Media
import newMessage from './audio/newMessage.mp3';
import androidDesktop from './img/android-desktop.png';
import user from './img/user.jpg';
import e200 from './img/200.png';
import e401 from './img/401.png';
import e403 from './img/403.png';
import e404 from './img/404.png';
import e500 from './img/500.png';
import e500ie from './img/500ei.png';
//Favicon
import favicon from './img/favicon.png';
import iosDesktop from './img/ios-desktop.png';

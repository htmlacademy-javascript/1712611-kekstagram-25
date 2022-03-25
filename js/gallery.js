import {createImages} from './data.js';
import {paintSmallImages} from './paint.js';
import {attachPopupEvent} from './popup.js';

const images = createImages(25);
paintSmallImages(images);
attachPopupEvent(images);

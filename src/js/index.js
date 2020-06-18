import './scripts/overlay.js';
import './scripts/header.js';
import '../assets/styles/index.scss';
const icons = require.context('../assets/media/', true, /.*\.svg$/);
icons.keys().forEach(function(key){
  icons(key);
});

const images = require.context('../assets/media/images/', true, /\.(png|jpg|gif|webp)$/);
images.keys().forEach(function(key){
  images(key);
});

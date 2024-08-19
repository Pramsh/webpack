import generateSuggestion from "./generateSuggestion";
import './styles/main.scss'
import gattino from './assets/gattino.jpeg'

const suggestImg = document.getElementById('suggestImg')
suggestImg.src = gattino
console.log(generateSuggestion());
console.log(2);

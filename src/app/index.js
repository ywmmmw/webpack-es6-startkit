import _ from 'lodash';
import moment from "moment";
import "./index.scss";
import sub from "./sub.html";
import generateText from './sub.js';


function component () {
  let element = document.createElement('div');

  /* 需要引入 lodash，下一行才能正常工作 */
  // element.innerHTML = _.join(['Hello','mywebpack'], ' ');
  element.innerHTML = sub;
  console.log("bii");
  return element;
}

// console.log(moment().format());
document.body.appendChild(component());
document.body.appendChild(generateText());

console.log("yo");

// var selected = allJobs.filter(job => job.isSelected());

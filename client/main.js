import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import noUiSlider from 'nouislider';
import { $ } from 'meteor/jquery';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  console.log('hello on created!');
  $(document).ready(
    function()
    {
      let slider = document.getElementById("slider");
      noUiSlider.create(slider, {
        start: 0,
        connect: "lower",
        range: {
          'min': 0,
          'max': 100
        }
      });
    }
  );
  
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

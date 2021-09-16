import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import noUiSlider from 'nouislider';
import { $ } from 'meteor/jquery';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  console.log('hello on created!');
  $(document).ready(() => {
    var select = document.getElementById('input-select');

    // Append the option elements
    for (var i = -20; i <= 40; i++) {
      var option = document.createElement("option");
      option.text = i;
      option.value = i;
      select.appendChild(option);
    }

    var html5Slider = document.getElementById('html5');

    noUiSlider.create(html5Slider, {
      start: [10, 30],
      connect: true,
      tooltips: true,
      range: {
          'min': -20,
          'max': 40
      }
    });
    
    var inputNumber = document.getElementById('input-number');

    html5Slider.noUiSlider.on('update', function (values, handle) {
      var value = values[handle];
      if (handle) {
        inputNumber.value = value;
      } else {
        select.value = Math.round(value);
      }
    });

    select.addEventListener('change', function () {
      html5Slider.noUiSlider.set([this.value, null]);
    });

    inputNumber.addEventListener('change', function () {
      html5Slider.noUiSlider.set([null, this.value]);
    });

  });
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


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import VueMarkdown from 'vue-markdown';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

import _ from 'lodash';

Vue.component('projects-component', require('./components/ProjectsComponent.vue'));

const app = new Vue({
  el: '#app',
	data: {
    project: '',
    email: '',
    confirm: false,
		form: 'brand',
		menu: false
  },
	
	components: { 
    VueMarkdown
  },
	
	mounted: function () {
    this.homePage();
  },
	
  methods: {
		
		homePage: function() {
			var url = new URL(window.location.href);
			var c = url.searchParams.get("c");
			
			if(url.search == "?creatives") {
				this.form = 'creative';
				$('body').attr('class', this.form);
			}
		},
		
    processForm: function() {
      var data = { project: this.project, email: this.email, category: this.form };
			
			$.ajax({
  			method: "POST",
  			url: "/contact/",
  			data: { project: this.project, email: this.email }
			});
			
      this.confirm = true;
    },
		
		switchForm: function(e) {
			this.form = e;
			$('body').attr('class', this.form);
		},
		
		activeSwitch: function(e) {
			if(e == this.form) {
				return true;
			}
		},
		
		toggleMenu: function() {
			if(this.menu == false) {
				this.menu = true;
			} else {
				this.menu = false;
			}
      this.closeButton();
		},
    
    closeButton: function() {
        if(this.menu == true) {
            $(".rec").attr('y', 16);
            $(".rec").attr('fill', "#FFFFFF");
        } else {
            $(".rec").each(function(){
               $(this).attr('y', $(this).data('orig')); 
            });
            $(".rec").attr('fill', "#000000");
        }
    },
		
  }
});

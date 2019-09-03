Vue.component('navbar', {
  data: function() {
    return {
      isMenuActive: false,
    };
  },
  methods: {
    toggleMenu: function() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
  template: `
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Shr:nk
        </a>
        <button
          v-on:click="toggleMenu"
          :class="['button navbar-burger', { 'is-active': isMenuActive }]"
          id="burger"
          data-target="navMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        :class="['navbar-menu', { 'is-active': isMenuActive }]"
        id="navMenu"
      >
        <a href="/api" class="navbar-item">
          Docs
        </a>
        <a href="https://github.com/p12y/shrnk" class="navbar-item">
          <i class="fa fa-code-fork" aria-hidden="true"></i>
        </a>
      </div>
    </nav>
  `,
});

var DEFAULT_COPY_TEXT = 'Copy';

var app = new Vue({
  el: '#app',
  data: {
    url: '',
    isSuccess: false,
    copyText: DEFAULT_COPY_TEXT,
    errorMessage: '',
  },
  computed: {
    inputClass: function() {
      return this.errorMessage ? 'is-danger' : '';
    },
  },
  methods: {
    handleSubmit: function(e) {
      e.preventDefault();
      var data = { url: this.url };
      return fetch('/api/shrink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .catch(function(error) {
          app.errorMessage = 'Something went wrong, try again';
          console.error(error);
        })
        .then(function(response) {
          if (response.status === 400) {
            app.errorMessage = 'Invalid URL';
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(function(data) {
          app.url = data.shortUrl;
          app.isSuccess = true;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    reset: function(clear) {
      if (clear) this.url = '';
      this.errorMessage = '';
      this.isSuccess = false;
      this.copyText = DEFAULT_COPY_TEXT;
    },
    copyUrl: function() {
      this.$refs.input.select();
      document.execCommand('copy');
      this.copyText = 'Copied!';
    },
  },
});

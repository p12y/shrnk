Vue.component('request-doc-item', {
  props: ['number', 'title', 'command', 'description'],
  template:
    '<div><h3 class="title is-6">{{number}}. {{title}}</h3><pre>{{command}}</pre><br /><p>{{description}}</p><br /></div>',
});

var DEFAULT_COPY_TEXT = 'Copy';

var app = new Vue({
  el: '#app',
  data: {
    url: '',
    isSuccess: false,
    copyText: DEFAULT_COPY_TEXT,
    errorMessage: '',
    isMenuActive: false,
    items: [
      {
        title: 'Make a POST request',
        command: 'curl -d url=LONG_URL https://shrnk.glitch.me/api/shrink',
        description:
          'The server will respond with a JSON object containing the original and shortened URL.',
      },
      {
        title: 'Make a GET request',
        command: 'curl https://shrnk.glitch.me/ENCODED_URL',
        description:
          'The server will respond with a redirect to the original URL.',
      },
    ],
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
    toggleMenu: function() {
      this.isMenuActive = !this.isMenuActive;
    },
  },
});

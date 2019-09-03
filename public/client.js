$(document).ready(function() {
  $('.copy').hide();
  $('.another').hide();

  $('form').submit(function(e) {
    e.preventDefault();

    var longUrl = $('input').val();
    var data = { url: longUrl };

    $.ajax({
      type: 'POST',
      url: '/api/shrink',
      data: data,
      success: handleSuccess,
      error: handleError,
      dataType: 'json',
    });
  });

  $('.copy').click(function() {
    copyUrl();
  });

  $('.another a').click(function() {
    reset();
  });

  $('input').on('change keyup paste', function() {
    $('.help').text('');
    $('input').removeClass('is-danger');
  });
});

function handleSuccess(d) {
  toggleButtons();
  $('.help').text('');
  $('input')
    .val(d.shortUrl)
    .select();
}

function copyUrl() {
  $('input').select();
  document.execCommand('copy');
  $('.copy').html(
    '<span class="icon is-small"><i class="fa fa-clone"></i></span><span>Copied!</span>'
  );
}

function reset() {
  $('input').val('');
  $('.copy').html(
    '<span class="icon is-small"><i class="fa fa-clipboard"></i></span><span>Copy</span>'
  );
  toggleButtons();
}

function handleError() {
  $('.help').text('Invalid URL');
  $('input').toggleClass('is-danger');
}

function toggleButtons() {
  $('.copy').toggle();
  $('.submit').toggle();
  $('.another').toggle();
}

document.addEventListener('DOMContentLoaded', function() {
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

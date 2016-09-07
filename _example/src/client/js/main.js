(function () {

  // console.log('sanity check!');

  $(document).on('click', '.delete-btn', function() {
    const answer = confirm('Are you sure?');
    if (answer) {
      const $this = $(this);
      const personID = $this.attr('data-id');
      $.ajax({
        type: 'DELETE',
        url: `/people/delete/${personID}`
      })
      .done((data) => {
        location.reload();
        console.log(data);
      })
      .fail((err) => {
        console.log(err);
      });
    }
  });

})();

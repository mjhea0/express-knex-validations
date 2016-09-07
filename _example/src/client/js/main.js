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

  $(document).on('click', '.update-btn', function() {
    const $this = $(this);
    const personID = $this.attr('data-id');
    const personUsername = $this.attr('data-username');
    const personHobby = $this.attr('data-hobby');
    $('#input-username').val(personUsername);
    $('#input-hobby').val(personHobby);
    $('#input-id').val(personID);
  });

  $(document).on('submit', '#modal-form', function(e) {
    e.preventDefault();
    const $updatedUsername = $('#input-username').val();
    const $updatedHobby = $('#input-hobby').val();
    const $personID = $('#input-id').val();
    const payload = {
      username: $updatedUsername,
      hobby: $updatedHobby
    };
    $.ajax({
      type: 'PUT',
      url: `/people/update/${$personID}`,
      data: payload
    })
    .done((data) => {
      $('#myModal').modal('toggle');
      location.reload();
      console.log(data);
    })
    .fail((err) => {
      console.log(err);
    });
  });

})();

$(function() {
  function start(books) {
    var $inputSearch = $('#inputSearch'),
        $result = $('#results'),

        $kabCheckbox = $('#kab'),
        $kecCheckbox = $('#kec'),
        $caseCheckbox = $('#case'),

        searchkabs = true,
        searchkecs = true,


        fuse;

    function search() {
      var r = fuse.search($inputSearch.val());
      $result.empty();
      $.each(r, function() {
        $result.append('<li class="result-item">' + this.kec + ', <span class="t-kab">' + this.kab + '</span> <span class="t-rp-reg">Rp'+this.reg+'</span></li>');
      });
    }

    function createFuse() {
      var keys = [];
      if (searchkabs) {
        keys.push('kab');
      }
      if (searchkecs) {
        keys.push('kec');
      }
      fuse = new Fuse(books, {
        keys: keys
      });
    }

    function onkabCheckboxChanged() {
      searchkabs= $kabCheckbox.prop('checked');
      createFuse();
      search();
    }

    function onkecCheckboxChanged() {
      searchkecs = $kecCheckbox.prop('checked');
      createFuse();
      search();
    }



    $kabCheckbox.on('change', onkabCheckboxChanged);
    $kecCheckbox.on('change', onkecCheckboxChanged);
  
    $inputSearch.on('keyup', search);

    createFuse();
  }

  $.getJSON('../json/jakarta.json', function(data) {
     start(data);
  });

});
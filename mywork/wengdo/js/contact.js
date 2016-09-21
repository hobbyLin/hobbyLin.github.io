require.config({
	paths:{
		"jquery":"jquery-1.11.1",   // 只和这个版本有效果
		"validate":"jquery-validate"
	},
	shim:{
		"jquery":{
			exports:"$"
		},
		"validate":{
			deps:["jquery"],
			exports:"validate"
		}
	}
	
})

require(["jquery","validate"],function($,validate){
	console.log($);
	
 $('form').validate({
    onFocus: function() {
      this.parent().addClass('active');
      return false;
    },
    onBlur: function() {
      var $parent = this.parent();
      var _status = parseInt(this.attr('data-status'));
      $parent.removeClass('active');
      if (!_status) {
        $parent.addClass('error');
      }
      return false;
    }
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    
    $(this).validate('submitValidate'); //return boolean;
    console.log($(this).validate('submitValidate'));
  });
  
})

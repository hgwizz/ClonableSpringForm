(function ( $ ) {
 
   $.fn.duplicateDiv = function() {

        var regexSquare = /\[([^\]]+)]/;
        var father = $(this).parents().find('.clonable').last()
        var indexTitle;
        var size = getSizeByClass(father.prop('class'));
        var cloned = father.clone().off();
        
        cloned.find('input').each(function() {
            indexTitle = this.name.match(regexSquare);
            if (indexTitle.length == 2) {
                var iNum = size;
                this.id = this.id.replace(indexTitle[1], (iNum) );
                this.name = this.name.replace(indexTitle[0], '[' + (iNum) + ']');
            }
            var buttonAdd = cloned.find('button.add');
            if (buttonAdd.length > 0) {
                buttonAdd.click(function(event) {
                  $(this).duplicateDiv();
                    event.preventDefault();
                });   
            }
            var buttonRemove = cloned.find('button.remove');
            if (buttonRemove.length > 0) {
                buttonRemove.click(function(event) {
                  $(this).removeDuplicate();
                    event.preventDefault();
                });   
            }
        });
        cloned.insertAfter(father);
    };
    $.fn.removeDuplicate = function() {
        var father = $(this).parents().closest('div.clonable');
         if (father.length > 0) {
            father.remove()
         }
    };
    function getSizeByClass(className){
        var size;
        var arrayClassName = className.split(" ")
        var current = $('.' + arrayClassName[1]);
        if (current.length > 0) {
            size = current.length;
        }
        return size;
    }
 
}( jQuery ));
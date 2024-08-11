$(document).ready(function(){
    $(".btn-delete").on('click',function(e){
      e.preventDefault();   

      if(confirm("Estas seguro que deseas eliminar?")){
         $(this).closest(".form-delete").submit();
      }

    });

});

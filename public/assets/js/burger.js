$(function(){

  console.log('ready');

  $(".create-form").on("submit", function(event){
    event.preventDefault();
    var newBurger = {
      burger_name: $("#newburger").val().trim(),
      devoured: 0
    };
    console.log(newBurger)
    $.ajax("/api/burgers/", {
      type: "POST",
      data: newBurger
    }).then(function(){
      console.log("Added a new burger: " + newBurger);
      location.reload();
    });
  });

  $(".eatburger").on("click", function(event){
    event.preventDefault();
    let id = $(this).data("id");
    let isdevoured = {
      devoured: 1
    };
    $.ajax("/api/burgers/" + id,{
      type: "PUT",
      data: isdevoured
    }).then(function(){
      console.log("burger devoured");
      location.reload();
    });
  });

  $(".trashburger").on("click", function(event){
    event.preventDefault();
    let id = $(this).data("id");

    $.ajax({
      type:"DELETE",
      url: "/api/burgers/"+id
    }).then(location.reload());
  });


});

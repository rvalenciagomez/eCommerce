   $( document ).ready(function() {
//	    $( "p" ).text( "The DOM is now loaded and can be manipulated." );
//	   $("div[id*='shortDescription']").each(function(){    
//		   var elementId = $(this).prop("id");
//			 elementId = elementId.replace("\-0","-"+product.id);
//			 $(this).prop("id",elementId);
//	   }
	   var text = $("#shortDescription-87").text();
//	   var 	text = document.getElementById("#shortDescription-87");
//	   shorten(text, 20);
	});

   $("body").on("click","button[id*='editButton']", function(){
	  var id = $(this).attr("id");
	  id = id.split("-")[1];
	  
	  window.location.href= "dashboard/products/" + id;
   });
   
   $("body").on("click","button[id*='deleteButton']", function(){
	  
	  var areYouSure = confirm("Are you sure you wish to delete the product?");
	  
	  if(areYouSure == true)
	  {
		  var id = $(this).attr("id");
		  id = id.split("-")[1];
		  
		  $.post({ 
			  url:"/dashboard/products/" + id + "/delete",
			  success: function() {
				  location.reload();
			  }
			  
		  });		  
	  }
   });
		   
		   
   $("body").on({
	   mouseenter: function (){
		   $(this).css("background-color", "rgb(228,228,228)")
		   $(this).children("button[id*='editButton']").removeClass("hidden");
		   $(this).children("button[id*='deleteButton']").removeClass("hidden");
	   },
	   mouseleave: function (){
		   $(this).css("background-color", "white")
		   $(this).children("button[id*='editButton']").addClass("hidden");
		   $(this).children("button[id*='deleteButton']").addClass("hidden");
	   }
   },"div[id*='productCard']");
   
   
$(function () {
    $('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);

        // / uncomment code for absolute positioning tweek see top comment in
		// css
        // $('.absolute-wrapper').toggleClass('slide-in');
        
    });
   
   // Remove menu for searching
   $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');

        // / uncomment code for absolute positioning tweek see top comment in
		// css
        // $('.absolute-wrapper').removeClass('slide-in');

    });
   
   
   $( "#slider-range" ).slider({
	      range: true,
	      min: 0,
	      max: 500,
	      values: [ 75, 300 ],
	      slide: function( event, ui ) {
	        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	      }
	    });
   $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
   
   
   
   
   
   $("body").on("click","button[id*='createProduct']", function() {
	   var id = getId($(this));
	   
	   
	 $.ajax({
		 url:"dashboard/products",
		 method:"post",
		 type:"json",
		 success: function (product){
			 console.log(product);
			 
			//Go through each generic product placeholder card and replace	
			 // the generic id (0) with the id saved in the BD.
				 
			 $("[id*='-0']").each(function(){
				 var elementId = $(this).prop("id");
				 elementId = elementId.replace("\-0","-"+product.id);
				 $(this).prop("id",elementId);
			 });
			 
			 $("#placeholderCard1-"+ product.id).addClass("hidden"); 
			 $("#placeholderCard2-"+ product.id).removeClass("hidden");
			 
			 
		 },
		 error: function(){
			 console.log("error");
		 }		 
	 });
   });   
   
   
   $("body").on("click","button[id*='addImageUrl']", function() {
		var id = getId($(this));
		var imageVal = $("#imageUrl-"+id).val();
		$.ajax({
			 url:"dashboard/products/"+id,
			 method:"post",
			 type:"json",
			 data:{ "fieldName": "imageUrl", 
				 "fieldValue": imageVal },
//			 data:{"imageUrl": imageVal }, -->>>  specific way of sending data 
			 success: function (product){
				 console.log(product);	
				 
				 $("#placeholderCard2-"+ product.id).addClass("hidden");
				 $("#placeholderCard3-"+ product.id).removeClass("hidden");
				 			
			 },
			 error: function(){
				 console.log("error");
			 }		 
		 });
	  });
   
   $("body").on("click","button[id*='addShortDescription']", function() {
		var id = getId($(this));
		var shortDescVal = $("#shortDescription-"+id).val();
         
		$.ajax({
			 url:"dashboard/products/"+id,
			 method:"post",
			 type:"json",
//			 data:{"shortDescription": shortDescVal , "imageUrl":""},
			 data:{ "fieldName": "shortDescription", 
				 "fieldValue": shortDescVal },
			 success: function (product){
				 console.log(product);				 
				 
				 $("#placeholderCard3-"+ product.id).addClass("hidden"); 
				 $("#placeholderCard4-"+ product.id).removeClass("hidden");		 
				 
			 },
			 error: function(){
				 console.log("error");
			 }		 
		 });
	  });

   
   $("body").on("click","button[id*='addPrice']", function() {
		var id = getId($(this));
		var priceVal = $("#price-"+id).val();
        
		$.ajax({
			 url:"dashboard/products/"+id,
			 method:"post",
			 type:"json",
//			 data:{"shortDescription": shortDescVal , "imageUrl":""},
			 data:{ "fieldName": "price", 
				 "fieldValue": priceVal },
			 success: function (product){
				 console.log(product);				 
				 
				 $("#placeholderCard4-"+ product.id).addClass("hidden"); 
				 //then show the finished full added product to the screen
				 showFinishedCard(product);
				 
				 
				 createPlaceholderCard();
			 },
			 error: function(){
				 console.log("error");
			 }		 
		 });
	  });

   
}); 


//FINAL DE FUNICION GENERAL
   
function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}


function getId(obj){
	var id = $(obj).prop("id");
	   
	  return id.split("-")[1];
}
	   
function showFinishedCard(product)
{
     $("#placeholderCard4-"+product.id).after(
    	   "<div id=\"productCard-"+product.id+"\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card\">"+
           "  <img id=\"imageUrl-"+product.id+"\"  src=\""+product.imageUrl+"\" class=\"center-block\"/>"+
           "  <div id=\"shortDescription"+product.id+"\" text=\""+product.shortDescription+"\"  class=\"shortDesc\">"+product.shortDescription+"</div>"+
           "<p>$ "+ product.price+"</p>"+
           "  <button id=\"editProduct-"+product.id+"\" class=\"btn btn-primary btn-block\" >Edit Product</button>"+
           "</div>"   
           
     );
    		 
}
   function createPlaceholderCard ()
   {
	 $("#products").append(
		 "<div id=\"placeholderCard1-0\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card step1\">"+
		 "  <button id=\"createProduct-0\" class=\"btn btn-primary btn-block\" >Create Product</button>"+
		 "</div>"+
		 "<div id=\"placeholderCard2-0\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card step2 hidden\">"+
		 "  <p>Please type in the image Url.</p>"+
		 "  <input type=\"text\" id=\"imageUrl-0\" placeholder=\"paste img url\"/>"+
		 "  <button id=\"addImageUrl-0\" class=\"btn btn-primary btn-block\" >Next</button>"+
		 "</div>"+
		 "<div id=\"placeholderCard2-0\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card step2 hidden\">"+
         "<p>Please type in the image Url.</p>"+
         "<input type=\"text\" id=\"imageUrl-0\" placeholder=\"paste img url\"/>"+
         "<button id=\"addImageUrl-0\" class=\"btn btn-primary btn-block\" >Next</button>"+
       "</div>"+
       
       "<div id=\"placeholderCard3-0\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card step2 hidden\">"+
       " <p>Please add a short description</p>"+
       "  <input type=\"text\" id=\"shortDescription-0\" placeholder=\"add a Short Description\"/>"+
       "  <button id=\"addShortDescription-0\" class=\"btn btn-primary btn-block\" >Next</button>"+
       "</div> "+
       
       " <div id=\"placeholderCard4-0\" class=\"col-xs-12 col-sm-6 col-md-3 col-lg-2 card step2 hidden\">"+
       "  <p>Please type in the price of your product:</p>"+
       "  <input type=\"text\" id=\"price-0\" placeholder=\"$40\"/>"+
       "  <button id=\"addPrice-0\" class=\"btn btn-primary btn-block\" >Finish</button>"+
       "</div> ");
   }
   
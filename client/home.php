<!doctype html>
<html>
	<head>
		<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<meta charset="utf-8">
		<title>PiWatch</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>

		<header>
			
		</header>


 <div class="container">
  <div class="jumbotron">
    <h1>Welcome to PiWatch</h1>
    <p>The solution for a safer home!</p>
  </div>
 	<div class="row">
	     <div class="col-sm-4">
	      <h3>Camera</h3>
				<div class="card-container">
				  <div class="card-camera" id="card">
				    <div class="side" id="side"><img src="#" alt=""></div>		
					</div>
				  </div>
				<input 	id="camera_button"  onclick="showhide()" class='light' name="" type="button" value=" " 
						style="margin-left:42px; no-repeat center; width:130px; height:130px; border:none;">
				<div id="stream" style="display:none">
    				<p>Stream will be shown and hidden on button click</p>
    				<img id="stream_img"src="http://10.104.10.84:8081/">
  				</div>
		</div>
		<div class="col-sm-4">		      
		      <h3>Motion</h3>
				<div class="card-container">
						<div class="card-motion" id="card">
					    	<div class="side" id="side"><img src="#" alt=""></div>
						</div>
				</div>
				<input class='light' name="" type="button" value=" " style="no-repeat center; width:130px; height:130px; border:none;">
		</div>
		<div class="col-sm-4">
		        <h3>Time-lapse</h3>
				<div class="card-container">
						<div class="card-time_lapse" id="card">
					    	<div class="side" id="side"><img src="#" alt=""></div>
						</div>
				</div>
				<input class='light' name="" type="button" value=" " style="no-repeat center; width:130px; height:130px; border:none;">

		</div>
	</div>
	
	

    	
</div>
    
<script>

$('input:button').on('click', function () {
    $(this).toggleClass('light dark');
});

    function showhide()
     {
           var div = document.getElementById("stream");
    if (div.style.display !== "block") {
        div.style.display = "block";
    }
    else {
        div.style.display = "none";
    }
     }


</script>
	
	</body>
</html>
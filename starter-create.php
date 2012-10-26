<!DOCTYPE html> 
<html>

<head>
	<title>Create a Visualizer</title> 
	<meta charset="utf-8">
	<meta name="apple-mobile-web-app-capable" content="yes">
 	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 

	<link rel="stylesheet" href="jquery.mobile-1.2.0.css" />

	<link rel="stylesheet" href="style.css" />
	<link rel="apple-touch-icon" href="appicon.png" />
	<link rel="apple-touch-startup-image" href="upstart.png">
	
	<script src="jquery-1.8.2.min.js"></script>
	<script src="jquery.mobile-1.2.0.js"></script>

</head>

<body>


<!-- Page Begins Here -->
<div data-role="page" id="home">

	<!-- Header Begins Here -->
	<div data-role="header">
		<h1>Choose Visualization</h1>
		<a href="index.php" data-icon="check">Back</a>
	</div>
	<!-- Header Ends Here->
	
	
	<!-- Content Begins Here -->
	<div data-role="content">
		<form action="starter-display.php" method="post">
			<label for="foo">Name:</label>
			<input type="text" name="username" id="foo">
			<input type="submit" value="Create">
		</form>
	</div>
	<!-- Content Ends Here -->
	
	
	<!-- Footer Begins Here -->
	<div data-role="footer">
	
	</div>
	<!-- Footer Ends Here -->
</div>
<!-- Page Ends Here -->

</body>
</html>

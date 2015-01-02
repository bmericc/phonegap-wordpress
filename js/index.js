document.addEventListener('deviceready', function() {
 	setTimeout(function() { navigator.splashscreen.hide(); }, 3000);
});

function tarih(date){

	if(date % 1 !== 0) return false;  
	if(date<1000) return false;

	var time    = (parseInt(new Date().getTime()))/1000;
	var fark 	= time-parseInt(date); //to get the time since that moment

	if(fark<0) fark= fark * -1;
		
	var tokens = new Array();
		tokens[0] = "yıl";
		tokens[1] = "ay";
		tokens[2] = "hafta";
		tokens[3] = "gün";
		tokens[4] = "saat";
		tokens[5] = "dakika";
		tokens[6] = "saniye";
				
	var values = new Array();
		values[0] = 31536000;
		values[1] = 2592000;
		values[2] = 604800;
		values[3] = 86400;
		values[4] = 3600;
		values[5] = 60;
		values[6] = 1;
		
	for(i=0; i<=tokens.length; i++) {
		if(values[i] > fark) continue;
		var numberOfUnits=Math.ceil(fark/values[i]);
		return numberOfUnits+" "+tokens[i]+" once ";
	}
}

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function post(json) {

	document.getElementById("title").innerHTML = json.post.title;

    var html = "<h1>"+json.post.title+"</h1>";
    html += "<p>"+json.post.content+"</p>";

	document.getElementById("post").innerHTML = html;
}

function posts(json) {

    var html = "";

  	for (var i = 0; i < json.posts.length; i++)
	{
		
	   
	    if ("url" in json.posts[i]) {
	        var posturl = json.posts[i].url;	     
	    }

	    if ("id" in json.posts[i]) {
	        var postid = json.posts[i].id;	     
	    }
	    
	 	if ("title" in json.posts[i]) {
	      var postcontent = json.posts[i].title;}
	    else
	    if ("content" in json.posts[i]) {
	      var postcontent = json.posts[i].content;}
	    else var postcontent = "Başlıksız";

	    if (postcontent.length > 200) postcontent = strip(postcontent).substring(0,200);
	    else postcontent = strip(postcontent);

		if ("date" in json.posts[i]) {
	      	var date = json.posts[i].date;
	  	}
	  	else {
	  		var date = "null";
	  	}
        
        html = html + "<li>" + "<a href=\"post.html?id=" + postid + "\">" + "<h2>" + postcontent + "</h2>" + "<p>" + date + "</p></a></li>";
        
        document.getElementById("postsList").innerHTML = html;
        $("#postsList").listview("refresh");

	}	

}

function open_browser(link)
{
    window.open(link, '_blank', 'location=yes','closebuttoncaption=back');
}

function getParameter(query, url) {
 	var query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var expr = "[\\?&]"+query+"=([^&#]*)";
        var regex = new RegExp( expr );
        var results = regex.exec( url );

	if(results!=null) return results[1];
	else return false;
}


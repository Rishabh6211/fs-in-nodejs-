var express =	require('express');
var path 	=	require('path');
var fs		=	require('fs');
var app 	=	express();

var file = function()
{	 
	fs.readdir('./../documents', (err, files) => {
  		if (err) {
  			console.log("fileName not found")
  		}else {

  			console.log("type", files)
  			var i = 0;
  			console.log("i",i);
  			var length = files.length;
  			console.log("length",length);
  			recursiveFunc(i, length, files)  			
  		}

	});
}

	var recursiveFunc = function(i, length, files){
		console.log("recursiveFunc:",files);
		console.log("i:",i);
		if (i == length || i > length){
				
				return false;
				console.log("more then length");
			
		}else {
			var image = ["jpeg","JPEG","gif","GIF","png","PNG","jpg","JPG"];
  			var appExt = ["pdf","PDF","doc","DOC","docx","DOCX","ppt","PPT","pptx","PPTX"];
			var ext = files[i].split(".");
			console.log("ext",ext);
			ext = ext[1];
			var sourcePath = '../documents/'+ files[i];
			if(image.indexOf(ext) != -1){

				if(!sourcePath){
					console.log("folder name already exist")
				}else {
				fs.mkdir('./image', function(err){
					if(err){
						console.log("failed to create folder",err)
					} else {
						
						var destPath = './image/'+files[i];
						fs.rename(sourcePath, destPath, function(err,data){
							if(err){
								console.log("err",err)
							}
							else{
								console.log("data",data);
								i++;
								recursiveFunc(i, length, files)
							}
						} )
					}
				})
				}	

			}
			else if(appExt.indexOf(ext) != -1){
				fs.mkdir('./documents', function(err){
					if(err){
						console.log("failed to create folder",err)
					} else {

						var destPath = './documents/'+files[i];
						if(!destPath){
							console.log("folder already exist")
						}
						else{
						fs.rename(sourcePath , './documents/'+files[i], function(err,data){
							if(err){
								console.log("err",err)
							}
							else{
								console.log("data",data);
								i++;
								recursiveFunc(i, length, files)
							}
						} )
						}
					}
				})
			}
			else {
				console.log("format not defind")
				i++;
				recursiveFunc(i, length, files)
			}
			


		}
	}
file();
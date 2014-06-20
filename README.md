#This is a Node Express Project





#Server-side : 
[**Express**](http://expressjs.com/) ,I 
modify the design about route , I don't use template engine , and just dispatch to /public/workbench/index.html , and make route to be a web service to fulfill the RESTful design.

#Client-side : 
**jQuery Mobile**

#Database :
use mongoose to manage data into mongodb . I use MongoDB-as-a-Service provided by [mongoLab](https://mongolab.com/)


#module:
[**mongoose-simpledb**](https://www.npmjs.org/package/mongoose-simpledb) =>manage schema , model and save data in mongodb.

[**multer**](https://www.npmjs.org/package/multer) => manage file upload  , receive file data (req.files).


![image](https://dl.dropboxusercontent.com/u/47510080/markdown/express/29.png)

This project already [deploy to heroku.](http://peaches-fire-system.herokuapp.com/)
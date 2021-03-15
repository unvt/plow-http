# plow-http
Initial test of raster-rendering server with http (localhost). This is based on the test by hfu (https://github.com/hfu/plow)   

## background
I wanted to have a raster tile rendering server as a part of the UN Vector Tile Toolkit. 

## install
```console
git clone https://github.com/unvt/plow-http
cd plow-http
npm install
```



## run
```console
node app.js
```

## use
Specify your vector tile based map at route/plow.js. (await page.goto)  
That map may need to be without control fuctions.

Then, access to your tile from /plow/raster/{z}/{x}/{y}.png  
example: http://localhost:3000/plow/raster/10/881/412.png  


## note
playwright seems to be not supported for CentOS (and RedHat).
There are some missing libraries.  
Watch the message and find them.

Please find package from the library name.  
For example,  

```console
yum whatprovides */libatk-bridge-2.0.so.0 

```
Then,
```console
sudo yum install -y atk

```


## References
https://docs.microsoft.com/en-us/graph/tutorials/node?tutorial-step=3  
https://github.com/hfu/plow  
https://playwright.dev/  
https://qiita.com/one-kelvin/items/07bf9b99288e8ecfa4a2  




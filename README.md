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

Missing libraries are:
      libatk-1.0.so.0
      libatk-bridge-2.0.so.0
      libcups.so.2
      libxcb.so.1
      libxkbcommon.so.0
      libX11.so.6
      libXcomposite.so.1
      libXdamage.so.1
      libXext.so.6
      libXfixes.so.3
      libXrandr.so.2
      libgbm.so.1
      libgtk-3.so.0
      libgdk-3.so.0
      libpango-1.0.so.0
      libcairo.so.2
      libatspi.so.0
      libxshmfence.so.1

(missin packages)
atk
at-spi2-atk
cups-libs
libxcb
libxkbcommon
libX11
libXcomposite
libXdamage
libXext
libXfixes
libXrandr
mesa-libgbm
gtk3
pango
cairo
at-spi2-core
libxshmfence

## References
https://docs.microsoft.com/en-us/graph/tutorials/node?tutorial-step=3  
https://github.com/hfu/plow  
https://playwright.dev/  
https://qiita.com/one-kelvin/items/07bf9b99288e8ecfa4a2  




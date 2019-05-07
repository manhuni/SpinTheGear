var CommmonUtuils = {}
/*
    - src: path of button
    - x,y: coordinates x,y of button
    - create button
*/
CommmonUtuils.createButton = function(src , x, y)
{
      var btn = new ccui.Button();
      btn.loadTextures(src);
      btn.x = cc.winSize.width * x;
      btn.y = cc.winSize.height * y;
      return btn;
}
/*
    - src: path of image
    - x,y: coordinates x,y of image
    - create image
*/
CommmonUtuils.craeteImage = function(src, x, y)
{
      var img = cc.Sprite.create(src);
      img.x = cc.winSize.width * x;
      img.y = cc.winSize.height * y;
      return img;
}
/*
    - text: content of label
    - x,y: coordinates x, y label
    - font: font of label
    - size: size of label
    - create label
*/
CommmonUtuils.createLabelFont = function(text, x, y, font, size)
{
    var label = new cc.LabelBMFont(text, font); 
    label.x = cc.winSize.width * x ;
    label.y = cc.winSize.height * y;
    label.setScale(size);
    return label;
},
CommmonUtuils.createLabel = function(x, y, text, font, size)
{
      var label = new cc.LabelTTF(text +" ",font);
      label.setFontSize(size);
      label.setPosition(cc.p(cc.winSize.width * x , cc.winSize.height * y));
      return label;
}